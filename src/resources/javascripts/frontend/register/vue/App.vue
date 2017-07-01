<template>
    <div>
        <Navigation></Navigation>
        <Tips></Tips>
        <div class="w3-container w3-padding-32 bgimg2">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    import Branding from './Branding';
    import Tips from './Tips';
    import Foot from './foot/Foot';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Navigation,
            Branding,
            Tips,
            Foot
        }
    }
</script>
