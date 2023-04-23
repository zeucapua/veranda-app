import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const id = params.id;

  const user_data = await prisma.user.findUnique({ 
    where: { id }, 
    include: { posts: true }, 
  });

  if (!user_data) { return error(404, "User not found"); }

  const { posts, ...user } = user_data;

  return { user, posts }
}
