<template>
    <div class="w3-section">
        <span class="w3-large">Notification Method: </span>
        <input class="w3-margin-left v-align" type="checkbox" id="email"
            v-model="email"
            v-on:change="$emit('setEmail', email)">
        <label class="v-align check-box" for="email"></label>
        <span class="w3-large">Email</span>
        <input class="w3-margin-left v-align" type="checkbox" id="text"
            v-model="text"
            v-on:change="$emit('setText', text)">
        <label class="v-align check-box" for="text"></label>
        <span class="w3-large">Text</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: true,
                text: true
            }
        }
    }
</script>
