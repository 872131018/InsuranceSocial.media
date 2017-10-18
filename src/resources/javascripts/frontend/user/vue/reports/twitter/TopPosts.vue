<template>
    <div>
        <div class="w3-padding w3-text-white primary">
            <b>Top ISM Tweets</b>
            <span class="w3-padding">{{ posts.last_posts }}</span>
            <i class="fa fa-refresh w3-right" style="font-size:24px"
                v-on:click="$emit('updatePosts')"></i>
        </div>
        <table class="w3-table-all">
            <tr>
                <td>Post Date</td>
                <td>Post Content</td>
                <td>Total RFM</td>
            </tr>
            <tr
                v-for="post in posts.posts">
                <td>{{ post.date }}</td>
                <td>{{ post.content }}</td>
                <td>{{ post.rfm }}</td>
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
