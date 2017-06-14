<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <img class="w3-half" v-bind:src="logo">
            <h3 class="w3-half">Insurance Social Media is proud to work with you and your team at {{ company }}</h3>
        </div>
        <div class="w3-panel">
            <h3>Plan Description</h3>
            <h5>As part of your company package, your plan includes:</h5>
        </div>
        <div class="w3-panel">
            <Plan v-bind:plan="plan"></Plan>
        </div>
        <div class="w3-panel">
            <h5>We look forward to working with you. Please click register to finish setting up your account.</h5>
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
                logo: '',
                company: '',
                plan: {
                    name: '',
                    features: []
                }
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.logo = response.data.logo;
                this.company = response.data.company;
                this.plan = response.data.plan;
                store.dispatch({ type: 'SET_PLAN', data: response.data.plan });
            });
        },
        methods: {
            update() {
                if(store.getState().UserStore.id != '') {
                    this.$router.push({ name: 'Select' });
                } else {
                    this.$router.push({ name: 'RegisterWithDiscount', params: { discount: this.$route.params.discount } });
                }
            }
        },
        components: {
            Plan
        }
    }
</script>
