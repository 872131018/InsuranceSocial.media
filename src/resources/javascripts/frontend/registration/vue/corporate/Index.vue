<template lang="pug">
    div(class="w3-card w3-padding form")
        img(class="w3-image"
            :src="logo")
        h6 On behalf of {{ company }}, we’re looking forward to helping you build your strong, growing, personalized social media experience!
        h3 Plan Description
        p {{ details }}
        h6 We look forward to working with you. Please click continue to finish registering your account.
        div(class="w3-padding-16")
            button(class="w3-button w3-text-white primary"
                @click="$router.push({ name: 'Plans' })") Continue
</template>

<script>
    export default {
        computed: {
            logo() {
                return this.$store.state.corporate.logo;
            },
            company() {
                return this.$store.state.corporate.company;
            },
            details() {
                return this.$store.state.corporate.details;
            }
        },
        mounted() {
            axios.get(`/api/corporate/${ this.$store.state.registration.code }`).then(response => {
                this.$store.commit('setCorporate', response.data);
            });
        }
    }
</script>
