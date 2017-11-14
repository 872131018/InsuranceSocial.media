<template lang="pug">
    div(class="w3-third v-align")
        input(class="w3-input" type="text" placeholder="Year"
            v-model="year"
            @keyup="$emit('setYear', year)")
</template>

<script>
    export default {
        data() {
            return {
                year: ''
            }
        }
    }
</script>
