<template>
    <div>
        <div class="w3-padding w3-text-white primary">
            <b>Top ISM Facebook Posts</b>
            <span class="w3-padding">{{ posts.last_posts }}</span>
            <i class="fa fa-refresh w3-right" style="font-size:24px"
                v-on:click="$emit('updatePosts')"></i>
        </div>
        <table class="w3-table-all">
            <tr>
                <td>Post Date</td>
                <td>Post Content</td>
                <td>Total Reactions</td>
            </tr>
            <tr
                v-for="post in posts.posts">
                <td>{{ post.date }}</td>
                <td>{{ post.content }}</td>
                <td>{{ post.reactions }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            posts: {
                type: Object
            }
        }
    }
</script>
