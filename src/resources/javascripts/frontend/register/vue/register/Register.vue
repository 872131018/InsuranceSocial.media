<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Create an Account</h3>
            <h5>Please complete required fields to complete registration.</h5>
        </div>
        <div class="w3-panel">
            <Field
                v-bind:label="'Full Name'"
                v-on:setValue="(value) => properties.name = value"
                v-on:valid="() => name_confirmed = true"
                v-on:invalid="() => name_confirmed = false">
            </Field>
            <Field
                v-bind:label="'Email'"
                v-bind:validation="'EMAIL'"
                v-on:setValue="(value) => properties.email = value">
            </Field>
            <Field
                v-bind:label="'Confirm Email'"
                v-bind:validation="'CONFIRM'"
                v-bind:confirmation="properties.email"
                v-on:setValue="(value) => properties.email_confirmation = value"
                v-on:valid="() => email_confirmed = true"
                v-on:invalid="() => email_confirmed = false">
            </Field>
            <PasswordField
                v-bind:label="'Password'"
                v-bind:validation="'PASSWORD'"
                v-on:setValue="(value) => properties.password = value">
            </PasswordField>
            <PasswordField
                v-bind:label="'Confirm Password'"
                v-bind:validation="'CONFIRM'"
                v-bind:confirmation="properties.password"
                v-on:setValue="(value) => properties.password_confirmation = value"
                v-on:valid="() => password_confirmed = true"
                v-on:invalid="() => password_confirmed = false">
            </PasswordField>
            <Field
                v-bind:label="'Discount Code'"
                v-bind:confirmation="properties.discount">
            </Field>
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
    import Field from './inputs/Field';
    import PasswordField from './inputs/PasswordField';
    import Terms from './inputs/Terms';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: '',
                    email: '',
                    email_confirmation: '', //required for laravel validation
                    password: '',
                    password_confirmation: '', //required for laravel validation
                    discount: '',
                    terms: false,
                },
                name_confirmed: false,
                email_confirmed: false,
                password_confirmed: false,
                errors: []
            }
        },
        methods: {
            update() {
                this.errors = [];
                if(this.name_confirmed == false) {
                    this.errors.push('You must enter your full name.');
                }
                if(this.emails_confirmed == false) {
                    this.errors.push('You must enter and confirm your email.');
                }
                if(this.password_confirmed == false) {
                    this.errors.push('You must enter and confirm a password.');
                }
                if(!this.properties.terms) {
                    this.errors.push('You must accept the Terms of Service.');
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
                        if(error.email) {
                            this.errors.push('That email is already used, please try another');
                        } else {
                            this.errors.push('An error has occured, please contact support.');
                        }
                    });
                }
            }
        },
        components: {
            Field,
            PasswordField,
            Terms,
            Errors
        }
    }
</script>
