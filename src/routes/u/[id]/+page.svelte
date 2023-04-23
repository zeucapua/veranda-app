<script lang="ts">
  import type { User, Post } from '@prisma/client';
  import PostView from '$lib/PostView.svelte';

  export let data : PageData;
  const user : User = data.user;
  const posts : Post[] = data.posts;
</script>

  
<section class="flex flex-row gap-8 items-center">
  <img src={user.image} alt={`${user.name} Profile`} class="w-18 h-18 rounded-full" />
  <p class="text-4xl text-white">@{user.name}</p>
</section>

{#if !posts}
  <p>This user hasn't posted anything yet.</p>
{:else}
  {#each posts as post}
    <PostView {post} {user} />
  {/each}
{/if}
