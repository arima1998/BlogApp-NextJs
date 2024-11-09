import { db } from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS solution");
    return new Response(
      JSON.stringify({
        message: "Database connection successful",
        result: rows[0].solution,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Database connection failed",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
