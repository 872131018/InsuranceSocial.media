<template lang="pug">
    div(class="w3-third v-align")
        input(class="w3-input" type="text" placeholder="Year"
            :value="value"
            @keyup="$emit('setValue', $event.target.value)")
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
