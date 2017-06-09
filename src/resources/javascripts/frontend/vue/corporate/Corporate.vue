<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Description</h3>
            <h5>As part of your company package, your plan includes:</h5>
            <Features v-bind:features="features"></Features>
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
    import Features from '../Features';

    export default {
        data() {
            return {
                logo: '',
                company: '',
                features: []
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.logo = response.data.logo;
                this.company = response.data.company;
                this.features = response.data.features;
            });
        },
        methods: {
            update() {
                this.$router.push({ name: 'RegisterWithCode', params: { code: this.$route.params.code } });
            }
        },
        components: {
            Features
        }
    }
</script>
