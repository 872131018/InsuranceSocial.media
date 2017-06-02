<template>
    <div class="bgimg">
        <form class="w3-container w3-margin w3-padding-32 w3-card-2 w3-row l4 m6 s12 login-form"
            v-bind:action="getUrl()"
            method="POST">
            <div class="w3-container w3-padding-32">
                <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
                <span class="w3-large">Insurance Social Media</span>
            </div>
            <div class="w3-section w3-margin">
                <input class="w3-input" type="text" style="width:90%" required>
                <label>Email</label>
            </div>
            <div class="w3-section w3-margin">
                <input class="w3-input" type="password" style="width:90%" required>
                <label>Password</label>
            </div>
            <div class="w3-section w3-margin">
                <input class="w3-check" type="checkbox" checked="checked">
                <label>Stay logged in</label>
            </div>
            <div class="w3-section w3-margin">
                <input type="hidden" name="_token" v-bind:value="getToken()">
                <button class="w3-button w3-section w3-text-white primary"> Log in </button>
            </div>
        </form>
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
            }
        }
    }
</script>
