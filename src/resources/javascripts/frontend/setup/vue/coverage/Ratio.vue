<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div(class="w3-third") Ratio of Commercial to Personal Business
        div(class="w3-third")
            Field(
                :label="'% Commercial'"
                :value="commercialMix"
                :valid="commercialMixValid"
                @setValue="(value) => $emit('setCommercialMix', value)")
        div(class="w3-third")
            Field(
                :label="'% Personal'"
                :value="personalMix"
                :valid="personalMixValid"
                @setValue="(value) => $emit('setPersonalMix', value)")
</template>

<script>
    export default {
        props: {
            commercialMix: {
                type: String
            },
            personalMix: {
                type: String
            },
            commercialMixValid: {
                type: Boolean
            },
            personalMixValid: {
                type: Boolean
            }
        }
    }
</script>
