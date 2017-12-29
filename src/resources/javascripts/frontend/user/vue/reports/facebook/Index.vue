<template lang="pug">
    div(class="w3-card w3-padding dashboard")
        div(class="w3-row")
            div(class="w3-half w3-padding")
                Performance(
                    :performance="performance"
                    :range="performanceRange"
                    @setRange="(value) => $store.commit('setFacebookPerformanceRange', value)"
                    @updatePerformance="updatePerformance(performanceRange)")
            div(class="w3-half w3-padding")
                Interaction(
                    :interaction="interaction"
                    :range="interactionRange"
                    :graph="interactionGraph"
                    @setRange="(value) => $store.commit('setFacebookInteractionRange', value)"
                    @setGraph="(value) => $store.commit('setFacebookInteractionGraph', value)"
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
                return this.$store.state.facebookPerformance;
            },
            performanceRange() {
                return this.$store.state.transient.facebookPerformanceRange;
            },
            interaction() {
                return this.$store.state.facebookInteraction;
            },
            interactionRange() {
                return this.$store.state.transient.facebookInteractionRange;
            },
            interactionGraph() {
                return this.$store.state.transient.facebookInteractionGraph;
            },
            posts() {
                return this.$store.state.facebookPosts;
            }
        },
        mounted() {
            this.initialize();
        },
        updated() {
            this.initialize();
        },
        methods: {
            initialize() {
                this.updatePerformance();
                this.updateInteraction();
                this.updatePosts();

                let pieData = {
                    series: [18, 15, 10, 57]
                };

                let sum = function(a, b) { return a + b };

                new Chartist.Pie('.pie-chart', pieData, {
                    labelInterpolationFnc: function(value) {
                        return Math.round(value / pieData.series.reduce(sum) * 100) + '%';
                    }
                });
            },
            updatePerformance() {
                this.$store.commit('serviceLoading');
                axios.get(`/api/reports/facebook/performance?range=${ this.performanceRange }`).then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setFacebookPerformance', response.data);
                });
            },
            updateInteraction() {
                this.$store.commit('serviceLoading');
                axios.get(`/api/reports/facebook/interaction?range=${ this.interactionRange }`).then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setFacebookInteraction', response.data);
                });
            },
            updatePosts() {
                this.$store.commit('serviceLoading');
                axios.get('/api/reports/facebook/posts').then(response => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setFacebookPosts', response.data);
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
