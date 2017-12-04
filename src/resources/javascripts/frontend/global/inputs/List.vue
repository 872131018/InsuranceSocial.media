<template lang="pug">
    div(class="w3-padding-16" style="clear:both")
        div {{ label }}
        div(class="w3-show-inline-block w3-padding w3-hover-grey"
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
