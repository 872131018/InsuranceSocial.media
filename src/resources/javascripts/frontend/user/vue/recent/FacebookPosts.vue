<template>
    <div>
        <div id="fb-root"></div>
        <div class="fb-post" data-width="auto"
            v-for="post in posts"
            v-bind:data-href="post.permalink_url">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            posts: {
                type: Array
            }
        }
    }
</script>
