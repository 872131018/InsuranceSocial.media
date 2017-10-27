<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel w3-row">
            <img class="w3-col l5 m5 s11 w3-margin"
                v-bind:src="logo">
            <h3 class="w3-col l5 m5 s11 w3-margin">Insurance Social Media is proud to work with you and your team at {{ company }}</h3>
        </div>
        <div class="w3-panel">
            <h3>Plan Description</h3>
            <h5>As part of your company package, your plan includes:</h5>
        </div>
        <div class="w3-panel">
            <Plan
                v-bind:plan="plans[0]"
                v-bind:selected="selected.name == plans[0].name"
                v-on:setPlan="(choice) => { selected = choice }">
            </Plan>
        </div>
        <div class="w3-panel">
            <h3>Upgrade Now</h3>
            <h5>You can also upgrade your plan to recieve added benefits at a reduced price:</h5>
        </div>
        <div class="w3-panel">
            <Plan
                v-bind:plan="plans[1]"
                v-bind:selected="selected.name == plans[1].name"
                v-on:setPlan="(choice) => { selected = choice }">
            </Plan>
        </div>
        <div class="w3-panel">
            <h5>We look forward to working with you. Please click continue to finish setting up your account.</h5>
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
                plans: [
                    {
                        name: ''
                    },
                    {
                        name: ''
                    }
                ],
                selected: {}
            }
        },
        mounted() {
            //axios.get(`${ window.location }/${store.getState().UserStore.discount}`).then(response => {
            axios.get(`${ window.location }/asdf1234`).then(response => {
                console.log(response.data)
                this.logo = response.data.logo;
                this.company = response.data.company;
                this.plans = response.data.plans;
                this.selected = this.plans[0];
                store.dispatch({ type: 'SET_PLAN', data: response.data.plans[0] });
            });
        },
        methods: {
            update() {
                store.dispatch({ type: 'SET_PLAN', data: this.selected });
                this.$router.push({ name: 'SocialMedia' });
            }
        },
        components: {
            Plan
        }
    }
</script>
