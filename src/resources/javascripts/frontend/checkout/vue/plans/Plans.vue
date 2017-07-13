<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Selection</h3>
            <h5>You may add additional features to your account.</h5>
        </div>
        <div class="w3-panel">
            <Plan
                v-for="(plan, index) in plans"
                v-bind:key="index"
                v-bind:plan="plan"
                v-bind:selected="selected.name == plan.name"
                v-on:setPlan="(choice) => { selected = choice }">
            </Plan>
        </div>
        <div class="w3-panel">
            <h5>Next you will select your social media preferences.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Continue
            </button>
        </div>
    </div>
</template>

<script>
    import Plan from './Plan';

    export default {
        data() {
            return {
                plans: [],
                selected: {}
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/plans`).then(response => {
                this.plans = response.data;
                if(store.getState().UserStore.plan) {
                    this.selected = store.getState().UserStore.plan;
                }
            });
        },
        methods: {
            update() {
                store.dispatch({ type: 'SET_PLAN', data: this.selected });
                this.$router.push({ name: 'Payment' })
            }
        },
        components: {
            Plan
        }
    }
</script>
