<template>
    <div>
        <Navigation></Navigation>
        <router-view></router-view>
        <Foot></Foot>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    import Login from './login/Login';
    import Foot from './foot/Foot';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Navigation,
            Login,
            Foot
        }
    }
</script>
