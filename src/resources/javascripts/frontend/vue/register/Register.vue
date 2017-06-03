<template>
    <div class="bgimg">
        <div class="w3-container w3-padding-32 w3-card-2 register-form">
            <div class="w3-container w3-padding-32 w3-center">
                <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
                <span class="w3-large">Insurance Social Media</span>
            </div>
            <div class="w3-container w3-padding-32">
                <div class="w3-section">
                    <input class="w3-input" type="text" style="width:90%" required>
                    <label>Email</label>
                </div>
                <div class="w3-section">
                    <input class="w3-input" type="password" style="width:90%" required>
                    <label>Password</label>
                </div>
                <div class="w3-section">
                    <input class="w3-check" type="checkbox" checked="checked">
                    <label>Stay logged in</label>
                </div>
                <div class="w3-section">
                    <input type="hidden" name="_token" v-bind:value="getToken()">
                    <button class="w3-button w3-text-white primary">Log in</button>
                </div>
            </div>
            <div class="w3-container w3-padding-32">
                <p class="w3-large">Don't have a login?</p>
                <router-link class="w3-button w3-text-white secondary"
                   v-bind:to="{ name: 'Register' }">Register
               </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            //
        },
        methods: {
            getUrl() {
                return window.location + '/login';
            },
            getToken() {
                return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            },
            register() {
                window.location = window.base_url + '/register';
            }
        }
    }
</script>
