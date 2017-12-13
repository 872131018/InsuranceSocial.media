<template lang="pug">
    div(class="w3-padding-16")
        input(type="radio"
            :id="`${ company.id }`"
            :checked="selected"
            @change="$emit('setCompany', company)")
        label(
            :for="`${ company.id }`")
            span(class="w3-show-inline-block w3-margin-right v-align")
            | {{ company.name }}
</template>

<script>
    export default {
        props: {
            company: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        }
    }
</script>
