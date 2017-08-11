<template>
    <div>
        <ProgressBar
            v-bind:progress="33">
        </ProgressBar>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Link your Facebook</h3>
            </div>
            <div class="w3-section">
                <div class="w3-panel">
                    <div>Do you have a corporate Facebook Page? If so, please log in to Facebook in order to recieve our Facebook services.</div>
                    <div class="w3-panel">
                        <input class="v-align" type="radio" id="facebook_yes"
                            v-bind:value="true"
                            v-bind:checked="properties.has_facebook"
                            v-model="properties.has_facebook">
                        <label for="facebook_yes">
                            <span class="w3-show-inline-block w3-margin v-align"></span>Yes
                        </label>
                        <input class="v-align" type="radio" id="facebook_no"
                            v-bind:value="false"
                            v-bind:checked="properties.has_facebook"
                            v-model="properties.has_facebook">
                        <label for="facebook_no">
                            <span class="w3-show-inline-block w3-margin v-align"></span>No
                        </label>
                    </div>
                </div>
                <div class="w3-panel"
                    v-if="properties.has_facebook == false">
                    <div>Do you want InsuranceSocial.Media to setup a corporate Facebook Page for you?</div>
                    <div><em>(Note: A one-time $25 fee will apply)</em></div>
                    <div class="w3-panel">
                        <input class="v-align" type="radio" id="create_yes"
                            v-bind:value="true"
                            v-model="properties.create_facebook">
                        <label for="create_yes">
                            <span class="w3-show-inline-block w3-margin v-align"></span>Yes
                        </label>
                        <input class="v-align" type="radio" id="create_no"
                            v-bind:value="false"
                            v-model="properties.create_facebook">
                        <label for="create_no">
                            <span class="w3-show-inline-block w3-margin v-align"></span>No
                        </label>
                    </div>
                </div>
            </div>
            <div class="w3-section">
                <h5 class="w3-text-orange"
                    v-if="properties.has_facebook == false && properties.create_facebook == false">One in five page views in the United States is on Facebook! Are you sure you don’t want to make Facebook part of your social media marketing?
                </h5>
                <h5 v-else>We look forward to working with you. Please click continue to finish setting up your account.</h5>
                <button class="w3-button w3-text-white primary"
                    v-if="properties.has_facebook == false && properties.create_facebook == false"
                    v-on:click="update()">Yes, I'm sure
                </button>
                <button class="w3-button w3-text-white primary"
                    v-else
                    v-on:click="update()">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';

    export default {
        data() {
            return {
                properties: {
                    has_facebook: false,
                    create_facebook: true
                },
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/facebook`).then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            update() {
                if(this.properties.has_facebook) {
                    window.location = this.redirectUrl;
                } else {
                    if(this.properties.create_facebook) {
                        this.$router.push({ name: 'Create' });
                    } else {
                        this.$router.push({ name: 'Twitter' });
                    }
                }
            }
        },
        components: {
            ProgressBar
        }
    }
</script>
