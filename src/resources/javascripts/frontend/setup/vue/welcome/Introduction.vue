<template>
    <iframe width="100%" height="360"
        v-bind:src="getSource()">
    </iframe>
</template>

<script>
    export default {
        methods: {
            getSource() {
                return 'https://www.youtube.com/embed/R_CYkvXdYXE';
            }
        }
    }
</script>
