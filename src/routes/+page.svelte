<script lang="ts">
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";
    import { stringify } from "postcss";

  let show_menu = false;
  let user = $page.data.session?.user;

  export let data;
  let posts = data.posts;

</script>

<main class="flex flex-col w-full h-full min-w-screen min-h-screen p-16 bg-zinc-800 gap-8">

  <section class="flex flex-row justify-between border-b-white border-b-2 px-4 py-2">
    <button class="text-3xl text-white font-bold">Veranda</button>
    {#if !user}
      <button on:click={() => signIn("discord")} class="text-white px-4 py-1 border-2 border-white rounded-md">
        Log in with Discord
      </button>
    {:else}
      <div class="flex flex-row gap-8">
        {#if show_menu}
          <button on:click={() => signOut()} class="text-white px-4 py-1 border-2 border-white rounded-md">
            Log out
          </button> 
        {/if}
        <button on:click={() => show_menu = !show_menu}> 
          <img 
            src={user.image} alt={`${user.name} Profile Picture`} 
            class="w-16 h-16 rounded-full"/>
        </button>
      </div>
    {/if}
  </section>

  {#if user}
  <form method="POST" action="?/createPost" class="flex flex-row gap-8">
    <img src={user?.image} alt={`${user?.name} Profile Picture`} 
      class="w-16 h-16 rounded-full"/>
    <input 
      type="text" name="content" placeholder="Share with your friends..." 
      class="grow bg-zinc-800 px-4 text-white"/>
  </form>
  {/if}

  {#if posts}
    {#each posts as {user, ...post}}
      <div class="flex flex-row gap-8 items-center">
        <img src={user.image} alt={`${user.name}`} class="w-16 h-16 rounded-full"/>
        <div class="flex flex-col gap-2">
          <p class="text-neutral-400">@{user.name} | {post.createdAt.toLocaleTimeString()}</p>
          <p class="text-xl text-white">{post.content}</p>
        </div>
      </div>
    {/each}
  {/if}

</main>
