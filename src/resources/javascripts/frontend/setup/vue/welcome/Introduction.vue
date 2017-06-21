<template>
    <iframe width="100%" height="360"
        v-bind:src="src">
    </iframe>
</template>

<script>
    export default {
        data() {
            return {
                src: 'https://www.youtube.com/embed/R_CYkvXdYXE'
            }
        }
    }
</script>
