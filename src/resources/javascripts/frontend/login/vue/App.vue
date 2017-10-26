<template lang="pug">
    div
        Navigation
        div(class="w3-container w3-padding-32 bgimg2")
            router-view
        Foot
</template>

<script>
    export default {
        mounted() {
            console.log('App mounted.')
        }
    }
</script>
