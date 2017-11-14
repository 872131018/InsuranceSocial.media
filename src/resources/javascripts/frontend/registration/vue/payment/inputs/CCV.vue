<template lang="pug">
    div(class="w3-third v-align")
        input(class="w3-input" type="text" placeholder="CCV"
            v-model="code"
            @keyup="$emit('setCode', code)")
</template>

<script>
    export default {
        data() {
            return {
                code: ''
            }
        }
    }
</script>
