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
            <i class="fa fa-facebook-official w3-padding"></i>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 30 ? 'underline' :  'none' }"
                v-on:click="range = 30">Last 30 Days
            </span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 60 ? 'underline' :  'none' }"
                v-on:click="range = 60">Last 60 Days
            </span>
            <span class="w3-padding"
                v-bind:style="{ textDecoration: range == 90 ? 'underline' :  'none' }"
                v-on:click="range = 90">Last 90 Days
            </span>
        </div>
        <div class="line-chart"></div>
        <div class="w3-center">
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'reach'}"
                v-on:click="reflowGraph('reach')">Reach
            </span>
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'engagement'}"
                v-on:click="reflowGraph('engagement')">Engagement
            </span>
            <span class="w3-padding w3-bottombar"
                v-bind:class="{ 'w3-border-blue': graph == 'ratio'}"
                v-on:click="reflowGraph('ratio')">Engagement Ratio
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
                range: 60,
                graph: 'reach'
            }
        },
        updated() {
            this.reflowGraph(this.graph);
        },
        methods: {
            reflowGraph(graph) {
                switch(graph) {
                    case 'reach':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.reach_labels,
                            labels: [],
                            series: [this.interaction.reach_series]
                        }, {
                            height: '160px'
                        });
                        this.graph = 'reach';
                        break;
                    case 'engagement':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.engagement_labels,
                            labels: [],
                            series: [this.interaction.engagement_series]
                        }, {
                            height: '160px'
                        });
                        this.graph = 'engagement';
                        break;
                    case 'ratio':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.ratio_labels,
                            labels: [],
                            series: [this.interaction.ratio_series]
                        }, {
                            height: '160px'
                        });
                        this.graph = 'ratio';
                        break;
                }
            }
        }
    }
</script>
