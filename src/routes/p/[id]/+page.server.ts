import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const id = params.id;

  const post_data = await prisma.post.findUnique({ 
    where: { id }, 
    include: { user: true }, 
  });

  if (!post_data) { return error(404, "User not found"); }

  const { user, ...post } = post_data;

  return { user, post }
}
