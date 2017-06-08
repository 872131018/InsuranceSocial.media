<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-container w3-margin">
            <h3>Plan Selection</h3>
            <h5>You may add additional features to your account.</h5>
        </div>
        <div class="w3-container w3-margin">
            <Plans v-bind:plans="plans"
                v-on:setPlan="setPlan($event)">
            </Plans>
        </div>
        <div class="w3-container w3-margin">
            <h5 class="w3-large">Next you will select your social media preferences.</h5>
            <router-link class="w3-button w3-text-white primary"
                v-bind:to="{ name: 'SocialMedia' }">Next
            </router-link>
        </div>
    </div>
</template>

<script>
    import Plans from './Plans';

    export default {
        data() {
            return {
                plans: {}
            }
        },
        mounted() {
            //axios.get(window.base_url + '/add-features/' + this.$route.params.code).then(response => {
            axios.get(window.base_url + '/add-features').then(response => {
                this.plans = response.data;
            });
        },
        methods: {
            setPlan(plan) {
                store.dispatch({ type: 'SET_PLAN', data: this.plan });
            }
        },
        components: {
            Plans
        }
    }
</script>
