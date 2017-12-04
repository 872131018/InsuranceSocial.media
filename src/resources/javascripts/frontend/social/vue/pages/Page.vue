<template lang="pug">
    div(class="w3-padding-16")
        input(type="radio"
            :id="`${ page.id }`"
            :checked="selected"
            @change="$emit('setPage', page)")
        label(
            :for="`${ page.id }`")
            span(class="w3-show-inline-block w3-margin-right v-align")
            | {{ page.name }}
</template>

<script>
    export default {
        props: {
            page: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        }
    }
</script>
