<template lang="pug">
    div(v-if="plan.name != 'Enterprise Plan'")
        input(class="v-align" type="radio"
            :id="plan.id"
            :checked="selected"
            @change="$emit('setPlan', plan)")
        label(
            :for="plan.id")
            span(class="w3-show-inline-block v-align")
        span(class="w3-xlarge v-align") {{ plan.name }}
        span(class="w3-xlarge w3-right v-align") {{ plan.cost }}
        Features(:features="plan.features")
    div(v-else)
        span(class="w3-xlarge w3-text-blue") Contact Us for Enterprise Pricing
        Features(:features="plan.features")
</template>

<script>
    export default {
        props: {
            plan: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        }
    }
</script>
