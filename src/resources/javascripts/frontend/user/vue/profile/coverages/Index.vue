<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 What do you write?
        h5 Please tell us about the lines of coverage you write and any industries you market to.
        List(
            :label="'Selected Carriers (click to remove)'"
            :items="carriers"
            @clearValue="(value) => $store.commit('removeCarrier', value)")
        Dropdown(
            :label="'Carriers (Select up to 5)'"
            :options="$store.state.options.carriers"
            :selected="label"
            @setValue="(value) => $store.commit('setCarrier', value)")
        Personal(
            :personal="personal"
            @setOption="(value) => $store.commit('setPersonal', value)")
        List(
            v-if="personal"
            :label="'Selected Coverages (click to remove)'"
            :items="personalCoverages"
            @clearValue="(value) => $store.commit('removePersonalCoverage', value)")
        Dropdown(
            v-if="personal"
            :label="'Personal Coverages (Select up to 5)'"
            :options="$store.state.options.personal"
            :selected="label"
            @setValue="(value) => $store.commit('setPersonalCoverage', value)")
        Commercial(
            :commercial="commercial"
            @setOption="(value) => $store.commit('setCommercial', value)")
        List(
            v-if="commercial"
            :label="'Selected Coverages (click to remove)'"
            :items="commercialCoverages"
            @clearValue="(value) => $store.commit('removeCommercialCoverage', value)")
        Dropdown(
            v-if="commercial"
            :label="'Commercial Coverages (Select up to 5)'"
            :options="$store.state.options.commercial"
            :selected="label"
            @setValue="(value) => $store.commit('setCommercialCoverage', value)")
        Benefit(
            :benefit="benefit"
            @setOption="(value) => $store.commit('setBenefit', value)")
        List(
            v-if="benefit"
            :label="'Selected Coverages (click to remove)'"
            :items="benefitCoverages"
            @clearValue="(value) => $store.commit('removeBenefitCoverage', value)")
        Dropdown(
            v-if="benefit"
            :label="'Benefit Coverages (Select up to 5)'"
            :options="$store.state.options.benefit"
            :selected="label"
            @setValue="(value) => $store.commit('setBenefitCoverage', value)")
        Crop(
            :crop="crop"
            @setOption="setCrop($event)")
        List(
            v-if="crop == 'TEMP'"
            :label="'Selected Coverages (click to remove)'"
            :items="cropCoverages"
            @clearValue="(value) => $store.commit('removeCropCoverage', value)")
        Dropdown(
            v-if="crop == 'TEMP'"
            :label="'Crop Coverages (Select up to 5)'"
            :options="$store.state.options.crop"
            :selected="label"
            @setValue="(value) => $store.commit('setCropCoverage', value)")
        List(
            v-if="commercial"
            :label="'Selected Industries (click to remove)'"
            :items="currentIndustries"
            @clearValue="(value) => $store.commit('removeCurrentIndustry', value)")
        Dropdown(
            v-if="commercial"
            :label="'Current industries for marketing (Select up to 5)'"
            :options="$store.state.options.industries"
            :selected="label"
            @setValue="(value) => $store.commit('setCurrentIndustry', value)")
        List(
            v-if="commercial"
            :label="'Selected Industries (click to remove)'"
            :items="targetIndustries"
            @clearValue="(value) => $store.commit('removeTargetIndustry', value)")
        Dropdown(
            v-if="commercial"
            :label="'Target industries for marketing (Select up to 5)'"
            :options="$store.state.options.industries"
            :selected="label"
            @setValue="(value) => $store.commit('setTargetIndustry', value)")
        Ratio(
            v-if="personal && commercial"
            :commercialMix="commercialMix"
            :commercialMixValid="commercialMixValid"
            :personalMix="personalMix"
            :personalMixValid="personalMixValid"
            @setCommercialMix="(value) => $store.commit('setCommercialMix', value)"
            @setPersonalMix="(value) => $store.commit('setPersonalMix', value)")
        List(
            :label="'Selected Coverages (click to remove)'"
            :items="targetCoverages"
            @clearValue="(value) => $store.commit('removeTargetCoverage', value)")
        Dropdown(
            :label="'What coverages do you want to sell more of? (Select up to 5)'"
            :options="$store.state.options.coverages"
            :selected="label"
            @setValue="(value) => $store.commit('setTargetCoverage', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        h5 Click continue to select how you want to reach your followers.
        button(class="w3-button w3-margin-right w3-text-white primary"
            v-on:click="$router.push({ name: 'Location' })") Previous
        button(class="w3-button w3-margin-left w3-text-white primary"
            v-on:click="update()") Continue
        Modal(
            v-if="modal"
            :personal_coverage="modal_personal_warning"
            :commercial_coverage="modal_commercial_warning"
            @closeModal="modal = false"
            @continue="useDefaults()")
</template>

<script>
    import Personal from './Personal';
    import Commercial from './Commercial';
    import Benefit from './Benefit';
    import Crop from './Crop';
    import Ratio from './Ratio';
    import Modal from './Modal';

    export default {
        data() {
            return {
                modal: false,
                modal_content: {},
                modal_personal_warning: false,
                modal_commercial_warning: false
            }
        },
        computed: {
            carriers() {
                return this.$store.state.user.carriers;
            },
            personal() {
                return this.$store.state.transient.personal;
            },
            personalCoverages() {
                return this.$store.state.user.personal;
            },
            commercial() {
                return this.$store.state.transient.commercial;
            },
            commercialCoverages() {
                return this.$store.state.user.commercial;
            },
            benefit() {
                return this.$store.state.transient.benefit;
            },
            benefitCoverages() {
                return this.$store.state.user.benefit;
            },
            crop() {
                return this.$store.state.transient.crop;
            },
            cropCoverages() {
                return this.$store.state.user.crop;
            },
            currentIndustries() {
                return this.$store.state.user.current_industries;
            },
            targetIndustries() {
                return this.$store.state.user.target_industries;
            },
            commercialMix() {
                return this.$store.state.user.commercial_mix;
            },
            commercialMixValid() {
                return this.commercialMix != null && this.commercialMix != '';
            },
            personalMix() {
                return this.$store.state.user.personal_mix;
            },
            personalMixValid() {
                return this.personalMix != null && this.personalMix != '';
            },
            targetCoverages() {
                return this.$store.state.user.target_coverages;
            },
            label() {
                return { code: 'DE', desc:'Options' };
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            setCrop(value) {
                /*
                * Temp fix anticipating specific crop coverages later
                * Also check the conditional on the List and Dropdown
                */
                //(value) => $store.commit('setCrop', value)
                this.$store.commit('setCrop', value);
                if(value == true) {
                    this.$store.commit('setCropCoverage', this.$store.state.options.crop[0]);
                } else {
                    this.$store.commit('removeCropCoverage', 0);
                }

            },
            useDefaults() {
                if(this.modal_personal_warning) {
                    this.$store.commit('setPersonalDefaults');
                }
                if(this.modal_commercial_warning) {
                    this.$store.commit('setCommercialDefaults');
                }
                this.modal = false;
            },
            update() {
                this.validate();
                if(this.errors.length == 0) {
                    if(this.personal && !this.commercial) {
                        this.$store.commit('setPersonalMix', '100');
                        this.$store.commit('setCommercialMix', '0');
                    }
                    if(!this.personal && this.commercial) {
                        this.$store.commit('setPersonalMix', '0');
                        this.$store.commit('setCommercialMix', '100');
                    }
                    if(this.personal && this.personalCoverages.length == 0) {
                        this.modal_personal_warning = true;
                        this.modal = true;
                    } else {
                        this.modal_personal_warning = false;
                    }
                    if(this.commercial && this.commercialCoverages.length == 0) {
                        this.modal_commercial_warning = true;
                        this.modal = true;
                    } else {
                        this.modal_commercial_warning = false;
                    }
                    if(this.modal == false) {
                        this.$store.commit('serviceLoading');
                        axios.post('/coverages', this.$store.state.user).then(response => {
                            this.$store.commit('serviceFinished');
                            this.$router.push({ name: 'Recent' });
                        }).catch(error => {
                            this.$store.commit('serviceFinished');
                            this.$store.commit('setError', 'An error has occured, please contact support.');
                        });
                    }
                }

            },
            validate() {
                this.$store.commit('clearErrors');
                if(this.carriers.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 carriers.');
                }
                if(this.commercialCoverages.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 commercial coverages.');
                }
                if(this.personalCoverages.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 personal coverages.');
                }
                if(this.benefitCoverages.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 benefit coverages.');
                }
                if(this.currentIndustries.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 current industries.');
                }
                if(this.targetIndustries.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 target industries.');
                }
                if(this.targetCoverages.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 target coverages.');
                }
                if(this.targetCoverages.length == 0) {
                    this.$store.commit('setError', 'You must select a type of coverage you want to sell more of.');
                }
                if(!this.personal && !this.commercial && !this.benefit && !this.crop) {
                    this.$store.commit('setError', 'You must select at least 1 type of coverage.');
                }
                if(this.commercial && !this.commercialMixValid &&
                    this.personal && !this.personalMixValid) {
                        this.$store.commit('setError', 'You must enter how much of your business is personal or commercial.');
                }
            }
        },
        components: {
            Personal,
            Commercial,
            Benefit,
            Crop,
            Ratio,
            Modal
        }
    }
</script>
