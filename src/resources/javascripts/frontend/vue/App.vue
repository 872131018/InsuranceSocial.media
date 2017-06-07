<template>
    <div>
        <Navigation></Navigation>
        <div class="w3-container w3-light-grey w3-padding-32">
            <Branding></Branding>
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    import Branding from './Branding';
    import Foot from './foot/Foot';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Navigation,
            Branding,
            Foot
        }
    }
</script>
