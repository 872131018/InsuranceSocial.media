<template lang="pug">
    div
        div(class="w3-padding w3-text-white primary")
            b Top ISM Tweets
            span(class="w3-padding") {{ posts.created_at }}
            i(class="fa fa-refresh w3-right" style="font-size:24px"
                @click="$emit('updatePosts')")
        table(class="w3-table-all")
            tr
                td #[b Post Date ]
                td #[b Post Content ]
                td #[b Total Interactions ]
            tr(
                v-for="post in posts.posts")
                td {{ post.date.slice(0, 10) }}
                td {{ post.content }}
                td {{ post.rfm }}
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
