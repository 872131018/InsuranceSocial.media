<template>
    <div>
        <div class="w3-container w3-card-2 dashboard">
            <div class="w3-half w3-padding">
                <div class="w3-padding primary">
                    <b>Overall Performance</b>
                    <i class="fa fa-cog w3-right" style="font-size:24px"
                        v-on:click="update()"></i>
                </div>
                <FacebookPerformance
                    v-bind:facebookPerformance="facebookPerformance">
                </FacebookPerformance>
                <TwitterPerformance></TwitterPerformance/>
            </div>
            <div class="w3-half w3-center">
                <h1>Content Insights</h1>
                <div class="w3-half">
                    <div class="pie-chart"></div>
                </div>
                <div class="w3-half">
                    <div class="bar-chart"></div>
                </div>
            </div>
            <div class="w3-panel w3-center">
                <h1>Interaction Trends</h1>
                <div class="line-chart"></div>
            </div>
            <div class="w3-panel w3-center">
                <h1>Top Posts and Followers</h1>
                <div class="w3-section">
                    <div class="w3-half">Top 5 Posts</div>
                    <div class="w3-half">Most Engaged Users</div>
                    <TopPosts></TopPosts>
                    <MostEngaged></MostEngaged>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FacebookPerformance from './FacebookPerformance';
    import TwitterPerformance from './TwitterPerformance';
    import TopPosts from './TopPosts';
    import MostEngaged from './MostEngaged';
    import Chartist from 'chartist';

    export default {
        data() {
            return {
                facebookPerformance: {
                    reach: '',
                    clicks: '',
                    likes: '',
                    shares: '',
                    comments: '',
                    engagement: ''
                }
            }
        },
        mounted() {
            let lineData = {
                series: [5, 3, 4]
            };

            let sum = function(a, b) { return a + b };

            new Chartist.Pie('.pie-chart', lineData, {
                labelInterpolationFnc: function(value) {
                    return Math.round(value / lineData.series.reduce(sum) * 100) + '%';
                }
            });

            new Chartist.Bar('.bar-chart', {
                labels: ['ISM Score', 'ISM Average'],
                series: [
                    [48, 29]
                ]
            });

            new Chartist.Line('.line-chart', {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                series: [
                    [12, 9, 7, 8, 5],
                    [2, 1, 3.5, 7, 3],
                    [1, 3, 4, 5, 6]
                ]
            }, {
                fullWidth: true
            });
        },
        methods: {
            update() {
                this.loading++;
                axios.get(`${ window.base_url }/api/dashboard/performance`).then(response => {
                    this.facebookPerformance = response.data;
                    console.log(response.data)
                    this.loading--;
                });
            }
        },
        components: {
            FacebookPerformance,
            TwitterPerformance,
            TopPosts,
            MostEngaged
        }
    }
</script>
