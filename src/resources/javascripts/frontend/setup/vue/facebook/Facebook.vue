<template>
    <div>
        <Progress
            v-bind:progress="33">
        </Progress>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Link your Social Accounts</h3>
                <h5>Please log in to Facebook<i class="fa fa-facebook-official fa-2x w3-margin-left w3-text-blue v-align"></i> in order to recieve our Facebook services.</h5>
            </div>
            <div class="w3-section">
                <div class="w3-panel">
                    <div>Do you have a corporate Facebook account?</div>
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
                    <div>Do you want InsuranceSocial.Media to setup a corporate Facebook account for you?</div>
                    <div><em>(Note: A one time 25$ fee will apply)</em></div>
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
                <h5>We look forward to working with you. Please click register to finish setting up your account.</h5>
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
                    has_facebook: false,
                    create_facebook: true
                },
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.redirectUrl = response.data
            });
            if(store.getState().UserStore.facebook_access_token) {
                this.properties.has_facebook = true;
            }
        },
        methods: {
            update() {
                if(this.properties.has_facebook) {
                    window.location = this.redirectUrl;
                } else {
                    this.$router.push({ name: 'Twitter' });
                }
            }
        },
        components: {
            Progress
        }
    }
</script>
