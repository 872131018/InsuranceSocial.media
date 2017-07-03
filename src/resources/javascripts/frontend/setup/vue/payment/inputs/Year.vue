<template>
    <div class="w3-right fifty v-align">
        <input class="w3-input" type="text" placeholder="Year"
            v-model="year"
            v-on:keyup="$emit('setYear', year)">
    </div>
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
