<template lang="pug">
    div(class="w3-card-2 w3-padding form")
        <div style="position:relative;height:0;padding-bottom:56.25%"><iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a09addb61c1ee6c128/b95fa49412ad6163?bigPlayButton=false' style='position:absolute;width:100%;height:100%;left:0;top:0' frameborder='0' allowfullscreen></iframe></div>
        h3 Plan Selection
        h6 Choose your plan.
        Plan(
            v-for="(plan, index) in plans"
            :key="index"
            :plan="plan"
            :selected="selected == plan.name"
            @setPlan="(value) => $store.commit('setPlan', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        div(class="w3-padding")
            button(class="w3-button w3-text-white primary"
                @click="next()") Continue
</template>

<script>
    import Plan from './Plan';
    import Errors from './Errors';

    export default {
        data() {
            return {
                errors: []
            }
        },
        computed: {
            plans() {
                return this.$store.state.plans.plans;
            },
            selected() {
                return this.$store.state.registration.plan.name;
            }
        },
        methods: {
            next() {
                this.errors = [];
                if(!this.selected) {
                    this.errors.push('You must select a plan.');
                } else {
                    this.$router.push({ name: 'Payment' })
                }
            }
        },
        components: {
            Plan,
            Errors
        }
    }
</script>
