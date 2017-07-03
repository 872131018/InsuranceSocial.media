<template>
    <div>
        <Navigation></Navigation>
        <div class="w3-container w3-padding-32 bgimg2">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation';
    import Foot from './foot/Foot';

    export default {
        mounted() {
            console.log('App mounted.');

            axios.get(`${ window.base_url }/setup`).then(response => {
                store.dispatch({ type: 'SET_USER', data: response.data });
            });
        },
        components: {
            Navigation,
            Foot
        }
    }
</script>
