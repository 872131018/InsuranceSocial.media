<template>
    <div class="w3-section">
        <Plan v-for="(plan, index) in plans"
            v-bind:key="index"
            v-bind:plan="plan"
            v-bind:selected="selected == plan.name"
            v-on:setPlan="setPlan($event)">
        </Plan>
    </div>
</template>

<script>
    import Plan from './Plan';

    export default {
        props: {
            plans: {
                type: Array
            }
        },
        data() {
            return {
                selected: ''
            }
        },
        methods: {
            setPlan(plan) {
                this.selected = plan;
                store.dispatch({ type: 'SET_PLAN', data: plan });
            }
        },
        components: {
            Plan
        }
    }
</script>
