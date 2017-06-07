<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-container w3-padding-32">
            <h3>Plan Description</h3>
            <p>As part of your company package, your plan includes:</p>
            <ul class="w3-ul w3-border">
                <li class="w3-padding-16"
                    v-for="feature in features">
                    <i class="fa fa-check w3-margin-right w3-text-green"></i>{{ feature }}
                </li>
            </ul>
        </div>
        <div class="w3-container w3-padding-32">
            <p class="w3-large">We look forward to working with you. Please click register to finish registration.</p>
            <router-link class="w3-button w3-text-white secondary"
               v-bind:to="{ name: 'RegisterWithCode', params: { code: $route.params.code } }">Register
           </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logo: '',
                company: '',
                features: []
            }
        },
        mounted() {
            axios.get(window.base_url + '/corporate/' + this.$route.params.code).then(response => {
                this.logo = response.data.logo;
                this.company = response.data.company;
                this.features = response.data.features;
            });
        },
        methods: {
            //
        },
        components: {
            //
        }
    }
</script>
