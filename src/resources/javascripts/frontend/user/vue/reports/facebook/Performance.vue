<template>
    <div>
        <div class="w3-padding w3-text-white primary">
            <b>Facebook Performance</b>
            <span class="w3-padding">{{ performance.last_performance }}</span>
            <i class="fa fa-refresh w3-right" style="font-size:24px"
                v-on:click="$emit('updatePerformance', range)"></i>
        </div>
        <div class="w3-blue">
            <i class="fa fa-facebook-official w3-padding"></i>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 30 ? 'underline' :  'none' }"
                v-on:click="range = 30">Last 30 Days</span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 60 ? 'underline' :  'none' }"
                v-on:click="range = 60">Last 60 Days</span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 90 ? 'underline' :  'none' }"
                v-on:click="range = 90">Last 90 Days</span>
        </div>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Reach</td>
                <td class="bold">{{ performance.reach }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.reach_percentage.charAt(0) == '+',
                    'w3-text-red': performance.reach_percentage.charAt(0) == '-'
                    }">{{ performance.reach_percentage }}</td>
            </tr>
            <tr>
                <td>Clicks</td>
                <td class="bold">{{ performance.clicks }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.clicks_percentage.charAt(0) == '+',
                    'w3-text-red': performance.clicks_percentage.charAt(0) == '-'
                    }">{{ performance.clicks_percentage }}</td>
            </tr>
            <tr>
                <td>Likes</td>
                <td class="bold">{{ performance.likes }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.likes_percentage.charAt(0) == '+',
                    'w3-text-red': performance.likes_percentage.charAt(0) == '-'
                    }">{{ performance.likes_percentage }}</td>
            </tr>
        </table>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Engagement</td>
                <td class="bold">{{ performance.engagement }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.engagement_percentage.charAt(0) == '+',
                    'w3-text-red': performance.engagement_percentage.charAt(0) == '-'
                    }">{{ performance.engagement_percentage }}</td>
            </tr>
            <tr>
                <td>Shares</td>
                <td class="bold">{{ performance.shares }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.shares_percentage.charAt(0) == '+',
                    'w3-text-red': performance.shares_percentage.charAt(0) == '-'
                    }">{{ performance.shares_percentage }}</td>
            </tr>
            <tr>
                <td>Comments</td>
                <td class="bold">{{ performance.comments }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.comments_percentage.charAt(0) == '+',
                    'w3-text-red': performance.comments_percentage.charAt(0) == '-'
                    }">{{ performance.comments_percentage }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            performance: {
                type: Object
            }
        },
        data() {
            return {
                range: 60
            }
        }
    }
</script>
