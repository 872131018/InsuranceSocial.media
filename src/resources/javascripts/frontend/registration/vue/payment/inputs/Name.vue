<template lang="pug">
    div(class="w3-padding")
        input(class="w3-input w3-show-inline-block" type="text"
            v-model="name"
            @keyup="$emit('setName', name)")
        label(class="w3-show-block") Card Holder's Name
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
