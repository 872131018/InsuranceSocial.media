<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="code"
            v-on:keyup="$emit('setCode', code)">
        <label class="w3-show-block">Card Verification</label>
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
