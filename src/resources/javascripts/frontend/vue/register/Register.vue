<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-container w3-margin">
            <h3>Create an Account</h3>
            <h5>Please complete required fields to complete registration.</h5>
        </div>
        <div class="w3-container w3-margin">
            <Name v-bind:label="'Full Name'"
                v-on:setName="setName($event)">
            </Name>
            <Email v-bind:label="'Email'"
                v-on:setEmail="setEmail($event)">
            </Email>
            <Email v-bind:label="'Confirm Email'"
                v-on:setEmail="confirmEmail($event)">
            </Email>
            <Password v-bind:label="'Password'"
                v-on:setPassword="setPassword($event)">
            </Password>
            <Password v-bind:label="'Confirm Password'"
                v-on:setPassword="confirmPassword($event)">
            </Password>
            <Code v-bind:label="'Discount Code'"
                v-bind:code="properties.code"
                v-on:setCode="setCode($event)">
            </Code>
            <Terms v-on:setTerms="setTerms($event)"></Terms>
            <Errors v-bind:errors="errors"></Errors>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Continue
            </button>
        </div>
    </div>
</template>

<script>
    import Name from './inputs/Name';
    import Email from './inputs/Email';
    import Password from './inputs/Password';
    import Code from './inputs/Code';
    import Terms from './inputs/Terms';
    import Errors from './Errors';

    export default {
        mounted() {
            if(this.$route.params.code) {
                this.code = this.$route.params.code;
            }
        },
        data() {
            return {
                properties: {
                    name: '',
                    email: '',
                    email_confirmation: '',
                    password: '',
                    password_confirmation: '',
                    code: '',
                    terms: false,
                },
                errors: []
            }
        },
        methods: {
            setName(name) {
                this.properties.name = name;
            },
            setEmail(email) {
                this.properties.email = email;
            },
            confirmEmail(email) {
                this.properties.email_confirmation = email;
            },
            setPassword(password) {
                this.properties.password = password;
            },
            confirmPassword(password) {
                this.properties.password_confirmation = password;
            },
            setCode(code) {
                this.properties.code = code;
            },
            setTerms(terms) {
                this.properties.terms = terms;
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
                    axios.post(window.base_url + '/register', this.properties).then(response => {
                        let user = {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            api_token: response.data.api_token,
                        };
                        store.dispatch({ type: 'SET_USER', data: user });
                        store.dispatch({ type: 'SET_CODE', data: this.properties.code });
                        this.$router.push('/select');
                    });
                }
            }
        },
        components: {
            Name,
            Email,
            Password,
            Code,
            Terms,
            Errors
        }
    }
</script>
