<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Who are we?</h3>
            <h5>Please complete this information so we may provide you the best service.</h5>
        </div>
        <div class="w3-panel">
            <Name
                v-on:setName="(name) => { properties.name = name }">
            </Name>
            <Email
                v-on:setEmail="(email) => { properties.email = email }">
            </Email>
            <Phone
                v-on:setPhone="(phone) => { properties.phone = phone }">
            </Phone>
        </div>
        <div class="w3-panel"
            v-if="errors.length">
            <Errors v-bind:errors="errors"></Errors>
        </div>
        <div class="w3-panel">
            <h5>Continue to select the plan you wish to sign up for.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Continue
            </button>
        </div>
        </div>
    </div>
</template>

<script>
    import Name from './inputs/Name';
    import Phone from './inputs/Phone';
    import Email from './inputs/Email';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: '',
                    email: '',
                    phone: '',
                },
                errors: []
            }
        },
        methods: {
            update() {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.properties.email == '') {
                    this.errors.push('You must enter your full email.');
                }
                if(this.properties.phone == '') {
                    this.errors.push('You must enter your full phone.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_USER', data: response.data });
                        if(response.data.discount) {
                            this.$router.push({ name: 'Corporate' });
                        } else {
                            this.$router.push({ name: 'Select' });
                        }
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            Name,
            Email,
            Errors
        }
    }
</script>
