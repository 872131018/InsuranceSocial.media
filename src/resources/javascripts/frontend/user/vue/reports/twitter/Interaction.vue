<template>
    <div>
        <div class="w3-padding w3-text-white primary">
            <b>Interaction Trends</b>
            <span class="w3-padding">{{ interaction.last_interaction }}</span>
            <i class="fa fa-refresh w3-right" style="font-size:24px"
                v-on:click="$emit('updateInteraction', range)">
            </i>
        </div>
        <div class="w3-blue">
            <i class="fa fa-twitter w3-padding"></i>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 20 ? 'underline' :  'none' }"
                v-on:click="range = 20">Last 20 Days
            </span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 50 ? 'underline' :  'none' }"
                v-on:click="range = 50">Last 50 Days
            </span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 100 ? 'underline' :  'none' }"
                v-on:click="range = 100">Last 100 Days
            </span>
        </div>
        <div class="line-chart"></div>
        <div class="w3-center">
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'retweets'}"
                v-on:click="reflowGraph('retweets')">Retweets
            </span>
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'favorites'}"
                v-on:click="reflowGraph('favorites')">Favorites
            </span>
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'mentions'}"
                v-on:click="reflowGraph('mentions')">Mentions
            </span>
        </div>
    </div>
</template>

<script>
    import Chartist from 'chartist';

    export default {
        props: {
            interaction: {
                type: Object
            }
        },
        data() {
            return {
                range: 50,
                graph: 'retweets'
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
                        this.graph = 'retweets';
                        break;
                    case 'favorites':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.favorite_labels,
                            labels: [],
                            series: [this.interaction.favorite_series]
                        }, {
                            height: '160px'
                        });
                        this.graph = 'favorites';
                        break;
                    case 'mentions':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.mention_labels,
                            labels: [],
                            series: [this.interaction.mention_series]
                        }, {
                            height: '160px'
                        });
                        this.graph = 'mentions';
                        break;
                }
            }
        }
    }
</script>
