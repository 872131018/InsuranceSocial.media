<template>
    <div>
        <ProgressBar
            v-bind:progress="56">
        </ProgressBar>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Link your Twitter Account</h3>
            </div>
            <div class="w3-section">
                <div class="w3-panel">
                    <div>Do you have a Twitter account? If so, please log in to Twitter in order to recieve our Twitter services.</div>
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
            <div class="w3-section"
                v-if="properties.has_twitter == false">
                <p>Don’t have a Twitter account? Setting one up will take you about 30 seconds—and we can start posting to it right away.</p>
                <a href="https://twitter.com/signup" target="_blank">
                    <h5>Click here to create your account.</h5>
                </a>
            </div>
            <div class="w3-section">
                <h5 v-if="properties.has_twitter == true">Almost done.</h5>
                <button class="w3-button w3-text-white primary"
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
                    has_twitter: false
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
            ProgressBar
        }
    }
</script>
