// import { NextAuthOptions } from "next-auth";
// import { CredentialsProvider , CredentialsProviderType} from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider:({
//       name: "Sign In",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any, req: { body: { username: any; email: any; }; }) {
//         const user = { name: req.body.username, email: req.body.email };

//         if (user) {
//           return Promise.resolve(user);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       try {
//         const res = await fetch("https://www.aitoolsnext.com/api/signUpHandler", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: profile?.email,
//             username: profile?.name,
//             uid: profile?.email,
//             password: profile?.email,
//           }),
//         });
//         return true;
//       } catch (error) {
//         console.log("Error checking if user exists: ", error);
//         return true;
//       }
//     },
//   },
// };

// export default authOptions;
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
   providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    
      async authorize(credentials, req) {
        const user = { name: req.body?.username, email: req.body?.email };

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }