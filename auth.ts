import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

// Callback function in this file are executed after succsessfull authentication by NextAuth

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub], // we just created a session
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
// after a successful signIn we need to create an author ID from Sanity to use it for our user profile or when creating a new startup
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id; // will allow us to connect a specific Github user with a Sanity author that can then create a startup
      }

      return token;
    },
// in order to use the ID we need to create a 3d callback function where we get access to a session and a token. And we need to pass the profile ID from the token to the session
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});


// async signIn({ user, account, profile })

// or 

// async signIn({
//   user: { name, email, image },
//   profile: { id, login, bio },
// })