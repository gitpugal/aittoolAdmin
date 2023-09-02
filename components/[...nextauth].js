import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { name: req.body.username, email: req.body.email }

        if (user) {
          return user
        } else {
          return null
        }
      }
    })

  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        const res = await fetch("https://www.aitoolsnext.com/api/signUpHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profile.email,
            username: profile.name,
            uid: profile.email,
            password: profile.email
          }),
        });
        return res.status == 200 || res.status == 404 || res.status == 202 || res.status == 500;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return true
      }
    },
  }
}
export default NextAuth(authOptions)
