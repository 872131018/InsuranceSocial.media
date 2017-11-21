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
            console.log('App mounted.')
            if(this.$route.query.code) {
                this.$store.commit('setCode', this.$route.query.code);
            }
            axios.get('/api/plans').then(response => {
                this.$store.commit('setPlans', response.data);
                if(this.$route.query.code == 'ISMFREETRIAL') {
                    this.$store.commit('setPlan', response.data[0]);
                }
                if(this.$route.query.code == 'STANDARD') {
                    this.$store.commit('setPlan', response.data[1]);
                }
                if(this.$route.query.code == 'CONCIERGE') {
                    this.$store.commit('setPlan', response.data[0]);
                }
            });
            axios.get('/api/payment').then(response => {
                this.$store.commit('setAuthorize', response.data);
            });
        },
        components: {
            Tips
        }
    }
</script>
