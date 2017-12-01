<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div(class="w3-third") Do I write Benefit coverage?
        div(class="w3-third")
            input(type="radio" id="benefitYes"
                :checked="benefit"
                @change="$emit('setOption', true)")
            label(for="benefitYes")
                span(class="w3-show-inline-block v-align")
                | Yes
        div(class="w3-third")
            input(type="radio" id="benefitNo"
                :checked="!benefit"
                @change="$emit('setOption', false)")
            label(for="benefitNo")
                span(class="w3-show-inline-block v-align")
                | No
</template>

<script>
    export default {
        props: {
            benefit: {
                type: Boolean
            }
        }
    }
</script>
