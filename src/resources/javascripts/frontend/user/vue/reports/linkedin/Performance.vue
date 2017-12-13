<template lang="pug">
    div
        div(class="w3-padding w3-text-white primary")
            b Twitter Performance
            span(class="w3-padding") {{ performance.last_performance }}
            i(class="fa fa-refresh w3-right" style="font-size:24px"
                @click="$emit('updatePerformance', range)")
        div(class="w3-blue")
            i(class="fa fa-facebook-official w3-padding")
            span(class="w3-padding"
                :style="{ textDecoration: range == 20 ? 'underline' :  'none' }"
                @click="$emit('setRange', 20)") Last 20 Tweets
            span(class="w3-padding"
                :style="{ textDecoration: range == 50 ? 'underline' :  'none' }"
                @click="$emit('setRange', 50)") Last 50 Tweets
            span(class="w3-padding"
                :style="{ textDecoration: range == 100 ? 'underline' :  'none' }"
                @click="$emit('setRange', 100)") Last 100 Tweets
        table(class="w3-table-all w3-half")
            tr
                td Followers
                td(class="bold") {{ performance.followers }}
                td --
            tr
                td Mentions
                td(class="bold") {{ performance.mentions }}
                td(
                    :class="{'w3-text-green': performance.mentions_percentage.charAt(0) == '+','w3-text-red': performance.mentions_percentage.charAt(0) == '-'}") {{ performance.mentions_percentage }}
        table(class="w3-table-all w3-half")
            tr
                td Retweets
                td(class="bold") {{ performance.retweets }}
                td(
                    :class="{'w3-text-green': performance.retweets_percentage.charAt(0) == '+','w3-text-red': performance.retweets_percentage.charAt(0) == '-'}") {{ performance.retweets_percentage }}
            tr
                td Favorites
                td(class="bold") {{ performance.favorites }}
                td(
                    :class="{'w3-text-green': performance.favorites_percentage.charAt(0) == '+','w3-text-red': performance.favorites_percentage.charAt(0) == '-'}") {{ performance.favorites_percentage }}
</template>

<script>
    export default {
        props: {
            performance: {
                type: Object
            },
            range: {
                type: Number
            }
        }
    }
</script>
