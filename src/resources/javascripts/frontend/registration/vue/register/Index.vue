<template lang="pug">
    div(class="w3-card w3-padding form")
        <div style="position:relative;height:0;padding-bottom:56.25%"><iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/e89addb61c1ee7ca60/50f11a607713876a?bigPlayButton=false' style='position:absolute;width:100%;height:100%;left:0;top:0' frameborder='0' allowfullscreen></iframe></div>
        h3 Create an Account
        h5 Please complete required fields to complete registration.
        Field(
            :label="'Full Name'"
            :value="name"
            :valid="nameValid"
            @setValue="(value) => $store.commit('setName', value)")
        Field(
            :label="'Email (This will be your username)'"
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
        Terms(
            @setTerms="(value) => $store.commit('setTerms', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        button(class="w3-button w3-text-white primary"
            @click="register()")
            div(style="height: 22px; width: 127px") Register
</template>

<script>
    import Terms from './Terms';

    export default {
        computed: {
            name() {
                return this.$store.state.registration.name;
            },
            nameValid() {
                return this.name != '';
            },
            email() {
                return this.$store.state.registration.email;
            },
            emailValid() {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.email);
            },
            emailConfirmation() {
                return this.$store.state.registration.email_confirmation;
            },
            emailConfirmed() {
                return this.email == this.emailConfirmation &&
                    this.email != '';
            },
            password() {
                return this.$store.state.registration.password;
            },
            passwordValid() {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.password);
            },
            passwordConfirmation() {
                return this.$store.state.registration.password_confirmation
            },
            passwordConfirmed() {
                return this.password == this.passwordConfirmation &&
                    this.password != '';
            },
            code() {
                return this.$store.state.registration.code;
            },
            codeValid() {
                return this.code == 'ISMFREETRIAL' ||
                        this.code == 'IMTGEM17' ||
                        this.code == 'FMH17' ||
                        this.code == '';
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            register() {
                this.validate();
                if(this.errors.length == 0) {
                    axios.post('/confirm', { email: this.email }).then(response => {
                        if(this.code == 'FMH17' || this.code == 'IMTGEM17') {
                            this.$router.push({ name: 'Corporate' });
                        } else {
                            this.$router.push({ name: 'Plans' });
                        }
                    }).catch(error => {
                        if(error.response.data.email) {
                            this.$store.commit('setError', 'That email has already been used, please use another');
                        } else {
                            this.$store.commit('setError', 'An error has occured, please contact support.');
                        }
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.nameValid) {
                    this.$store.commit('setError', 'You must enter your full name.');
                }
                if(!this.emailValid && !this.emailConfirmed) {
                    this.$store.commit('setError', 'You must enter and confirm your email.');
                }
                if(!this.passwordValid && !this.passwordConfirmed) {
                    this.$store.commit('setError', 'You must enter and confirm a password.');
                }
                if(!this.codeValid) {
                    this.$store.commit('setError', 'You have an invalid promotion code.');
                }
                if(!this.$store.state.registration.terms) {
                    this.$store.commit('setError', 'You must accept the Terms of Service.');
                }
            }
        },
        components: {
            Terms
        }
    }
</script>
