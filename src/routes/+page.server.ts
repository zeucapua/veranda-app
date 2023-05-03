import { prisma } from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export async function load({ locals }) {
  const posts = await prisma.post.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });
  return { posts };
}

export const actions = {
  createPost: async ({ locals, request }) => {
    const data = await request.formData();
    const content = data.get("content");
    const session = await locals.getSession();
    const user = session.user;

    const post = await prisma.post.create({
      data: {
        content,
        user: { connect: { id: user.id } }
      }
    });

    if (!post) { 
      return fail(502, { message: "There's been a problem posting. Try again."} ); 
    }
  },
  clapPost: async ({ request }) => {
    const data = await request.formData();
    const post_id = data.get("post_id");
    
    const post = await prisma.post.update({
      where: { id: post_id },
      data: { claps: { increment: 1 } }
    });

    if (!post) { 
      return fail(502, { message: "Cannot clap right now. Try again." });
    }
  }
}
