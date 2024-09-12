import cookie from "cookie"

const handler = (res, req) => {
    const { method } = req;

    if (method === "POST") {
        const { username, password } = req.body;
        if (username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD) {
            res.setHeader(
                "Set-Cookie", cookie.serialize("token", process.env.ADMIN_TOKEN, {
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                }));
            res.status(200).json({ message: "Logged in successfully" });
        } else {
            res.status(400).json({ message: "Wrong Credentials" });
        }
    }

    if (method === "PUT") {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.ADMIN_TOKEN, {
                maxAge: -1,

                path: "/",
            }));
        res.status(200).json({ message: "Successfully" });
    }
};

export default handler;