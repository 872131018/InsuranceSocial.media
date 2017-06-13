<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Create an Account</h3>
            <h5>Please complete required fields to complete registration.</h5>
        </div>
        <div class="w3-panel">
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
            <Discount v-bind:label="'Discount Discount'"
                v-on:setDiscount="setDiscount($event)">
            </Discount>
            <Terms v-on:setTerms="setTerms($event)"></Terms>
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
                    password: '',
                    password_confirmation: '',
                    discount: '',
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
                        let user = {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            api_token: response.data.api_token,
                            discount: this.properties.discount
                        };
                        store.dispatch({ type: 'SET_USER', data: user });
                        //this.$router.push({ name: 'Select' });
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
