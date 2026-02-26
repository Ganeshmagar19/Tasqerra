// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// // import User from "../models/user";
// import { prisma } from "../config/prisma";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: "http://localhost:5000/api/auth/google/callback",
//     },
//     async (_accessToken, _refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;

//         if (!email) {
//           return done(new Error("No email from Google"), undefined);
//         }

//         let existingUser = await prisma.user.findUnique({ where: { email } });

//         if (!existingUser) {
//           existingUser = await prisma.user.create({
//               data: {
//             name: profile.displayName,
//             email,
//             password: "GOOGLE_AUTH",
//               }
//           });
//         }

//         return done(null, existingUser);
//       } catch (err) {
//         done(err, undefined);
//       }
//     }
//   )
// );

// // Required by passport (even if not used)
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: string, done) => {
//   const user = await prisma.user.findUnique({ where: { id } });
//   done(null, user);
// });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../config/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email from Google"), undefined);
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              password: "GOOGLE_AUTH",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  )
);

export default passport;