<template>
    <div>
        <Navigation></Navigation>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Navigation
        }
    }
</script>
