<template lang="pug">
    div(class="w3-card w3-padding dashboard")
        div(class="w3-row")
            div(class="w3-half w3-padding")
                Performance(
                    :performance="performance"
                    :range="performanceRange"
                    @setRange="(value) => $store.commit('setTwitterPerformanceRange', value)"
                    @updatePerformance="updatePerformance(performanceRange)")
            div(class="w3-half w3-padding")
                Interaction(
                    :interaction="interaction"
                    :range="interactionRange"
                    :graph="interactionGraph"
                    @setRange="(value) => $store.commit('setTwitterInteractionRange', value)"
                    @setGraph="(value) => $store.commit('setTwitterInteractionGraph', value)"
                    @updateInteraction="updateInteraction(interactionRange)")
        div(class="w3-row")
            div(class="w3-half w3-padding")
                div(class="w3-padding w3-text-white primary")
                    b Content Insights
                    span(class="w3-padding")
                    i(class="fa fa-refresh w3-right" style="font-size:24px"
                        @click="updateInsights()")
                div(class="w3-half w3-center")
                    p Carrier 18%
                    p Coverage 15%
                    p Industry 10%
                    p Community 57%
                div(class="w3-half")
                    div(class="pie-chart")
            div(class="w3-half w3-padding")
                TopPosts(
                    :posts="posts"
                    @updatePosts="updatePosts()")
</template>

<script>
    import Performance from './Performance';
    import Interaction from './Interaction';
    import TopPosts from './TopPosts';
    import Chartist from 'chartist';

    export default {
        computed: {
            performance() {
                return this.$store.state.twitterPerformance;
            },
            performanceRange() {
                return this.$store.state.transient.twitterPerformanceRange;
            },
            interaction() {
                return this.$store.state.twitterInteraction;
            },
            interactionRange() {
                return this.$store.state.transient.twitterInteractionRange;
            },
            interactionGraph() {
                return this.$store.state.transient.twitterInteractionGraph;
            },
            posts() {
                return this.$store.state.twitterPosts;
            }
        },
        mounted() {
            /**
            * REFRESH GRAPHS
            */
            this.updatePerformance(50);
            this.updateInteraction(50);
            this.updatePosts();

            let pieData = {
                series: [22, 13, 37, 28]
            };

            let sum = function(a, b) { return a + b };

            new Chartist.Pie('.pie-chart', pieData, {
                labelInterpolationFnc: function(value) {
                    return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
                }
            });
        },
        methods: {
            updatePerformance() {
                this.$store.commit('serviceLoading');
                axios.get(`/api/reports/twitter/performance?range=${ this.performanceRange }`).then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setTwitterPerformance', response.data);
                });
            },
            updateInteraction() {
                this.$store.commit('serviceLoading');
                axios.get(`/api/reports/twitter/interaction?range=${ this.interactionRange }`).then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setTwitterInteraction', response.data);
                });
            },
            updatePosts() {
                this.$store.commit('serviceLoading');
                axios.get('/api/reports/twitter/posts').then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setTwitterPosts', response.data);
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
