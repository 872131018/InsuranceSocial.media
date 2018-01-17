<template lang="pug">
    div
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'linkedin' }"
            @click="() => { $emit('setRoute', 'linkedin'); $emit('showSubMenu', 'linkedin')}") LinkedIn
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'twitter' }"
            @click="() => { $emit('setRoute', 'twitter'); $emit('showSubMenu', 'twitter')}") Twitter
        div(class="w3-bar-item w3-button w3-hover-white w3-right sub-header-link"
            :class="{ 'w3-white': selected == 'facebook' }"
            @click="() => { $emit('setRoute', 'facebook'); $emit('showSubMenu', 'facebook')}") Facebook
        div(class="w3-bar-item w3-right sub-header-link") Social Actions For:
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
