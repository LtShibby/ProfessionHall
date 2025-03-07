import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// For a real implementation, you would use environment variables
// const GITHUB_ID = process.env.GITHUB_ID!;
// const GITHUB_SECRET = process.env.GITHUB_SECRET!;

// Mock credentials for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    image: "/placeholder.svg",
    role: "engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    password: "password123",
    image: "/placeholder.svg",
    role: "recruiter",
    company: "TechCorp Inc.",
  },
]

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "mock-github-id",
      clientSecret: process.env.GITHUB_SECRET || "mock-github-secret",
      // In a real implementation, you would request additional scopes
      // to access the user's GitHub repositories and activity
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "engineer", // Default role for GitHub sign-ins
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = MOCK_USERS.find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        )

        return user || null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        if (user.role === "recruiter" && user.company) {
          token.company = user.company
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        if (token.role === "recruiter" && token.company) {
          session.user.company = token.company as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }

