<template>
    <div class="w3-container w3-margin w3-padding-32 w3-card-2 w3-row l4 m6 s12 login-form">
        <div class="w3-container w3-padding-32">
            <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
            <span class="w3-large">Insurance Social Media</span>
        </div>
        <div class="w3-container w3-padding-32">
            <div class="w3-section">
                <input class="w3-input eighty" type="text"
                    v-model="properties.email">
                <label>Email</label>
            </div>
            <div class="w3-section">
                <input class="w3-input eighty" type="password"
                    v-model="properties.password">
                <label>Password</label>
            </div>
            <div class="w3-section">
                <button class="w3-button w3-text-white primary"
                    v-on:click="login()">Login
                </button>
            </div>
        </div>
        <div class="w3-container w3-padding-32">
            <p class="w3-large">Don't have a login?</p>
            <button class="w3-button w3-text-white secondary"
                v-on:click="register()">Register
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                properties: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                axios.post(window.location, this.properties).then(response => {
                    store.dispatch({ type: 'SET_USER', data: response.data });
                    window.location = `${ window.base_url }/setup/welcome`;
                }).catch(error => {
                    this.errors.push('An error has occured, please contact support.');
                });
            },
            register() {
                window.location = `${ window.base_url }/register`;
            }
        }
    }
</script>
