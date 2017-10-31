<template lang="pug">
    div(class="w3-card-2 w3-padding form")
        h3 Plan Selection
        h6 Choose your plan.
        Plan(
            v-for="(plan, index) in plans"
            :key="index"
            :plan="plan"
            :selected="selected == plan.name"
            @setPlan="(value) => $store.commit('setPlan', value)")
        div(class="w3-padding")
            button(class="w3-button w3-text-white primary"
                @click="$router.push({ name: 'Payment' })") Continue
</template>

<script>
    import Plan from './Plan';

    export default {
        computed: {
            plans() {
                return this.$store.state.plans.plans;
            },
            selected() {
                return this.$store.state.registration.plan.name;
            }
        },
        components: {
            Plan
        }
    }
</script>
