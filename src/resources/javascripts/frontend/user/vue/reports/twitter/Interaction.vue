<template lang="pug">
    div
        div(class="w3-padding w3-text-white primary")
            b Interaction Trends
            span(class="w3-padding") {{ interaction.created_at.slice(0, 10) }}
            i(class="fa fa-refresh w3-right" style="font-size:24px"
                @click="$emit('updateInteraction', range)")
        div(class="w3-blue")
            i(class="fa fa-twitter w3-padding")
            span(class="w3-padding"
                :style="{ textDecoration: range == 20 ? 'underline' :  'none' }"
                @click="$emit('setRange', 20)") Last 20 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 50 ? 'underline' :  'none' }"
                @click="$emit('setRange', 50)") Last 50 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 100 ? 'underline' :  'none' }"
                @click="$emit('setRange', 100)") Last 100 Days
        div(class="line-chart")
        div(class="w3-center")
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'retweets'}"
                @click="$emit('setGraph', 'retweets')") Retweets
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'favorites'}"
                @click="$emit('setGraph', 'favorites')") Favorites
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'mentions'}"
                @click="$emit('setGraph', 'mentions')") Mentions
</template>

<script>
    import Chartist from 'chartist';

    export default {
        props: {
            interaction: {
                type: Object
            },
            range: {
                type: Number
            },
            graph: {
                type: String
            }
        },
        updated() {
            this.reflowGraph(this.graph);
        },
        methods: {
            reflowGraph(graph) {
                switch(graph) {
                    case 'retweets':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.retweet_labels,
                            labels: [],
                            series: [this.interaction.retweet_series]
                        }, {
                            height: '160px'
                        });
                        break;
                    case 'favorites':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.favorite_labels,
                            labels: [],
                            series: [this.interaction.favorite_series]
                        }, {
                            height: '160px'
                        });
                        break;
                    case 'mentions':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.mention_labels,
                            labels: [],
                            series: [this.interaction.mention_series]
                        }, {
                            height: '160px'
                        });
                        break;
                }
            }
        }
    }
</script>
