<template lang="pug">
    div
        input(class="w3-input w3-show-inline-block" type="text"
            :value="value"
            @keyup="$emit('setValue', $event.target.value)")
        label(class="w3-show-block") Card Holder's Name
</template>

<script>
    export default {
        props: {
            value: {
                type: String
            }
        }
    }
</script>
