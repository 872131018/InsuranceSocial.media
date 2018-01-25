<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'history' }"
            @click.native="$emit('setRoute', 'history')"
            :to="{ name: 'History' }") Payment History
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'payment' }"
            @click.native="$emit('setRoute', 'payment')"
            :to="{ name: 'Payment' }") Payment
        div(class="w3-bar-item w3-right sub-header-link") Account Preferences:
</template>

<script>
    export default {
        props: {
            selected: {
                type: String
            }
        }
    }
</script>
