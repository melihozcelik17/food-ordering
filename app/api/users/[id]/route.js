
import User from "@/models/User";
import dbConnect from "@/util/dbConnect";

export const GET = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Server Error" }), { status: 500 });
    }
};
