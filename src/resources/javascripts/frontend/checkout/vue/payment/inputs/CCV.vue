<template>
    <div class="w3-col l3 m3 s12 v-align">
        <input class="w3-input" type="text" placeholder="CCV"
            v-model="code"
            v-on:keyup="$emit('setCode', code)">
    </div>
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
