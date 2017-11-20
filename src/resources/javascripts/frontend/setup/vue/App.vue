<template>
    <div>
        <Navigation></Navigation>
        <Tips></Tips>
        <div class="w3-container w3-padding-32 bgimg2"
            v-if="loading == 0">
            <router-view></router-view>
        </div>
        <div
            v-else>
            <Loader></Loader>
        </div>
        <Foot></Foot>
    </div>
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
            axios.get(`${ window.base_url }/api/user`).then(response => {
                store.dispatch({ type: 'SET_USER', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/plan`).then(response => {
                store.dispatch({ type: 'SET_PLAN', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/agency`).then(response => {
                store.dispatch({ type: 'SET_AGENCY', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/regions`).then(response => {
                store.dispatch({ type: 'SET_REGIONS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/states`).then(response => {
                store.dispatch({ type: 'SET_STATES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/counties`).then(response => {
                store.dispatch({ type: 'SET_COUNTIES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/coverages`).then(response => {
                store.dispatch({ type: 'SET_COVERAGES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/industries`).then(response => {
                store.dispatch({ type: 'SET_INDUSTRIES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/causes`).then(response => {
                store.dispatch({ type: 'SET_CAUSES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/titles`).then(response => {
                store.dispatch({ type: 'SET_TITLES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/sizes`).then(response => {
                store.dispatch({ type: 'SET_SIZES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/generations`).then(response => {
                store.dispatch({ type: 'SET_GENERATIONS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/frequencies`).then(response => {
                store.dispatch({ type: 'SET_FREQUENCIES', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/carriers`).then(response => {
                store.dispatch({ type: 'SET_CARRIERS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/selections`).then(response => {
                store.dispatch({ type: 'SET_SELECTIONS', data: response.data });
                this.loading--;
            });
            this.loading++;
            axios.get(`${ window.base_url }/api/endpoint`).then(response => {
                store.dispatch({ type: 'SET_ENDPOINT', data: response.data });
                this.loading--;
            });
        },
        components: {
            Tips,
            Loader
        }
    }
</script>
