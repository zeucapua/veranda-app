<script lang="ts">
  import { page } from "$app/stores";
  import PostView from "$lib/PostView.svelte";

  let user = $page.data.session?.user;

  export let data;
  let posts = data.posts;
</script>


{#if user}
  <form method="POST" action="?/createPost" class="flex flex-row gap-8 items-center">
    <img src={user?.image} alt={`${user?.name} Profile Picture`} 
      class="w-0 h-0 md:w-16 md:h-16 md:rounded-full"/>
    <input 
      type="text" name="content" placeholder="Share with your friends..." 
      class="grow input input-bordered input-primary"/>
  </form>
{/if}

{#if posts}
  {#each posts as {user, ...post}}
    <PostView {post} {user} />
  {/each}
{/if}

