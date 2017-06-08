<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-container w3-margin">
            <h3>Social Media Accounts</h3>
            <h5>Select the forms of social media you would like to use.</h5>
        </div>
        <div class="w3-container w3-margin">
            <input class="v-align" type="checkbox" id="facebook"
                v-model="facebook"
                v-on:change="$emit('setFacebook', facebook)">
            <label class="v-align check-box" for="facebook"></label>
            <span class="w3-large w3-margin-left">Facebook</span>
        </div>
        <div class="w3-container w3-margin">
            <input class="v-align" type="checkbox" id="twitter"
                v-model="twitter"
                v-on:change="$emit('setTwitter', twitter)">
            <label class="v-align check-box" for="twitter"></label>
            <span class="w3-large w3-margin-left">Twitter</span>
        </div>
        <div class="w3-container w3-margin">
            <h5 class="w3-large">We look forward to working with you. Please click register to finish setting up your account.</h5>
            <router-link class="w3-button w3-text-white primary"
               v-bind:to="{ name: 'Payment' }">Register
           </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            if(this.$route.params.code) {
                //
            }
        },
        data() {
            return {
                facebook: true,
                twitter: true
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
