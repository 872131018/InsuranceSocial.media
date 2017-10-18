<template>
    <div class="bar-chart"></div>
</template>

<script>
    import Chartist from 'chartist';

    export default {
        props: {
            labels: {
                type: Array
            },
            series: {
                type: Array
            }
        },
        mounted() {
            new Chartist.Bar('.bar-chart', {
                labels: this.labels,
                series: [
                    this.series
                ]
            }, {
                low: 0,
                high: 100
            });
        }
    }
</script>
