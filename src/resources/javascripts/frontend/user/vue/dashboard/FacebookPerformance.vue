<template>
    <div>
        <div class="w3-blue">
            <i class="fa fa-facebook-official w3-padding"></i>
        </div>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Reach</td>
                <td class="bold"> {{ facebookPerformance.reach }}</td>
                <td class="w3-text-green">+3%</td>
            </tr>
            <tr>
                <td>Clicks</td>
                <td class="bold">{{ facebookPerformance.clicks }}</td>
                <td class="w3-text-red">-9%</td>
            </tr>
            <tr>
                <td>Likes</td>
                <td class="bold">{{ facebookPerformance.likes }}</td>
                <td class="w3-text-green">+12%</td>
            </tr>
        </table>
        <table class="w3-table-all w3-half">
            <tr>
                <td>Engagement</td>
                <td class="bold">{{ facebookPerformance.engagement }}</td>
                <td class="w3-text-green">+13%</td>
            </tr>
            <tr>
                <td>Shares</td>
                <td class="bold">{{ facebookPerformance.shares }}</td>
                <td class="w3-text-green">+25%</td>
            </tr>
            <tr>
                <td>Comments</td>
                <td class="bold">{{ facebookPerformance.comments }}</td>
                <td class="w3-text-red">-17%</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            facebookPerformance: {
                type: Object
            }
        },
        methods: {
            //
        }
    }
</script>
