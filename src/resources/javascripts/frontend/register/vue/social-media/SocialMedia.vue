<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Social Media Accounts</h3>
            <h5>Select the forms of social media you would like to use.</h5>
        </div>
        <div class="w3-panel">
            <div class="w3-section">
                <input class="v-align" type="checkbox" id="facebook"
                    v-model="properties.facebook">
                <label for="facebook">
                    <span class="w3-show-inline-block w3-margin-right v-align"></span>
                    Facebook<i class="fa fa-facebook-official fa-2x w3-margin-left w3-text-blue v-align"></i>
                </label>
            </div>
        </div>
        <div class="w3-panel">
            <div class="w3-section">
                <input class="v-align" type="checkbox" id="twitter"
                    v-model="properties.twitter">
                <label for="twitter">
                    <span class="w3-show-inline-block w3-margin-right v-align"></span>
                    Twitter<i class="fa fa-twitter fa-2x w3-margin-left w3-text-blue v-align"></i>
                </label>
            </div>
        </div>
        <div class="w3-panel">
            <h5>We look forward to working with you. Please click continue to finish setting up your account.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="previous()">Previous
            </button>
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
                    facebook: false,
                    twitter: false
                }
            }
        },
        mounted() {
            if(store.getState().UserStore.facebook) {
                this.properties.facebook = store.getState().UserStore.facebook;
            }
            if(store.getState().UserStore.twitter) {
                this.properties.twitter = store.getState().UserStore.twitter;
            }
        },
        methods: {
            previous() {
                store.dispatch({ type: 'SET_SOCIAL_MEDIA', data: this.properties });
                this.$router.push({ name: 'Select' })
            },
            update() {
                store.dispatch({ type: 'SET_SOCIAL_MEDIA', data: this.properties });
                this.$router.push({ name: 'Payment' });
            }
        }
    }
</script>
