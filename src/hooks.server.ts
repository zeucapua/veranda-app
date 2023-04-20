import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "$lib/prisma";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";

export const auth = (async (...args) => {
  const [{event}] = args;
  return SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      Discord({ clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET }), 
    ], 
    callbacks: {
      async session({ user, session }) {
        session.user = {
          id: user.id,
          name: user.name,
          image: user.image,
        };

        event.locals.session = session
        return session
      }
    }
  })(...args);
}) satisfies Handle;

export const handle = sequence(auth);

