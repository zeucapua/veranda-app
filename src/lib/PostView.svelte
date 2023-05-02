<script lang="ts">
  import { onMount } from "svelte";
  import { format } from "timeago.js";
  import { enhance } from "$app/forms";
  import type { Post, User } from "@prisma/client";

  export let post : Post;
  export let user : User;
  
  let claps : number;

  onMount(() => { claps = post.claps; });
  
  function onClap() { claps += 1; } 

  let duration = format(post.createdAt);
</script>

<div class="flex flex-row gap-8 items-center">
  <a href={`/u/${user.id}`} class="btn btn-ghost btn-circle avatar">
    <img src={user.image} alt={`${user.name}`} class="w-16 h-16 rounded-full"/>
  </a>
  <div class="flex flex-col gap-2">
    <a href={`/p/${post.id}`}>
      <p class="text-neutral-400 pb-2">
        <a href={`/u/${user.id}`}>@{user.name}</a> 
        | {duration}
      </p>
      <p class="text-xl text-white">{post.content}</p>
    </a>
    <form method="POST" action="?/clapPost" use:enhance>
      <input name="post_id" type="hidden" value={post.id} />
      <button 
        class="btn btn-outline btn-secondary rounded-full" 
        on:click={onClap}
      >
        👏 {#if !claps}...{:else}{claps}{/if}
      </button>
    </form>
  </div>
</div>
