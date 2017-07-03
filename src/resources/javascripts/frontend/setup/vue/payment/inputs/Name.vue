<template>
    <div class="w3-section">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="name"
            v-on:keyup="$emit('setName', name)">
        <label class="w3-show-block">Card Holder's Name</label>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        }
    }
</script>
