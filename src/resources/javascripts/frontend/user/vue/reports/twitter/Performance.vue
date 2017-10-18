<template>
    <div>
        <div class="w3-padding w3-text-white primary">
            <b>Twitter Performance</b>
            <span class="w3-padding">{{ performance.last_performance }}</span>
            <i class="fa fa-refresh w3-right" style="font-size:24px"
                v-on:click="$emit('updatePerformance', range)"></i>
        </div>
        <div class="w3-blue">
            <i class="fa fa-twitter w3-padding"></i>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 20 ? 'underline' :  'none' }"
                v-on:click="range = 20">Last 20 Tweets</span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 50 ? 'underline' :  'none' }"
                v-on:click="range = 50">Last 50 Tweet</span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 100 ? 'underline' :  'none' }"
                v-on:click="range = 100">Last 100 Tweet</span>
        </div>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Followers</td>
                <td class="bold">{{ performance.followers }}</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Mentions</td>
                <td class="bold">{{ performance.mentions }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.mentions_percentage.charAt(0) == '+',
                    'w3-text-red': performance.mentions_percentage.charAt(0) == '-'
                    }">{{ performance.mentions_percentage }}</td>
            </tr>
        </table>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Retweets</td>
                <td class="bold">{{ performance.retweets }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.retweets_percentage.charAt(0) == '+',
                    'w3-text-red': performance.retweets_percentage.charAt(0) == '-'
                    }">{{ performance.retweets_percentage }}</td>
            </tr>
            <tr>
                <td>Favorites</td>
                <td class="bold">{{ performance.favorites }}</td>
                <td v-bind:class="{
                    'w3-text-green': performance.favorites_percentage.charAt(0) == '+',
                    'w3-text-red': performance.favorites_percentage.charAt(0) == '-'
                    }">{{ performance.favorites_percentage }}</td>
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
                range: 50
            }
        }
    }
</script>
