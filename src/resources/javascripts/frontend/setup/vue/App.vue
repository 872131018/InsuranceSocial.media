<template lang="pug">
    div
        Navigation
        Tips
        div(class="w3-container w3-padding-32 bgimg2"
            v-if="loading == 0")
            router-view
        div(
            v-else)
            Loader
        Foot
</template>

<script>
    import Tips from './Tips';
    import Loader from './Loader';

    export default {
        data() {
            return {
                loading: 0
            }
        },
        mounted() {
            console.log('App mounted.');

            this.loading++;
            axios.get('/api/titles').then(response => {
                this.$store.commit('setTitles', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/sizes').then(response => {
                this.$store.commit('setSizes', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/generations').then(response => {
                this.$store.commit('setGenerations', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/frequencies').then(response => {
                this.$store.commit('setFrequencies', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/states').then(response => {
                this.$store.commit('setStates', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/regions').then(response => {
                this.$store.commit('setRegions', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/counties').then(response => {
                this.$store.commit('setCounties', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/user').then(response => {
                //console.log(response.data)
                this.$store.commit('setUser', response.data);
                this.$store.commit('setAgency', response.data.agency);
                this.$store.commit('setUserRegions', response.data.regions);
                this.loading--;
            });
            /*
            this.loading++;
            axios.get('/api/plan').then(response => {
                store.dispatch({ type: 'SET_PLAN', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/coverages').then(response => {
                store.dispatch({ type: 'SET_COVERAGES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/industries').then(response => {
                store.dispatch({ type: 'SET_INDUSTRIES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/causes').then(response => {
                store.dispatch({ type: 'SET_CAUSES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/carriers').then(response => {
                store.dispatch({ type: 'SET_CARRIERS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/selections').then(response => {
                store.dispatch({ type: 'SET_SELECTIONS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get('/api/endpoint').then(response => {
                store.dispatch({ type: 'SET_ENDPOINT', data: response.data });
                this.loading--;
            });
            */
        },
        components: {
            Tips,
            Loader
        }
    }
</script>
