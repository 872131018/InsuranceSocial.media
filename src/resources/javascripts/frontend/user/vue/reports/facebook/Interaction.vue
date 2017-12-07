<template lang="pug">
    div
        div(class="w3-padding w3-text-white primary")
            b Interaction Trends
            span(class="w3-padding") {{ interaction.created_at.slice(0, 10) }}
            i(class="fa fa-refresh w3-right" style="font-size:24px"
                @click="$emit('updateInteraction', range)")
        div(class="w3-blue")
            i(class="fa fa-facebook-official w3-padding")
            span(class="w3-padding"
                :style="{ textDecoration: range == 30 ? 'underline' :  'none' }"
                @click="$emit('setRange', 30)") Last 30 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 60 ? 'underline' :  'none' }"
                @click="$emit('setRange', 60)") Last 60 Days
            span(class="w3-padding"
                :style="{ textDecoration: range == 90 ? 'underline' :  'none' }"
                @click="$emit('setRange', 90)") Last 90 Days
        div(class="line-chart")
        div(class="w3-center")
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'reach'}"
                @click="$emit('setGraph', 'reach')") Reach
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'engagement'}"
                @click="$emit('setGraph', 'engagement')") Engagement
            span(class="w3-padding w3-bottombar"
                :class="{ 'w3-border-blue': graph == 'ratio'}"
                @click="$emit('setGraph', 'ratio')") Engagement Ratio
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
                    case 'reach':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.reach_labels,
                            labels: [],
                            series: [this.interaction.reach_series]
                        }, {
                            height: '160px'
                        });
                        break;
                    case 'engagement':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.engagement_labels,
                            labels: [],
                            series: [this.interaction.engagement_series]
                        }, {
                            height: '160px'
                        });
                        break;
                    case 'ratio':
                        new Chartist.Line('.line-chart', {
                            //labels: this.interaction.ratio_labels,
                            labels: [],
                            series: [this.interaction.ratio_series]
                        }, {
                            height: '160px'
                        });
                        break;
                }
            }
        }
    }
</script>
