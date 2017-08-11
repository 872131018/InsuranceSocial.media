<template>
    <div>
        <Navigation></Navigation>
        <Tips></Tips>
        <div class="w3-container w3-padding-32 bgimg2"
            v-if="loading == 0">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Tips from './Tips';

    export default {
        data() {
            return {
                loading: 0
            }
        },
        mounted() {
            console.log('App mounted.');

            this.loading++;
            axios.get(`${ window.base_url }/api/user`).then(response => {
                store.dispatch({ type: 'SET_USER', data: response.data });
                this.loading--;
            });
        },
        components: {
            Tips
        }
    }
</script>
