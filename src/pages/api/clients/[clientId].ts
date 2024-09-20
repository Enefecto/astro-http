import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;

// Get client by ID
export const GET: APIRoute = async ({ params }) => {
  const clientId = params.clientId ?? "";

  const user = await db.select().from(Clients).where(eq(Clients.id, +clientId));
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// Partially update a Client
export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? "";

  try {
    const { id, ...body } = await request.json();

    await db.update(Clients).set(body).where(eq(Clients.id, +clientId));

    const updateClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updateClient), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
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

// Delete a Client
export const DELETE: APIRoute = async ({ params }) => {
  const clientId = params.clientId ?? "";

  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, +clientId));

  if (rowsAffected === 1) {
    return new Response(JSON.stringify({ message: "Cliente Eliminado" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(
      JSON.stringify({ message: "Id de cliente no existe" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
