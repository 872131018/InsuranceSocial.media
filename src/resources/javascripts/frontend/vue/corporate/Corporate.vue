<template>
    <div class="w3-container w3-light-grey w3-padding-32">
        <div class="w3-container w3-card-2 corporate">
            <div class="w3-container w3-padding-32 w3-row">
                <img class="w3-col l6 m12 s12" v-bind:src="logo">
                <h3 class="w3-col l6 m12 s12 w3-padding-32 w3-center">Insurance Social Media is proud to work with you and your team at {{ company }}</h3>
            </div>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logo: window.data.logo,
                company: window.data.company,
                features: window.data.features
            }
        },
        methods: {
            //
        },
        components: {
            //
        }
    }
</script>
