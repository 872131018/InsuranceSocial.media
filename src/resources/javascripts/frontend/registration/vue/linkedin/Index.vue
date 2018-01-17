<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 Do you want to use our LinkedIn services?
        h6 Add your LinkedIn account
        ul(class="w3-ul"
            v-if="code == 'MERCB18'")
            li For Essential Plan subscribers: no additional charge
            li For Standard Plan subscribers: no additional charge
            li For Concierge Plan subscribers: no additional charge
        ul(class="w3-ul"
            v-else)
            li For Essential Plan subscribers: additional $19 monthly
            li For Standard Plan subscribers: additional $10 monthly
            li For Concierge Plan subscribers: no additional charge
        input(class="v-align" type="radio" id="yes"
            :checked="selected"
            @change="$store.commit('setLinkedIn', true)")
        label(for="yes")
            span(class="w3-show-inline-block w3-margin v-align")
            | Connect my account
        input(class="v-align" type="radio" id="no"
            :checked="!selected"
            @change="$store.commit('setLinkedIn', false)")
        label(for="no")
            span(class="w3-show-inline-block w3-margin v-align")
            | No thanks
        div
            button(class="w3-button w3-text-white primary"
                @click="$router.push({ name: 'Payment' })") Continue
</template>

<script>
    export default {
        computed: {
            selected() {
                return this.$store.state.registration.plan.linkedIn;
            },
            code() {
                return this.$store.state.registration.code;
            }
        },
        mounted() {
            console.log(this.code)
        }
    }
</script>
