<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import "../app.css";

  export let data;
  const user = data.session?.user;

  let show_menu = false;
</script>

<main class="flex flex-col w-full h-full min-w-screen min-h-screen p-16 bg-zinc-800 gap-8">

  <section class="flex flex-col lg:flex-row gap-4 justify-between border-b-white border-b-2 px-4 py-2">
    <button class="text-3xl text-white font-bold">Veranda</button>
    {#if !user}
      <button on:click={() => signIn("discord")} class="text-white px-4 py-1 border-2 border-white rounded-md">
        Log in with Discord
      </button>
    {:else}
      <div class="flex flex-row justify-center gap-8">
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

  <slot />

</main>
