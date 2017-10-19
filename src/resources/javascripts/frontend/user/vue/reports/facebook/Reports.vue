<template>
    <div>
        <div class="w3-card-2 dashboard">
            <div class="w3-container">
                <div class="w3-half w3-padding">
                    <Performance
                        v-bind:performance="performance"
                        v-on:updatePerformance="updatePerformance($event)">
                    </Performance>
                </div>
                <div class="w3-half w3-padding">
                    <Interaction
                        v-bind:interaction="interaction"
                        v-on:updateInteraction="updateInteraction($event)">
                    </Interaction>
                </div>
            </div>
            <div class="w3-container">
                <div class="w3-half w3-padding">
                    <div class="w3-padding w3-text-white primary">
                        <b>Content Insights</b>
                        <span class="w3-padding"></span>
                        <i class="fa fa-refresh w3-right" style="font-size:24px"
                            v-on:click="updateInsights()">
                        </i>
                    </div>
                    <div class="w3-half w3-center">
                        <p>Carrier 18%</p>
                        <p>Coverage 15%</p>
                        <p>Industry 10%</p>
                        <p>Community 57%</p>
                    </div>
                    <div class="w3-half">
                        <div class="pie-chart"></div>
                    </div>
                </div>
                <div class="w3-half w3-padding">
                    <TopPosts
                        v-bind:posts="posts"
                        v-on:updatePosts="updatePosts()">
                    </TopPosts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Performance from './Performance';
    import Interaction from './Interaction';
    import TopPosts from './TopPosts';
    import Chartist from 'chartist';

    export default {
        data() {
            return {
                performance: {
                    reach: '',
                    clicks: '',
                    likes: '',
                    shares: '',
                    comments: '',
                    engagement: '',
                    reach_percentage: '',
                    clicks_percentage: '',
                    likes_percentage: '',
                    shares_percentage: '',
                    comments_percentage: '',
                    engagement_percentage: '',
                    last_performance: ''
                },
                interaction: {
                    reach_labels: [],
                    reach_series: [],
                    engagement_labels: [],
                    engagement_series: [],
                    ratio_labels: [],
                    ratio_series: [],
                    last_interaction: ''
                },
                posts: {
                    posts: [],
                    last_posts: ''
                },
                twitterPerformance: {
                    followers: '',
                    mentions: '',
                    retweets: '',
                    favorites: ''
                }
            }
        },
        mounted() {
            let pieData = {
                series: [18, 15, 10, 57]
            };

            let sum = function(a, b) { return a + b };

            new Chartist.Pie('.pie-chart', pieData, {
                labelInterpolationFnc: function(value) {
                    return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
                }
            });
            /**
            * REFRESH GRAPHS
            */
            this.updatePerformance(60);
            this.updateInteraction(60);
            this.updatePosts();
        },
        methods: {
            updatePerformance(range) {
                this.loading++;
                axios.get(`/api/reports/facebook/performance?range=${ range }`).then(response => {
                    this.performance = {
                        reach: response.data.reach,
                        clicks: response.data.clicks,
                        likes: response.data.likes,
                        shares: response.data.shares,
                        comments: response.data.comments,
                        engagement: response.data.engagement,
                        reach_percentage: response.data.reach_percentage,
                        clicks_percentage: response.data.clicks_percentage,
                        likes_percentage: response.data.likes_percentage,
                        shares_percentage: response.data.shares_percentage,
                        comments_percentage: response.data.comments_percentage,
                        engagement_percentage: response.data.engagement_percentage,
                        last_performance: response.data.created_at.slice(0, 10)
                    };
                    this.loading--;
                });
            },
            updateInteraction(range) {
                this.loading++;
                axios.get(`/api/reports/facebook/interaction?range=${ range }`).then(response => {
                    this.interaction = {
                        reach_labels: JSON.parse(response.data.reach_labels),
                        reach_series:  JSON.parse(response.data.reach_series),
                        engagement_labels: JSON.parse(response.data.engagement_labels),
                        engagement_series:  JSON.parse(response.data.engagement_series),
                        ratio_labels: JSON.parse(response.data.ratio_labels),
                        ratio_series:  JSON.parse(response.data.ratio_series),
                        last_interaction: response.data.created_at.slice(0, 10)
                    };
                    this.loading--;
                });
            },
            updatePosts() {
                this.loading++;
                axios.get('/api/reports/facebook/posts').then(response => {
                    this.posts = {
                        posts: response.data,
                        last_post: 'asdfasdf'
                    };
                    this.loading--;
                });
            }
        },
        components: {
            Performance,
            Interaction,
            TopPosts
        }
    }
</script>
