<template lang="pug">
    div
        div(class="w3-padding w3-text-white primary")
            b Facebook Performance
            span(class="w3-padding") {{ performance.created_at.slice(0, 10) }}
            i(class="fa fa-refresh w3-right" style="font-size:24px"
                @click="$emit('updatePerformance', range)")
        div(class="w3-blue")
            i(class="fa fa-facebook-official w3-padding")
            span(class="w3-padding"
                :style="{ textDecoration: range == 30 ? 'underline' :  'none' }"
                @click="$emit('setRange', 30)") Last 30 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 60 ? 'underline' :  'none' }"
                @click="$emit('setRange', 60)") Last 60 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 90 ? 'underline' :  'none' }"
                @click="$emit('setRange', 90)") Last 90 Days
        table(class="w3-table-all w3-half")
            tr
                td Reach
                td(class="bold") {{ performance.reach }}
                td(
                    :class="{'w3-text-green': performance.reach_percentage.charAt(0) == '+', 'w3-text-red': performance.reach_percentage.charAt(0) == '-'}") {{ performance.reach_percentage }}
            tr
                td Clicks
                td(class="bold") {{ performance.clicks }}
                td(
                    :class="{'w3-text-green': performance.clicks_percentage.charAt(0) == '+','w3-text-red': performance.clicks_percentage.charAt(0) == '-'}") {{ performance.clicks_percentage }}
            tr
                td Likes
                td(class="bold") {{ performance.likes }}
                td(
                    :class="{'w3-text-green': performance.likes_percentage.charAt(0) == '+','w3-text-red': performance.likes_percentage.charAt(0) == '-'}") {{ performance.likes_percentage }}
        table(class="w3-table-all w3-half")
            tr
                td Engagement
                td(class="bold") {{ performance.engagement }}
                td(
                    :class="{'w3-text-green': performance.engagement_percentage.charAt(0) == '+','w3-text-red': performance.engagement_percentage.charAt(0) == '-'}") {{ performance.engagement_percentage }}
            tr
                td Shares
                td(class="bold") {{ performance.shares }}
                td(
                    :class="{'w3-text-green': performance.shares_percentage.charAt(0) == '+','w3-text-red': performance.shares_percentage.charAt(0) == '-'}") {{ performance.shares_percentage }}
            tr
                td Comments
                td(class="bold") {{ performance.comments }}
                td(
                    :class="{'w3-text-green': performance.comments_percentage.charAt(0) == '+','w3-text-red': performance.comments_percentage.charAt(0) == '-'}") {{ performance.comments_percentage }}
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
