<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Create an Account</h3>
            <h5>Please complete required fields to complete registration.</h5>
        </div>
        <div class="w3-panel">
            <Name
                v-on:setName="(name) => { properties.name = name }">
            </Name>
            <Email
                v-bind:label="'Email'"
                v-bind:confirmed="true"
                v-on:setEmail="(email) => { properties.email = email }">
            </Email>
            <Email
                v-bind:label="'Confirm Email'"
                v-bind:confirmed="properties.email_confirmed"
                v-on:setEmail="confirmEmail($event)">
            </Email>
            <Password
                v-bind:label="'Password'"
                v-bind:confirmed="true"
                v-on:setPassword="(password) => { properties.password = password }">
            </Password>
            <Password
                v-bind:label="'Confirm Password'"
                v-bind:confirmed="properties.password_confirmed"
                v-on:setPassword="confirmPassword($event)">
            </Password>
            <Discount
                v-on:setDiscount="(discount) => { properties.discount = discount }">
            </Discount>
        </div>
        <div class="w3-panel">
            <Terms v-on:setTerms="(terms) => { properties.terms = terms }"></Terms>
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
    import Email from './inputs/Email';
    import Password from './inputs/Password';
    import Discount from './inputs/Discount';
    import Terms from './inputs/Terms';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: '',
                    email: '',
                    email_confirmation: '',
                    email_confirmed: false,
                    password: '',
                    password_confirmation: '',
                    password_confirmed: false,
                    discount: '',
                    terms: false,
                },
                errors: []
            }
        },
        methods: {
            confirmEmail(email) {
                this.properties.email_confirmation = email;
                this.properties.email_confirmed = (this.properties.email == this.properties.email_confirmation);
            },
            confirmPassword(password) {
                this.properties.password_confirmation = password;
                this.properties.password_confirmed = (this.properties.password == this.properties.password_confirmation);
            },
            update() {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.properties.email == '' || this.properties.email_confirmation == '') {
                    this.errors.push('You must enter and confirm an email.');
                }
                if(this.properties.email != this.properties.email_confirmation) {
                    this.errors.push('Emails do not match.');

                }
                if(this.properties.password == '' || this.properties.password_confirmation == '') {
                    this.errors.push('You must enter and confirm a password');
                }
                if(this.properties.password != this.properties.password_confirmation) {
                    this.errors.push('Passwords do not match.');
                }
                if(!this.properties.terms) {
                    this.errors.push('You must accept the Terms of Service.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_USER', data: response.data });
                        if(response.data.discount) {
                            this.$router.push({ name: 'Corporate', params: { discount: response.data.discount } });
                        } else {
                            this.$router.push({ name: 'Select' });
                        }
                    });
                }
            }
        },
        components: {
            Name,
            Email,
            Password,
            Discount,
            Terms,
            Errors
        }
    }
</script>
