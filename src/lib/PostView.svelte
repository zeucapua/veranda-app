<script lang="ts">
  import { format } from "timeago.js";
  import type { Post, User } from "@prisma/client";

  export let post : Post;
  export let user : User;

  let duration = format(post.createdAt)
</script>

<div class="flex flex-row gap-8 items-center">
  <a href={`/u/${user.id}`}>
    <img src={user.image} alt={`${user.name}`} class="w-16 h-16 rounded-full"/>
  </a>
  <a href={`/p/${post.id}`}>
    <div class="flex flex-col gap-2">
      <p class="text-neutral-400">
        <a href={`/u/${user.id}`}>@{user.name}</a> 
        | {duration}
      </p>
      <p class="text-xl text-white">{post.content}</p>
      <button></button>
    </div>
  </a>
</div>
