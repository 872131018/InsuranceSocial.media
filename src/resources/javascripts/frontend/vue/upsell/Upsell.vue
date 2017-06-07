<template>
    <div class="w3-container w3-light-grey w3-padding-32">
        <div class="w3-container w3-padding-32 w3-left">
            <img class="w3-margin-right login-logo" src="/images/talk-bubble-color.png">
            <span class="w3-xlarge">Insurance Social Media</span>
        </div>
        <div class="w3-container w3-card-2 corporate">
            <div class="w3-container w3-padding-32 w3-row">
                <img class="w3-col l6 m12 s12" v-bind:src="logo">
                <h3 class="w3-col l6 m12 s12 w3-padding-32 w3-center">Insurance Social Media is proud to work with you and your team at {{ company }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logo: window.data.logo,
                company: window.data.company,
                features: window.data.features
            }
        },
        methods: {
            //
        },
        components: {
            //
        }
    }
</script>
