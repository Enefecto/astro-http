import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
export const prerender = false;

// Get Clients
export const GET: APIRoute = async () => {
  const users = await db.select().from(Clients);
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// Create a new Client
export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({
        id: lastInsertRowid?.toString(),
        ...body,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "El body no fue encontrado" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
