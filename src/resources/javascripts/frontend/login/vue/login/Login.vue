<template lang="pug">
    div(class="w3-container w3-card-2 w3-row l4 m6 s12 login-form")
        div(class="w3-padding-32")
            img(class="login-logo" src="/images/talk-bubble-color.png")
            span(class="w3-large") Insurance Social Media
        div(class="w3-section")
            form(method="POST" action="/login")
                div(class="w3-section")
                    input(class="w3-input eighty" type="text" name="email")
                    label Email
                div(class="w3-section")
                    input(class="w3-input eighty" type="password" name="password")
                    label Password
                input(type="hidden" name="_token"
                    :value="getToken()")
                div(class="w3-section")
                    button(class="w3-button w3-text-white primary" type="submit") Login
        div(class="w3-padding-32")
            p(class="w3-large") Don't have a login?
            button(class="w3-button w3-text-white secondary"
                @click="register()") Register
</template>

<script>
    export default {
        methods: {
            getToken() {
                return document.head.querySelector('meta[name="csrf-token"]').content;
            },
            register() {
                window.location = '/register';
            }
        }
    }
</script>
