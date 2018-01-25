<template lang="pug">
    div(class="w3-card w3-content w3-padding dashboard")
        div(class="w3-padding w3-text-white primary") Payments logged to account
        div(class="w3-container")
            div(
                v-for="payment of payments")
                div(class="w3-third w3-padding") Date - {{ payment.created }}
                div(class="w3-third w3-padding") Total - {{ payment.total }}
                div(class="w3-third w3-padding") Transaction ID - {{ payment.transId }}
</template>

<script>
    export default {
        computed: {
            payments() {
                return this.$store.state.history.history;
            }
        }
    }
</script>
