<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'referral' }"
            @click.native="$emit('setRoute', 'referral')"
            :to="{ name: 'Referral' }") Referral
        div(class="w3-bar-item w3-right sub-header-link") Tools for:
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
