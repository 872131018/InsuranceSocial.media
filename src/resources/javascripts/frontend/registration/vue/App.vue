<template lang="pug">
    div
        Navigation
        Tips
        div(class="w3-container w3-padding-32 bgimg2")
            router-view
        Loader(
            v-if="loading != 0")
        Foot
</template>

<script>
    import Tips from './Tips';

    export default {
        computed: {
            loading() {
                return this.$store.state.services.loading;
            }
        },
        mounted() {
            console.log('App mounted.')
            this.$store.commit('serviceLoading');
            axios.get('/api/plans').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setPlans', response.data);
                if(this.$route.query.code) {
                    this.$store.commit('setCode', this.$route.query.code);
                }
                if(this.$route.query.plan == 'ISMFREETRIAL') {
                    this.$store.commit('setPlan', response.data[0]);
                }
                if(this.$route.query.plan == 'STANDARD') {
                    this.$store.commit('setPlan', response.data[1]);
                }
                if(this.$route.query.plan == 'CONCIERGE') {
                    this.$store.commit('setPlan', response.data[2]);
                }
            });
            this.$store.commit('serviceLoading');
            axios.get('/api/payment').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setAuthorize', response.data);
            });
        },
        components: {
            Tips
        }
    }
</script>
