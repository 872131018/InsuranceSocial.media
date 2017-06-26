<template>
    <div class="w3-container w3-margin w3-padding-32 w3-card-2 w3-row l4 m6 s12 login-form">
        <div class="w3-container w3-padding-32">
            <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
            <span class="w3-large">Insurance Social Media</span>
        </div>
        <div class="w3-container w3-padding-32">
            <form v-bind:action="getUrl()" method="POST">
                <div class="w3-section">
                    <input class="w3-input eighty" type="text"
                        name="email">
                    <label>Email</label>
                </div>
                <div class="w3-section">
                    <input class="w3-input eighty" type="password"
                        name="password">
                    <label>Password</label>
                </div>
                <input type="hidden" name="_token"
                    v-bind:value="getToken()">
                <div class="w3-section">
                    <button class="w3-button w3-text-white primary" type="submit">Login</button>
                </div>
            </form>
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
        methods: {
            getUrl() {
                return window.location;
            },
            getToken() {
                return document.head.querySelector('meta[name="csrf-token"]').content;
            },
            register() {
                window.location = `${ window.base_url }/register`;
            }
        }
    }
</script>
