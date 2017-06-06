<template>
    <div class="w3-container w3-light-grey w3-padding-32">
        <div class="w3-container w3-card-2 register-form">
            <div class="w3-container w3-padding-32 w3-left">
                <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
                <span class="w3-xlarge">Insurance Social Media</span>
            </div>
            <div class="w3-container w3-padding-32">
                <h3>Create a New Account</h3>
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
                <Discount v-bind:label="'Discount Code'"
                    v-bind:code="properties.discount"
                    v-on:setDiscount="setDiscount($event)">
                </Discount>
                <Terms v-on:setTerms="setTerms($event)"></Terms>
                <ul class="w3-ul"
                    v-if="errors.length">
                    <li class="w3-text-red"
                        v-for="error in errors">{{ error }}</li>
                </ul>
                <button class="w3-button w3-text-white primary"
                    v-on:click="submit()">Register
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Name from './Name';
    import Email from './Email';
    import Password from './Password';
    import Discount from './Discount';
    import Terms from './Terms';

    export default {
        data() {
            return {
                properties: {
                    name: '',
                    email: '',
                    email_confirmation: '',
                    password: '',
                    password_confirmation: '',
                    discount: this.$route.params.code,
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
            setDiscount(discount) {
                this.properties.discount = discount;
            },
            setTerms(terms) {
                this.properties.terms = terms;
            },
            submit() {
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
                        console.log(response)
                    });
                }
            }
        },
        components: {
            Name,
            Email,
            Password,
            Discount,
            Terms
        }
    }
</script>
