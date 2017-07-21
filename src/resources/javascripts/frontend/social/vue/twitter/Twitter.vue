<template>
    <div>
        <Progress
            v-bind:progress="33">
        </Progress>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Link your Twitter Account</h3>
                <h5>Please log in to Twitter<i class="fa fa-twitter fa-2x w3-margin-left w3-margin-right w3-text-blue v-align"></i>in order to recieve our Twitter services.</h5>
            </div>
            <div class="w3-section">
                <div class="w3-panel">
                    <div>Do you have a Twitter account?</div>
                    <div class="w3-panel">
                        <input class="v-align" type="radio" id="twitter_yes"
                            v-bind:value="true"
                            v-bind:checked="properties.has_twitter"
                            v-model="properties.has_twitter">
                        <label for="twitter_yes">
                            <span class="w3-show-inline-block w3-margin v-align"></span>Yes
                        </label>
                        <input class="v-align" type="radio" id="twitter_no"
                            v-bind:value="false"
                            v-bind:checked="properties.has_twitter"
                            v-model="properties.has_twitter">
                        <label for="twitter_no">
                            <span class="w3-show-inline-block w3-margin v-align"></span>No
                        </label>
                    </div>
                </div>
            </div>
            <div class="w3-section">
                <h5>We look forward to working with you. Please click continue to finish setting up your account.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update()">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from '../Progress';

    export default {
        data() {
            return {
                properties: {
                    has_twitter: false,
                    create_twitter: false
                },
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/twitter`).then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            update() {
                if(this.properties.has_twitter) {
                    window.location = this.redirectUrl;
                } else {
                    window.location = `${ window.base_url }/profile`;
                }
            }
        },
        components: {
            Progress
        }
    }
</script>
