<template>
    <div>
        <Navigation></Navigation>
        <Footer></Footer>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    import Footer from './footer/Footer';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Navigation,
            Footer
        }
    }
</script>
