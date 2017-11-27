<template lang="pug">
    div(class="w3-section")
        span(class="w3-xlarge v-align") {{ plan.name }}
        span(class="w3-xlarge w3-right v-align") {{ plan.cost }}
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
