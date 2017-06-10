<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Plan Selection</h3>
            <h5>You may add additional features to your account.</h5>
        </div>
        <div class="w3-panel">
            <Plans v-bind:plans="plans"></Plans>
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
    import Plans from './Plans';

    export default {
        data() {
            return {
                plans: []
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.plans = response.data;
            });
        },
        methods: {
            update() {
                this.$router.push({ name: 'SocialMedia' });
            }
        },
        components: {
            Plans
        }
    }
</script>
