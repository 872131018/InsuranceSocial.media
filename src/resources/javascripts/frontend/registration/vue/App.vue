<template lang="pug">
    div
        Navigation
        Tips
        div(class="w3-container w3-padding-32 bgimg2")
            router-view
        Foot
</template>

<script>
    import Tips from './Tips';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Tips
        }
    }
</script>
