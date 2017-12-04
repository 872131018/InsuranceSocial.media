<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div(class="w3-third") Do I write crop coverage?
        div(class="w3-third")
            input(type="radio" id="cropYes"
                :checked="crop"
                @change="$emit('setOption', true)")
            label(for="cropYes")
                span(class="w3-show-inline-block v-align")
                | Yes
        div(class="w3-third")
            input(type="radio" id="cropNo"
                :checked="!crop"
                @change="$emit('setOption', false)")
            label(for="cropNo")
                span(class="w3-show-inline-block v-align")
                | No
</template>

<script>
    export default {
        props: {
            crop: {
                type: Boolean
            }
        }
    }
</script>
