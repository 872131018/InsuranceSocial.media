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
            axios.get('/api/carriers').then(response => {
                this.$store.commit('setCarriers', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/coverages').then(response => {
                this.$store.commit('setCoverages', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/industries').then(response => {
                this.$store.commit('setIndustries', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/causes').then(response => {
                this.$store.commit('setCauses', response.data);
                this.loading--;
            });
            this.loading++;
            axios.get('/api/user').then(response => {
                console.log(response.data)
                this.$store.commit('setUser', response.data);
                this.$store.commit('setPlan', response.data.plan);
                this.$store.commit('setAgency', response.data.agency);
                this.$store.commit('setUserRegions', response.data.regions);
                this.$store.commit('setUserCarriers', response.data.carriers);
                this.$store.commit('setCommercialCoverages', response.data.commercial_coverages);
                if(response.data.commercial_coverages.length > 0) {
                    this.$store.commit('setCommercial', true);
                }
                this.$store.commit('setPersonalCoverages', response.data.personal_coverages);
                if(response.data.personal_coverages.length > 0) {
                    this.$store.commit('setPersonal', true);
                }
                this.$store.commit('setBenefitCoverages', response.data.benefit_coverages);
                if(response.data.benefit_coverages.length > 0) {
                    this.$store.commit('setBenefit', true);
                }
                this.$store.commit('setCropCoverages', response.data.crop_coverages);
                if(response.data.crop_coverages.length > 0) {
                    this.$store.commit('setCrop', true);
                }
                this.$store.commit('setTargetCoverages', response.data.target_coverages);
                this.$store.commit('setCurrentIndustries', response.data.current_industries);
                this.$store.commit('setTargetIndustries', response.data.target_industries);
                this.$store.commit('setSpecialTopics', response.data.special_topics);
                this.$store.commit('setUserCauses', response.data.causes);





                this.$store.commit('setMixes', [
                    {"code": "1", "desc":"Existing Clients Only"},
                    {"code": "2", "desc":"Mostly Existing Clients"},
                    {"code": "3", "desc":"Existing and New Clients Equally"},
                    {"code": "4", "desc":"Mostly New Clients"},
                    {"code": "5", "desc":"New Clients Only"}
                ]);
                this.$store.commit('setTones', [
                    {"code": "1", "desc":"Simply Informative"},
                    {"code": "2", "desc":"Conversational"},
                    {"code": "3", "desc":"Entertainingly Informative"}
                ]);
                this.$store.commit('setTopics', [
                    {"code": "NH", "desc":"Recognition of National Holidays"},
                    {"code": "IH", "desc":"Insurance Humor"},
                    {"code": "CN", "desc":"Current News"}
                ]);
                this.$store.commit('setDays', [
                    {"code": "monday", "desc":"Monday"},
                    {"code": "tuesday", "desc":"Tuesday"},
                    {"code": "wednesday", "desc":"Wednesday"},
                    {"code": "thursday", "desc":"Thursday"},
                    {"code": "friday", "desc":"Friday"},
                    {"code": "saturday", "desc":"Saturday"},
                    {"code": "sunday", "desc":"Sunday"}
                ]);
                this.$store.commit('setTimes', [
                    {"code": "system_chosen", "desc":"System Chosen"},
                    {"code": "2-5am", "desc":"2-5am"},
                    {"code": "5-8am", "desc":"5-8am"},
                    {"code": "8-11am", "desc":"8-11am"},
                    {"code": "11am-2pm", "desc":"11am-2pm"},
                    {"code": "2-5pm", "desc":"2-5pm"},
                    {"code": "8-11pm", "desc":"8-11pm"},
                    {"code": "11pm-2am", "desc":"11pm-2am"}
                ]);
                this.loading--;
            });
            /*
            this.loading++;
            axios.get('/api/plan').then(response => {
                store.dispatch({ type: 'SET_PLAN', data: response.data });
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
