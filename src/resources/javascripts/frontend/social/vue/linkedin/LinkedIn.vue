<template>
    <div>
        <ProgressBar
            v-bind:progress="56">
        </ProgressBar>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Link your LinkedIn Account</h3>
            </div>
            <div class="w3-section">
                <div class="w3-panel">
                    <div>Do you have a LinkedIn account? If so, please log in to LinkedIn in order to recieve our LinkedIn services.</div>
                    <div class="w3-panel">
                        <input class="v-align" type="radio" id="linkedin_yes"
                            v-bind:value="true"
                            v-bind:checked="properties.has_linkedin"
                            v-model="properties.has_linkedin">
                        <label for="linkedin_yes">
                            <span class="w3-show-inline-block w3-margin v-align"></span>Yes
                        </label>
                        <input class="v-align" type="radio" id="linkedin_no"
                            v-bind:value="false"
                            v-bind:checked="properties.has_linkedin"
                            v-model="properties.has_linkedin">
                        <label for="linkedin_no">
                            <span class="w3-show-inline-block w3-margin v-align"></span>No
                        </label>
                    </div>
                </div>
            </div>
            <div class="w3-section"
                v-if="properties.has_linkin == false">
                <p>Don’t have a LinkedIn account? Setting one up will take you about 30 seconds—and we can start posting to it right away.</p>
                <a href="https://www.linkedin.com/m/login" target="_blank">
                    <h5>Click here to create your account.</h5>
                </a>
            </div>
            <div class="w3-section">
                <h5 v-if="properties.has_linkedin == true">Almost done.</h5>
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
                    has_linkedin: false
                },
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/linkedin`).then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            update() {
                if(this.properties.has_linkedin) {
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
