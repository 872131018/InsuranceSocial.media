<template lang="pug">
    div
        Navigation
        Tips
        div(class="w3-container w3-padding-32 bgimg2")
            ProgressBar(
                :progress="progress")
            QuickNavigation
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
            },
            progress() {
                switch(this.$route.path) {
                    case '/agency':
                        return 67;
                        break;
                    case '/location':
                        return 72;
                        break;
                    case '/coverages':
                        return 84;
                        break;
                    case '/outreach':
                        return 95;
                        break;
                }
            }
        },
        mounted() {
            console.log('App mounted.');

            this.$store.commit('serviceLoading');
            axios.get('/api/options').then(response => {
                this.$store.commit('setOptions', response.data);
                this.$store.commit('serviceFinished');
            });
            this.$store.commit('serviceLoading');
            axios.get('/api/user').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setUser', response.data);
                this.$store.commit('setPlan', response.data.plan);
                this.$store.commit('setAgency', response.data.agency);
                this.$store.commit('setRegions', response.data.regions);
                this.$store.commit('setStates', response.data.states);
                this.$store.commit('setCounties', response.data.counties);
                this.$store.commit('setRegions', response.data.regions);
                this.$store.commit('setCarriers', response.data.carriers);
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
                this.$store.commit('setCauses', response.data.causes);
            });
            this.$store.commit('serviceLoading');
            axios.get('/api/endpoint').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setEndpoints', response.data);
            });
        },
        components: {
            Tips
        }
    }
</script>
