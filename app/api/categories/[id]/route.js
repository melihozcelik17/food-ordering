import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";

export const GET = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return new Response(JSON.stringify({ message: "Category not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(category), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Server Error" }), { status: 500 });
    }
};

export async function DELETE(req, { params }) {
    await dbConnect();
    const { id } = params;
    try {
        const result = await Category.findByIdAndDelete(id);
        if (!result) return new Response('Category not found', { status: 404 });
        return new Response('Category deleted', { status: 200 });
    } catch (error) {
        return new Response('Error deleting category', { status: 500 });
    }
}