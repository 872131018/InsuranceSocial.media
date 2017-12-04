<template lang="pug">
    div
        Navigation
        Tips
        div(class="w3-container w3-padding-32 bgimg2")
            ProgressBar(
                :progress="progress")
            router-view
        Foot
</template>

<script>
    import Tips from './Tips';

    export default {
        computed: {
            progress() {
                switch(this.$route.path) {
                    case '/facebook':
                        return 33;
                        break;
                    case '/create':
                        return 44;
                        break;
                    case '/pages':
                        return 44;
                        break;
                    case '/twitter':
                        return 55;
                        break;
                }
            }
        },
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
