import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Database helper functions using Prisma
export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        membership: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        membership: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
}

export async function createUser(userData: {
  email: string;
  name: string;
  password?: string;
  provider?: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: userData.password || null,
        role: "user",
      },
      include: {
        membership: true,
      },
    });
    console.log("Created user:", user.id);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateUser(
  id: string,
  updates: Partial<{
    name: string;
    email: string;
    bio: string;
    organization: string;
    position: string;
    location: string;
    website: string;
    linkedin: string;
    twitter: string;
  }>
) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: updates,
      include: {
        membership: true,
      },
    });
    console.log("Updated user:", id, updates);
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

export async function createMembership(userId: string, membershipType: string) {
  try {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now

    const membership = await prisma.membership.create({
      data: {
        userId,
        type: membershipType,
        status: "active",
        endDate,
      },
    });
    console.log("Created membership for user:", userId, membershipType);
    return membership;
  } catch (error) {
    console.error("Error creating membership:", error);
    return null;
  }
}

// Helper function to check if user has active membership
export function hasActiveMembership(user: any) {
  return (
    user?.membership &&
    user.membership.status === "active" &&
    new Date(user.membership.endDate) > new Date()
  );
}

// Helper function to check if user completed onboarding (has bio or organization)
export function hasCompletedOnboarding(user: any) {
  return !!(user?.bio || user?.organization || user?.position);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await findUserByEmail(credentials.email);
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          hasMembership: hasActiveMembership(user),
          onboardingCompleted: hasCompletedOnboarding(user),
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await findUserByEmail(user.email!);
        if (!existingUser) {
          // Create new user for Google OAuth
          const newUser = await createUser({
            email: user.email!,
            name: user.name!,
            provider: "google",
          });
          if (newUser) {
            user.id = newUser.id;
          }
        } else {
          user.id = existingUser.id;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.hasMembership = user.hasMembership;
        token.onboardingCompleted = user.onboardingCompleted;
        token.role = user.role;
      }

      // Always fetch fresh user data to ensure token is up to date
      if (token.id) {
        const freshUser = await findUserById(token.id as string);
        if (freshUser) {
          token.hasMembership = hasActiveMembership(freshUser);
          token.onboardingCompleted = hasCompletedOnboarding(freshUser);
          token.role = freshUser.role;
        }
      }

      // Handle session updates
      if (trigger === "update" && session) {
        if (session.hasMembership !== undefined) {
          token.hasMembership = session.hasMembership;
        }
        if (session.onboardingCompleted !== undefined) {
          token.onboardingCompleted = session.onboardingCompleted;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.hasMembership = token.hasMembership as boolean;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
