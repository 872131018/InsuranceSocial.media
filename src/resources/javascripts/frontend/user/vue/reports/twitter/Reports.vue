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
                        <p>Carrier 22%</p>
                        <p>Coverage 13%</p>
                        <p>Industry 37%</p>
                        <p>Community 28%</p>
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
                    followers: '',
                    retweets: '',
                    favorites: '',
                    mentions: '',
                    retweets_percentage: '',
                    favorites_percentage: '',
                    mentions_percentage: '',
                    last_performance: ''
                },
                interaction: {
                    retweet_labels: [],
                    retweet_series: [],
                    favorite_labels: [],
                    favorite_series: [],
                    mention_labels: [],
                    mention_series: [],
                    last_interaction: ''
                },
                posts: {
                    posts: [],
                    last_posts: ''
                }
            }
        },
        mounted() {
            let pieData = {
                series: [22, 13, 37, 28]
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
            this.updatePerformance(50);
            this.updateInteraction(50);
            this.updatePosts();
        },
        methods: {
            updatePerformance(range) {
                this.loading++;
                axios.get(`/api/reports/twitter/performance?range=${ range }`).then(response => {
                    this.performance = {
                        followers: response.data.followers,
                        retweets: response.data.retweets,
                        favorites: response.data.favorites,
                        mentions: response.data.mentions,
                        retweets_percentage: response.data.retweets_percentage,
                        favorites_percentage: response.data.favorites_percentage,
                        mentions_percentage: response.data.mentions_percentage,
                        last_performance: response.data.created_at.slice(0, 10)
                    };
                    this.loading--;
                });
            },
            updateInteraction(range) {
                this.loading++;
                axios.get(`/api/reports/twitter/interaction?range=${ range }`).then(response => {
                    this.interaction = {
                        retweet_labels: JSON.parse(response.data.retweet_labels),
                        retweet_series:  JSON.parse(response.data.retweet_series),
                        favorite_labels: JSON.parse(response.data.favorite_labels),
                        favorite_series:  JSON.parse(response.data.favorite_series),
                        mention_labels: JSON.parse(response.data.mention_labels),
                        mention_series:  JSON.parse(response.data.mention_series),
                        last_interaction: response.data.created_at.slice(0, 10)
                    };
                    this.loading--;
                });
            },
            updatePosts() {
                this.loading++;
                axios.get('/api/reports/twitter/posts').then(response => {
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
