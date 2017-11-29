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
            console.log('App mounted.');
            
            axios.get('/api/facebook').then(response => {
                this.$store.commit('setFacebookUrl', response.data);
            });
            axios.get('/api/twitter').then(response => {
                this.$store.commit('setTwitterUrl', response.data);
            });
        },
        components: {
            Tips
        }
    }
</script>
