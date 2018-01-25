<template lang="pug">
    div
        span(class="w3-large v-align") {{ plan.name }}
        span(class="w3-large w3-right v-align") {{ plan.cost }}
        Features(:features="plan.features")
        div(
            v-if="plan.linkedIn")
            span(class="w3-large v-align"
                v-if="plan.tier == 1") Additional $19 monthly for LinkedIn
            span(class="w3-large v-align"
                v-if="plan.tier == 2") Additional $10 monthly for LinkedIn
            span(class="w3-large v-align"
                v-if="plan.tier == 3") No additional charge for LinkedIn
</template>

<script>
    export default {
        props: {
            plan: {
                type: Object
            }
        }
    }
</script>
