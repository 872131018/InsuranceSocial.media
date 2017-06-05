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
                <Terms></Terms>
                <button class="w3-button w3-text-white primary">Register</button>
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
                agreeToTerms: ''
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
            }
        },
        components: {
            Name,
            Email,
            Password,
            Discount,
            Terms
        },
    }
</script>
