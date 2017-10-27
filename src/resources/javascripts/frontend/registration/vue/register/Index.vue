<template lang="pug">
    div(class="w3-card-2 w3-padding form")
        h3 Create an Account
        h5 Please complete required fields to complete registration.
        Field(
            :label="'Full Name'"
            :value="name"
            :valid="nameValid"
            @setValue="(value) => $store.commit('setName', value)")
        Field(
            :label="'Email'"
            :value="email"
            :valid="emailValid"
            @setValue="(value) => $store.commit('setEmail', value)")
        Field(
            :label="'Confirm Email'"
            :value="emailConfirmation"
            :valid="emailConfirmed"
            @setValue="(value) => $store.commit('setEmailConfirmation', value)")
        PasswordField(
            :label="'Password'"
            :value="password"
            :valid="passwordValid"
            @setValue="(value) => $store.commit('setPassword', value)")
        PasswordField(
            :label="'Confirm Password'"
            :value="passwordConfirmation"
            :valid="passwordConfirmed"
            @setValue="(value) => $store.commit('setPasswordConfirmation', value)")
        Field(
            :label="'Discount Code'"
            :value="code"
            :valid="codeValid"
            @setValue="(value) => $store.commit('setCode', value)")
        Terms(@setTerms="(value) => $store.commit('setTerms', value)")
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
                properties: {},
                email_confirmed: false,
                password_confirmed: false,
                errors: []
            }
        },
        computed: {
            name() {
                return this.$store.state.registration.name;
            },
            nameValid() {
                return this.$store.state.registration.name != '';
            },
            email() {
                return this.$store.state.registration.email;
            },
            emailValid() {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.$store.state.registration.email);
            },
            emailConfirmation() {
                return this.$store.state.registration.email_confirmation;
            },
            emailConfirmed() {
                return this.$store.state.registration.email == this.$store.state.registration.email_confirmation &&
                    this.$store.state.registration.email != '';
            },
            password() {
                return this.$store.state.registration.password;
            },
            passwordValid() {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.$store.state.registration.password);
            },
            passwordConfirmation() {
                return this.$store.state.registration.password_confirmation
            },
            passwordConfirmed() {
                return this.$store.state.registration.password == this.$store.state.registration.password_confirmation &&
                    this.$store.state.registration.password != '';
            },
            code() {
                //this.$route.params.discount,
                return this.$store.state.registration.code;
            },
            codeValid() {
                return this.$store.state.registration.code != '';
            },
        },
        methods: {
            register() {
                this.validate();
                if(this.errors.length == 0) {
                    axios.post(window.location, this.$store.state.registration).then(response => {
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
            },
            validate() {
                this.errors = [];
                if(!this.nameValid) {
                    this.errors.push('You must enter your full name.');
                }
                if(!this.emailValid && !this.emailConfirmed) {
                    this.errors.push('You must enter and confirm your email.');
                }
                if(!this.passwordValid && !this.passwordConfirmed) {
                    this.errors.push('You must enter and confirm a password.');
                }
                if(!this.$store.state.registration.terms) {
                    this.errors.push('You must accept the Terms of Service.');
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
