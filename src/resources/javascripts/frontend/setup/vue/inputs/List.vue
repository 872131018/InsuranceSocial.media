<template lang="pug">
    div(class="w3-padding-16")
        div {{ label }}
        ul(class="w3-ul w3-hoverable")
            li(class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                v-for="(item, index) in items"
                @click="$emit('clearValue', index)") {{ item.desc }} #[i(class="fa fa-times w3-margin-left")]
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            items: {
                type: Array
            }
        }
    }
</script>
