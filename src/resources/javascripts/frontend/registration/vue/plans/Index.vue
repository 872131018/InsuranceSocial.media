<template lang="pug">
    div(class="w3-card w3-padding form")
        <div style="position:relative;height:0;padding-bottom:56.25%"><iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a09addb61c1ee6c128/b95fa49412ad6163?bigPlayButton=false' style='position:absolute;width:100%;height:100%;left:0;top:0' frameborder='0' allowfullscreen></iframe></div>
        h3 Plan Selection
        h6 Choose your plan.
        Plan(
            v-for="(plan, index) in $store.state.plans.plans"
            :key="index"
            :plan="plan"
            :selected="selected == plan.name"
            @setPlan="(value) => $store.commit('setPlan', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        button(class="w3-button w3-text-white primary"
            @click="next()") Continue
</template>

<script>
    import Plan from './Plan';

    export default {
        computed: {
            selected() {
                return this.$store.state.registration.plan.name;
            },
            code() {
                return this.$store.state.registration.code;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            next() {
                this.validate();
                if(this.errors.length == 0) {
                    if(this.code == 'ISMFREETRIAL') {
                        this.$router.push({ name: 'Payment' });
                    } else {
                        this.$router.push({ name: 'LinkedIn' });
                    }
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.selected) {
                    this.$store.commit('setError', 'You must select a plan.');
                }
            }
        },
        components: {
            Plan
        }
    }
</script>
