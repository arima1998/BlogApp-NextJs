import { db } from "@/utils/db";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [result] = await db.query("select * from posts where id = ?", [id]);
    if (result.length === 0) {
      return new Response(
        JSON.stringify({ message: "Not Posts with this Id found in database" }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Database Error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
