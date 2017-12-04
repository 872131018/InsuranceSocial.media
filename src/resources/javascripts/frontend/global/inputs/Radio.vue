<template lang="pug">
    div(class="w3-padding-16")
        input(type="radio"
            :id="option.desc.replace(' ', '')"
            :checked="selected"
            @change="$emit('setValue', option.code)")
        label(
            :for="option.desc.replace(' ', '')")
            span(class="w3-show-inline-block v-align")
            | {{ option.desc }}
</template>

<script>
    export default {
        props: {
            option: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        }
    }
</script>
