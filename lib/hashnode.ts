const HASHNODE_API_URL = "https://gql.hashnode.com/";

interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
  author: {
    name: string;
    profilePicture?: string;
  };
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

export async function getHashnodePosts(first = 10): Promise<HashnodePost[]> {
  const query = `
    query GetPosts($first: Int!) {
      publication(host: "${process.env.HASHNODE_PUBLICATION_HOST}") {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
              author {
                name
                profilePicture
              }
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  try {
    if (!process.env.HASHNODE_PUBLICATION_HOST) {
      throw new Error("HASHNODE_PUBLICATION_HOST is not configured");
    }

    if (!process.env.HASHNODE_API_TOKEN) {
      throw new Error("HASHNODE_API_TOKEN is not configured");
    }

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HASHNODE_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { first },
      }),
      next: { revalidate: 300 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return [];
    }

    const posts =
      data.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];
    console.log(`Fetched ${posts.length} posts from Hashnode`);
    return posts;
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error);
    return [];
  }
}

export async function getHashnodePost(
  slug: string
): Promise<HashnodePost | null> {
  const query = `
    query GetPost($slug: String!) {
      publication(host: "${process.env.HASHNODE_PUBLICATION_HOST}") {
        post(slug: $slug) {
          id
          title
          brief
          slug
          publishedAt
          content {
            html
          }
          coverImage {
            url
          }
          author {
            name
            profilePicture
          }
          tags {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    if (!process.env.HASHNODE_PUBLICATION_HOST) {
      console.error("HASHNODE_PUBLICATION_HOST is not configured");
      return null;
    }

    if (!process.env.HASHNODE_API_TOKEN) {
      console.error("HASHNODE_API_TOKEN is not configured");
      return null;
    }

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HASHNODE_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return null;
    }

    if (!data.data || !data.data.publication || !data.data.publication.post) {
      console.error(`Post not found or publication not accessible: ${slug}`);
      return null;
    }

    return data.data.publication.post;
  } catch (error) {
    console.error("Error fetching Hashnode post:", error);
    return null;
  }
}
