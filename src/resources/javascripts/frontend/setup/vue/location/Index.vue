<template lang="pug">
    div
        div(class="w3-card w3-padding form")
            h3 Where are you?
            h5 Please complete this information to receive content pertaining to your marketing areas.
            Field(
                :label="'Business Address 1'"
                :value="address1"
                :valid="address1Valid"
                @setValue="(value) => $store.commit('setAddress1', value)")
            Field(
                :label="'Business Address 2'"
                :value="address2"
                :valid="address2Valid"
                @setValue="(value) => $store.commit('setAddress2', value)")
            Field(
                :label="'City'"
                :value="city"
                :valid="cityValid"
                @setValue="(value) => $store.commit('setCity', value)")
            Dropdown(
                :label="'State'"
                :options="$store.state.options.states"
                :selected="state"
                @setValue="(value) => $store.commit('setState', value.code)")
            Field(
                :label="'Zip Code'"
                :value="zip"
                :valid="zipValid"
                @setValue="(value) => $store.commit('setZip', value)")
            Marketing(
                :marketingRegion="marketingRegion"
                :marketingState="marketingState"
                @setMarketingRegion="(value) => { $store.commit('setMarketingRegionType', value); $store.commit('clearStates'); $store.commit('clearCounties') }"
                @setMarketingState="(value) => { $store.commit('setMarketingStateType', value); $store.commit('clearRegions') }")
            div(
                v-if="marketingRegion")
                List(
                    :label="'Selected Regions (click to remove)'"
                    :items="selectedRegions"
                    @clearValue="(value) => $store.commit('removeRegion', value)")
                Dropdown(
                    :label="'Marketing Regions (Select up to 5)'"
                    :options="$store.state.options.regions"
                    :selected="label"
                    @setValue="(value) => $store.commit('setRegion', value)")
            div(
                v-if="marketingState")
                List(
                    :label="'Selected State (click to remove)'"
                    :items="selectedStates"
                    @clearValue="(value) => $store.commit('removeState', value)")
                Dropdown(
                    :label="'Marketing States (Select up to 5)'"
                    :options="$store.state.options.states"
                    :selected="label"
                    @setValue="(value) => $store.commit('setMarketingState', value)")
                List(
                    :label="'Selected Counties (click to remove)'"
                    :items="selectedCounties"
                    @clearValue="(value) => $store.commit('removeCounty', value)")
                Dropdown(
                    :label="'Marketing Counties (No selection is all counties)'"
                    :options="counties"
                    :selected="label"
                    @setValue="(value) => $store.commit('setCounty', value)")
            Errors(
                v-if="errors.length"
                :errors="errors")
            h5 Click continue to select the coverages you wish to write.
            button(class="w3-button w3-margin-right w3-text-white primary"
                @click="$router.push({ name: 'Profile' })") Previous
            button(class="w3-button w3-margin-left w3-text-white primary"
                @click="update('Coverages')") Continue
</template>

<script>
    import Marketing from './Marketing';

    export default {
        computed: {
            address1() {
                return this.$store.state.agency.address_1;
            },
            address1Valid() {
                return this.address1 != null && this.address1 != '';
            },
            address2() {
                return this.$store.state.agency.address_2;
            },
            address2Valid() {
                return this.address2 != null && this.address2 != '';
            },
            city() {
                return this.$store.state.agency.city;
            },
            cityValid() {
                return this.city != null && this.city != '';
            },
            state() {
                if(this.$store.state.agency.state) {
                    for(let option of this.$store.state.options.states) {
                        if(this.$store.state.agency.state == option.code) {
                            return option;
                        }
                    }
                } else {
                    return this.label;
                }

            },
            zip() {
                return this.$store.state.agency.zip;
            },
            zipValid() {
                return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zip);
            },
            marketingRegion() {
                return this.$store.state.transient.marketingRegion;
            },
            marketingState() {
                return this.$store.state.transient.marketingState;
            },
            selectedRegions() {
                return this.$store.state.user.regions;
            },
            selectedStates() {
                return this.$store.state.user.states;
            },
            counties() {
                if(this.selectedStates.length > 0) {
                    let filteredCounties = [];
                    for(let filter of this.selectedStates) {
                        for(let county of this.$store.state.options.counties) {
                            if(county.state_code == filter.state_code) {
                                filteredCounties.push(county);
                            }
                        }
                    }
                    return filteredCounties;
                } else {
                    return this.$store.state.options.counties;
                }
            },
            selectedCounties() {
                return this.$store.state.user.counties;
            },
            label() {
                return { code: 'DE', desc:'Options' };
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            update(route) {
                this.validate();
                if(this.errors.length == 0) {
                    this.$store.commit('serviceLoading');
                    axios.post('/location', this.$store.state.agency).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.$router.push({ name: route });
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                    this.$store.commit('serviceLoading');
                    axios.post('/location/selections', this.$store.state.user).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.$router.push({ name: route });
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.address1Valid) {
                    this.$store.commit('setError', 'You must enter an address.');
                }
                if(!this.cityValid) {
                    this.$store.commit('setError', 'You must enter your city.');
                }
                if(this.state.code == 'DE') {
                    this.$store.commit('setError', 'You must enter your state.');
                }
                if(!this.zipValid) {
                    this.$store.commit('setError', 'You must enter your zip code.');
                }
                if(this.selectedRegions.length == 0 &&
                    this.selectedStates.length == 0 &&
                    this.selectedCounties.length == 0) {
                        this.$store.commit('setError', 'You must enter either marketing regions or states and counties.');
                }
                if(this.selectedRegions.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 regions.');
                }
                if(this.selectedStates.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 states.');
                }
                if(this.selectedCounties.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 counties.');
                }
            }
        },
        components: {
            Marketing
        }
    }
</script>
