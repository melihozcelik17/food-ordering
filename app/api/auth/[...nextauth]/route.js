// // import NextAuth from "next-auth";
// // import GithubProvider from "next-auth/providers/github";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // // import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// // // import clientPromise from "../../../util/mongo";

// // import bcrypt from "bcrypt";
// // import User from "@/models/User";
// // import dbConnect from "@/util/dbConnect";

// // // import Credentials from "next-auth/providers/credentials"

// // dbConnect();

// // export default NextAuth({
// //     /*  adapter: MongoDBAdapter(clientPromise), */
// //     providers: [
// //         GithubProvider({
// //             clientId: process.env.GITHUB_ID,
// //             clientSecret: process.env.GITHUB_SECRET,
// //         }),
// //         CredentialsProvider({
// //             name: "Credentials",

// //             credentials: {
// //                 username: { label: "Username", type: "text", placeholder: "jsmith" },
// //                 password: { label: "Password", type: "password" },
// //             },
// //             async authorize(credentials, req) {
// //                 const email = credentials.email;
// //                 const password = credentials.password;
// //                 const user = await User.findOne({ email: email });
// //                 if (!user) {
// //                     throw new Error("You haven't registered yet!");
// //                 }
// //                 if (user) {
// //                     return signInUser({ user, password });
// //                 }
// //             },
// //         }),
// //     ],
// //     pages: {
// //         signIn: "/auth/login",
// //     },
// //     database: process.env.MONGODB_URI,
// //     secret: "secret",
// // });

// // const signInUser = async ({ user, password }) => {
// //     const isMAtch = await bcrypt.compare(password, user.password);
// //     if (!isMAtch) {
// //         throw new Error("Incorrect password!");
// //     }
// //     return user;
// // };

// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/util/dbConnect";
// import bcrypt from "bcrypt";
// import User from "@/models/User";

// export default NextAuth({
//     adapter: MongoDBAdapter(clientPromise),
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { username, password } = credentials;
//                 const user = await User.findOne({ username: username });
//                 if (!user) {
//                     throw new Error("You haven't registered yet!");
//                 }
//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (!isMatch) {
//                     throw new Error("Incorrect password!");
//                 }
//                 return user;
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/auth/login",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// });


import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import clientPromise from "@/util/mongo";
import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// dbConnect();

const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials.email;
                const password = credentials.password;

                await dbConnect();
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Kayıtlı değilsiniz!");
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Yanlış şifre!");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };



const signInUser = async ({ user, password }) => {
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
        throw new Error("Incorrect password!");
    }
    return user;
};