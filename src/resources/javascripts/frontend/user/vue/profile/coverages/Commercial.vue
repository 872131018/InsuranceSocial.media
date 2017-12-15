<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div(class="w3-third") Do I write commercial coverage?
        div(class="w3-third")
            input(type="radio" id="commercialYes"
                :checked="commercial"
                @change="$emit('setOption', true)")
            label(for="commercialYes")
                span(class="w3-show-inline-block v-align")
                | Yes
        div(class="w3-third")
            input(type="radio" id="commercialNo"
                :checked="!commercial"
                @change="$emit('setOption', false)")
            label(for="commercialNo")
                span(class="w3-show-inline-block v-align")
                | No
</template>

<script>
    export default {
        props: {
            commercial: {
                type: Boolean
            }
        }
    }
</script>
