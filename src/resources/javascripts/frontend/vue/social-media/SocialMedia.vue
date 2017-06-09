<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-section">
            <h3>Social Media Accounts</h3>
            <h5>Select the forms of social media you would like to use.</h5>
        </div>
        <div class="w3-section">
            <input class="v-align" type="checkbox" id="facebook"
                v-model="properties.facebook">
            <label class="v-align check-box" for="facebook"></label>
            <span class="w3-large w3-margin-left">
                <i class="fa fa-facebook-official fa-2x w3-margin w3-text-blue v-align"></i>Facebook
            </span>
        </div>
        <div class="w3-section">
            <input class="v-align" type="checkbox" id="twitter"
                v-model="properties.twitter">
            <label class="v-align check-box" for="twitter"></label>
            <span class="w3-large w3-margin-left">
                <i class="fa fa-twitter-square fa-2x w3-margin w3-text-blue v-align"></i>Twitter
            </span>
        </div>
        <div class="w3-section">
            <h5>We look forward to working with you. Please click register to finish setting up your account.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Continue
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                properties: {
                    facebook: true,
                    twitter: true
                }
            }
        },
        mounted() {
            if(this.$route.params.code) {
                //
            }
        },
        methods: {
            update() {
                store.dispatch({ type: 'SET_SOCIAL_MEDIA', data: this.properties });
                this.$router.push({ name: 'Payment' });
            }
        },
        components: {
            //
        }
    }
</script>
