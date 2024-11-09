import { db } from "@/utils/db";

export async function POST(req) {
  const { title, content, category } = await req.json();
  try {
    const [result] = await db.query(
      "INSERT INTO posts (title, content, category) VALUES (?, ?, ?)",
      [title, content, category]
    );
    return new Response(
      JSON.stringify({ id: result.insertId, title, content, category }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Database error", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Handler for GET request (Read)
export async function GET() {
  try {
    const [posts] = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  const { id, title, content, category } = await req.json();
  try {
    const [result] = await db.query(
      "update posts set title = ? , content = ? , category = ? where id = ?",
      [title, content, category, id]
    );
    return new Response(
      JSON.stringify({
        message: "Updated Successfully",
        affectedRows: result.affectedRows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const [result] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
    return new Response(
      JSON.stringify({
        message: "Post deleted successfully",
        affectedRows: result.affectedRows,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Database error", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
