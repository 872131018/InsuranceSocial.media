<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Social Media Accounts</h3>
            <h5>Select the forms of social media you would like to use.</h5>
        </div>
        <div class="w3-panel">
            <Facebook
                v-on:setFacebook="(facebook) => { properties.facebook = facebook }">
            </Facebook>
        </div>
        <div class="w3-panel">
            <Twitter
                v-on:setTwitter="(twitter) => { properties.twitter = twitter }">
            </Twitter>
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
    import Facebook from './Facebook';
    import Twitter from './Twitter';

    export default {
        data() {
            return {
                properties: {
                    facebook: true,
                    twitter: true
                }
            }
        },
        methods: {
            update() {
                store.dispatch({ type: 'SET_SOCIAL_MEDIA', data: this.properties });
                this.$router.push({ name: 'Payment' });
            }
        },
        components: {
            Facebook,
            Twitter
        }
    }
</script>
