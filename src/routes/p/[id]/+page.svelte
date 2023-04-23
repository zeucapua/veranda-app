<script lang="ts">
  import PostView from "$lib/PostView.svelte";
  import type { User, Post } from "@prisma/client";

  export let data : PageData;
  const post : Post = data.post;
  const user : User = data.user;
</script>

<PostView {user} {post} />
