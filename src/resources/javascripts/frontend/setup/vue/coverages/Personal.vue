<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div(class="w3-third") Do I write personal coverage?
        div(class="w3-third")
            input(type="radio" id="personalYes"
                :checked="personal"
                @change="$emit('setOption', true)")
            label(for="personalYes")
                span(class="w3-show-inline-block v-align")
                | Yes
        div(class="w3-third")
            input(type="radio" id="personalNo"
                :checked="!personal"
                @change="$emit('setOption', false)")
            label(for="personalNo")
                span(class="w3-show-inline-block v-align")
                | No
</template>

<script>
    export default {
        props: {
            personal: {
                type: Boolean
            }
        }
    }
</script>
