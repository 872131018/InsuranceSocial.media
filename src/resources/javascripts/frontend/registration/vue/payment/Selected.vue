<template lang="pug">
    div
        span(class="w3-large v-align") {{ plan.name }}
        span(class="w3-large w3-right v-align") {{ plan.cost }}
        Features(:features="plan.features")
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
