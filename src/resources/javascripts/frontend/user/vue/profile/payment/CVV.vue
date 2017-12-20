<template lang="pug">
    div(class="w3-quarter v-align")
        input(class="w3-input" type="text" placeholder="CVV"
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
