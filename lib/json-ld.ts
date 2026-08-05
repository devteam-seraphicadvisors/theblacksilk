type WithContext<T> = T & { "@context": "https://schema.org" };

export function generateEventSchema(event: any): WithContext<any> {
  const schema: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: new Date(event.date).toISOString(),
    endDate: event.endDate
      ? new Date(event.endDate).toISOString()
      : new Date(event.date).toISOString(), // Fallback to start date if no end date
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.location === "Online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.location === "Online"
        ? {
            "@type": "VirtualLocation",
            url:
              event.meetingUrl ||
              "https://theblacksilk.org/events/" + event.slug,
          }
        : {
            "@type": "Place",
            name: event.location,
            address: {
              "@type": "PostalAddress",
              addressLocality: "New Delhi", // Default or extract from location string
              addressCountry: "IN",
            },
          },
    image: event.coverImage ? [event.coverImage] : undefined,
    organizer: {
      "@type": "Organization",
      name: "The Black Silk",
      url: "https://theblacksilk.org",
    },
    offers: {
      "@type": "Offer",
      price: event.price || "0",
      priceCurrency: "INR",
      url: `https://theblacksilk.org/events/${event.slug}`,
      availability: "https://schema.org/InStock",
    },
  };

  if (event.youtubeUrl) {
    // Extract video ID logic should be consistent with the component
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = event.youtubeUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      schema.subjectOf = {
        "@type": "VideoObject",
        name: event.title,
        description: event.description,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        uploadDate: new Date(event.date).toISOString(), // Approximate
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    }
  }

  return schema;
}

export function generateJobPostingSchema(job: any): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "The Black Silk",
      value: job.id,
    },
    datePosted: new Date(job.createdAt).toISOString(),
    validThrough: new Date(
      new Date(job.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(), // +30 days
    employmentType:
      job.type === "Full-time"
        ? "FULL_TIME"
        : job.type === "Part-time"
        ? "PART_TIME"
        : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "The Black Silk",
      sameAs: "https://theblacksilk.org",
      logo: "https://theblacksilk.org/images/logo-icon.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    baseSalary: job.salary
      ? {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            value: parseInt(job.salary.replace(/[^0-9]/g, "") || "0", 10), // Simple parsing, might need refinement
            unitText: "YEAR",
          },
        }
      : undefined,
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(post: any): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: new Date(post.publishedAt || post.dateAdded).toISOString(),
    dateModified:
      post.updatedAt || post.dateUpdated
        ? new Date(post.updatedAt || post.dateUpdated).toISOString()
        : new Date(post.publishedAt || post.dateAdded).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "The Black Silk Team",
      url: post.author?.blogHandle
        ? `https://hashnode.com/@${post.author.blogHandle}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "The Black Silk",
      logo: {
        "@type": "ImageObject",
        url: "https://theblacksilk.org/images/logo-icon.png",
      },
    },
    description: post.brief,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://theblacksilk.org/knowledge-hub/blog/${post.slug}`,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[]
): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
