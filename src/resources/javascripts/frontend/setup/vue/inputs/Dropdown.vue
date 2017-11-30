<template lang="pug">
    div(class="eighty v-align")
        p {{ label }}
        div(class="w3-dropdown-hover w3-grey")
            button(class="w3-button") {{ selected.desc }} #[i(class="fa fa-caret-down")]
            div(class="w3-dropdown-content w3-bar-block w3-border dropdown")
                div(class="w3-bar-item w3-button"
                    v-for="option in options"
                    @click="$emit('setValue', option)") {{ option.desc }}
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            options: {
                type: Array
            },
            selected: {
                type: Object
            }
        }
    }
</script>
