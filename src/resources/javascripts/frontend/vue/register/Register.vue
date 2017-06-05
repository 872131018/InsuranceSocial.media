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
                name: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
                discount: '',
                terms: false,
                errors: []
            }
        },
        methods: {
            setName(name) {
                this.name = name;
            },
            setEmail(email) {
                this.email = email;
            },
            confirmEmail(email) {
                this.confirmEmail = email;
            },
            setPassword(password) {
                this.password = password;
            },
            confirmPassword(password) {
                this.confirmPassword = password;
            },
            setDiscount(discount) {
                this.discount = discount;
            },
            setTerms(terms) {
                this.terms = terms;
            },
            submit() {
                this.errors = [];
                if(this.email == '' || this.confirmEmail == '') {
                    this.errors.push('You must enter and confirm an email.')
                }
                if(this.email != this.confirmEmail) {
                    this.errors.push('Emails do not match.');
                }
                if(this.password == '' || this.confirmPassword == '') {
                    this.errors.push('You must enter and confirm a password');
                }
                if(this.password != this.confirmPassword) {
                    this.errors.push('Passwords do not match.');
                }
                if(!this.terms) {
                    this.errors.push('You must accept the Terms of Service.');
                }
                if(this.errors.length == 0) {
                    console.log("SUCCESS!!!")
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
