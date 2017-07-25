<template>
    <div>
        <Navigation></Navigation>
        <div class="w3-container w3-padding-32 bgimg2"
            v-if="loading == 0">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
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
        }
    }
</script>
