<template lang="pug">
    div(class="w3-card-2 w3-padding form")
        h3 Create an Account
        h5 Please complete required fields to complete registration.
        Field(
            :label="'Full Name'"
            @setValue="(value) => properties.name = value"
            @valid="name_confirmed = true"
            @invalid="name_confirmed = false")
        Field(
            :label="'Email'"
            :validation="'EMAIL'"
            @setValue="(value) => properties.email = value")
        Field(
            :label="'Confirm Email'"
            :validation="'CONFIRM'"
            :confirmation="properties.email"
            @setValue="(value) => properties.email_confirmation = value"
            @valid="email_confirmed = true"
            @invalid="email_confirmed = false")
        PasswordField(
            :label="'Password'"
            :validation="'PASSWORD'"
            @setValue="(value) => properties.password = value")
        PasswordField(
            :label="'Confirm Password'"
            :validation="'CONFIRM'"
            :confirmation="properties.password"
            @setValue="(value) => properties.password_confirmation = value"
            @valid="password_confirmed = true"
            @invalid="password_confirmed = false")
        Field(
            :label="'Discount Code'"
            :default="properties.discount"
            @setValue="(value) => properties.discount = value")
        Terms(@setTerms="(terms) => properties.terms = terms")
        Errors(
            v-if="errors.length"
            :errors="errors")
        div(class="w3-padding-16")
            button(class="w3-button w3-text-white primary"
                @click="register()")
                div(style="height: 22px; width: 127px") Register
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
                    discount: this.$route.params.discount,
                    terms: false,
                },
                name_confirmed: false,
                email_confirmed: false,
                password_confirmed: false,
                errors: []
            }
        },
        methods: {
            register() {
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
                        if(response.data.discount && response.data.discount != 'ISMFreeTrial') {
                            window.location = '/corporate';
                        } else {
                            window.location = '/plans';
                        }
                    }).catch(error => {
                        if(error.email) {
                            this.errors.push('That email has already been used, please use another');
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
