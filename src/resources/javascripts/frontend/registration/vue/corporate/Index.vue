<template lang="pug">
    div(class="w3-card w3-padding form")
        img(class="w3-image"
            :src="logo")
        h3 On behalf of {{ company }}, we’re looking forward to helping you build your strong, growing, personalized social media experience!
        h4 To help you succeed, we’ve made everything easy.
        p We handle the posting automatically, so you can spend more time with your clients and family.
        p We make it easy for you to interact with your followers, if desired.
        p We even help you build your social media audience, so you can focus on building more relationships and sales.
        h3 Getting started is easy too.
        h4 The sign-up process takes 10 minutes or less.
        p 1. Click here to get started. If you choose the Essential Plan, {{ company }} will cover the full cost of your subscription through {{ expiration }}. If you choose the Standard or Concierge Plans, {{ company }} will pay for $39 of your total monthly subscription through {{ expiration }}.
        p 2. Connect your social media accounts to InsuranceSocial.Media. (If you already have a corporate Facebook page, you’ll enter your personal Facebook login info to allow us to connect to that page. If you don’t have a corporate Facebook page, we’ll set one up for you for a one-time fee of $25.)
        p 3. Enter your credit card information.
        p 4. Answer a few questions that will enable us to customize your posts to your local market, personal interests and product lines.
        p Activate your account today.
        p #[b *Note: this offer is valid only to new InsuranceSocial.Media subscribers. ]
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
            expiration() {
                return this.$store.state.corporate.expiration;
            }
        },
        mounted() {
            axios.get(`/api/corporate/${ this.$store.state.registration.code }`).then(response => {
                this.$store.commit('setCorporate', response.data);
            });
        }
    }
</script>
