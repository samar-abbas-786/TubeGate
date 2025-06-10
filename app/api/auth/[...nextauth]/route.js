import NextAuth from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import prisma from "../../../../DB/db.config";

const handler = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          profession: true,
        },
      });
      console.log("sessionUser", sessionUser);
      if (sessionUser) {
        session.user.id = sessionUser.id.toString();
        session.user.role = sessionUser?.profession[0]?.role;
        return session;
      }
    },
    async signIn({ account, profile, credentials, user }) {
      const isUser = await prisma.user.findUnique({
        where: {
          email: profile.email,
        },
      });
      if (!isUser) {
        await prisma.user.create({
          data: {
            name: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile?.image || null,
            password: "",
          },
        });
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
