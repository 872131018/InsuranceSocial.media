<template>
    <div>
        <ProgressBar
            v-bind:progress="84">
        </ProgressBar>
        <QuickNavigation
            v-on:route="update($event)">
        </QuickNavigation>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>What do you write?</h3>
                <h5>Please tell us about the lines of coverage you write and any industries you market to.</h5>
            </div>
            <div class="w3-panel">
                <div class="w3-section"
                    v-if="properties.selected_carriers.length > 0">
                    <div>Selected Carriers (Click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(carrier, index) in properties.selected_carriers"
                            v-on:click="(carrier) => properties.selected_carriers.splice(index, 1)">
                            {{ carrier.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Carriers (Select up to 5)'"
                        v-bind:options="carriers"
                        v-on:setOption="pushCarrier($event)">
                    </Dropdown>
                </div>
                <Personal
                    v-bind:default="hasPersonal()"
                    v-on:setOption="setPersonal($event)">
                </Personal>
                <div class="w3-section"
                    v-if="properties.selected_personal_coverages.length > 0">
                    <div>Selected Coverages (Click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(coverage, index) in properties.selected_personal_coverages"
                            v-on:click="(coverage) => properties.selected_personal_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section"
                    v-if="personal_coverage == 'Y'">
                    <Dropdown
                        v-bind:label="'Personal Coverages (Select up to 5)'"
                        v-bind:options="personal_coverage_lines"
                        v-on:setOption="pushPersonalCoverage($event)">
                    </Dropdown>
                </div>
                <Commercial
                    v-bind:default="hasCommercial()"
                    v-on:setOption="setCommercial($event)">
                </Commercial>
                <div class="w3-section"
                    v-if="properties.selected_commercial_coverages.length > 0">
                    <div>Selected Coverages (Click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(coverage, index) in properties.selected_commercial_coverages"
                            v-on:click="(coverage) => properties.selected_commercial_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section"
                    v-if="commercial_coverage == 'Y'">
                    <Dropdown
                        v-bind:label="'Commercial Coverages (Select up to 5)'"
                        v-bind:options="commercial_coverage_lines"
                        v-on:setOption="pushCommercialCoverage($event)">
                    </Dropdown>
                </div>
                <Benefit
                    v-bind:default="hasBenefit()"
                    v-on:setOption="setBenefit($event)">
                </Benefit>
                <div class="w3-section"
                    v-if="properties.selected_benefit_coverages.length > 0">
                    <div>Selected Coverages (Click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(coverage, index) in properties.selected_benefit_coverages"
                            v-on:click="(coverage) => properties.selected_benefit_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section"
                    v-if="benefit_coverage == 'Y'">
                    <Dropdown
                        v-bind:label="'Benefits (Select up to 5)'"
                        v-bind:options="benefit_coverage_lines"
                        v-on:setOption="pushBenefitCoverage($event)">
                    </Dropdown>
                </div>
                <Crop
                    v-bind:default="hasCrop()"
                    v-on:setOption="setCrop($event)">
                </Crop>
                <div class="w3-section"
                    v-if="properties.selected_current_industries.length > 0">
                    <div>Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(industry, index) in properties.selected_current_industries"
                            v-on:click="(industry) => properties.selected_current_industries.splice(index, 1)">
                            {{ industry.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section"
                    v-if="commercial_coverage == 'Y' || properties.selected_current_industries.length > 0">
                    <Dropdown
                        v-bind:label="'Current industries for marketing (Select up to 5)'"
                        v-bind:options="industry_currents"
                        v-on:setOption="pushCurrentIndustry($event)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_target_industries.length > 0">
                    <div> Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(industry, index) in properties.selected_target_industries"
                            v-on:click="(industry) => properties.selected_target_industries.splice(index, 1)">
                            {{ industry.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section"
                    v-if="commercial_coverage == 'Y' || properties.selected_target_industries.length > 0">
                    <Dropdown
                        v-bind:label="'Target industries for future marketing (Select up to 5)'"
                        v-bind:options="industry_targets"
                        v-on:setOption="pushTargetIndustry($event)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <Ratio
                        v-if="personal_coverage == 'Y' && commercial_coverage== 'Y'"
                        v-bind:commercial_mix="properties.commercial_mix"
                        v-bind:personal_mix="properties.personal_mix"
                        v-on:setRatio="setRatio($event)">
                    </Ratio>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_target_coverages.length > 0">
                    <div>Selected Target Coverages (Click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                            v-for="(coverage, index) in properties.selected_target_coverages"
                            v-on:click="(coverate) => properties.selected_target_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <div>What coverages do you want to sell more of?</div>
                    <Dropdown
                        v-bind:label="'Coverages (Select up to 5)'"
                        v-bind:options="coverages"
                        v-on:setOption="pushTargetCoverage($event)">
                    </Dropdown>
                </div>
            </div>
            <div class="w3-panel"
                v-if="errors.length">
                <Errors v-bind:errors="errors"></Errors>
            </div>
            <div class="w3-panel">
                <h5>Click continue to select how you want to reach your followers.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="previous()">Previous
                </button>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Outreach')">Continue
                </button>
            </div>
        </div>
        <Modal
            v-if="modal"
            v-bind:personal_coverage="modal_personal_warning"
            v-bind:commercial_coverage="modal_commercial_warning"
            v-on:closeModal="() => modal = false"
            v-on:continue="useDefaults()">
        </Modal>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';
    import QuickNavigation from '../QuickNavigation';
    import Field from './inputs/Field';
    import Personal from './Personal';
    import Commercial from './Commercial';
    import Benefit from './Benefit';
    import Crop from './Crop';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Ratio from './Ratio';
    import Modal from './modal/Modal';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    selected_carriers: store.getState().SelectionStore.selected_carriers,
                    selected_personal_coverages: store.getState().SelectionStore.selected_personal_coverages,
                    selected_commercial_coverages: store.getState().SelectionStore.selected_commercial_coverages,
                    selected_benefit_coverages: store.getState().SelectionStore.selected_benefit_coverages,
                    selected_crop_coverages: store.getState().SelectionStore.selected_crop_coverages,
                    selected_current_industries: store.getState().SelectionStore.selected_current_industries,
                    selected_target_industries: store.getState().SelectionStore.selected_target_industries,
                    selected_target_coverages: store.getState().SelectionStore.selected_target_coverages,
                    commercial_mix: store.getState().UserStore.commercial_mix,
                    personal_mix: store.getState().UserStore.personal_mix,
                },
                carriers: store.getState().OptionStore.carriers,
                personal_coverage_lines: store.getState().OptionStore.personal_coverage_lines,
                commercial_coverage_lines: store.getState().OptionStore.commercial_coverage_lines,
                benefit_coverage_lines: store.getState().OptionStore.benefit_coverage_lines,
                crop_coverage_lines: store.getState().OptionStore.crop_coverage_lines,
                industry_currents: store.getState().OptionStore.industry_currents,
                industry_targets: store.getState().OptionStore.industry_targets,
                personal_coverage: '',
                commercial_coverage: '',
                benefit_coverage: '',
                crop_coverage: '',
                coverages: store.getState().OptionStore.coverages,
                errors: [],
                modal: false,
                modal_content: {},
                modal_personal_warning: false,
                modal_commercial_warning: false
            }
        },
        methods: {
            pushCarrier(carrier) {
                for(let selected_carrier of this.properties.selected_carriers) {
                    if(selected_carrier.code == carrier.code) {
                        return
                    }
                }
                this.properties.selected_carriers.push(carrier);
            },
            hasPersonal() {
                if(this.properties.selected_personal_coverages.length > 0) {
                    return 'Y';
                } else {
                    return 'N';
                }
            },
            hasCommercial() {
                if(this.properties.selected_commercial_coverages.length > 0) {
                    return 'Y';
                } else {
                    return 'N';
                }
            },
            hasBenefit() {
                if(this.properties.selected_benefit_coverages.length > 0) {
                    return 'Y';
                } else {
                    return 'N';
                }
            },
            hasCrop() {
                if(this.properties.selected_crop_coverages.length > 0) {
                    return 'Y';
                } else {
                    return 'N';
                }
            },
            setPersonal(option) {
                if(option == 'N') {
                    this.properties.selected_personal_coverages = [];
                    store.dispatch({ type: 'CLEAR_PERSONAL_COVERAGE' });
                }
                this.personal_coverage = option;
            },
            setCommercial(option) {
                if(option == 'N') {
                    this.properties.selected_commercial_coverages = [];
                }
                this.commercial_coverage = option;
            },
            setBenefit(option) {
                if(option == 'N') {
                    this.properties.selected_benefit_coverages = [];
                }
                this.benefit_coverage = option;
            },
            setCrop(option) {
                if(option == 'N') {
                    this.properties.selected_crop_coverages = [];
                    store.dispatch({ type: 'CLEAR_CROP_COVERAGE' });
                } else {
                    this.properties.selected_crop_coverages.push({"code": "11016", "desc":"Yes I write Crop coverages"});
                    store.dispatch({ type: 'UPDATE_CROP_COVERAGE', data: this.properties.selected_crop_coverages });
                }
                this.crop_coverage = option;
            },
            pushPersonalCoverage(coverage) {
                for(let selected_coverage of this.properties.selected_personal_coverages) {
                    if(selected_coverage.code == coverage.code) {
                        return
                    }
                }
                this.properties.selected_personal_coverages.push(coverage);
                store.dispatch({ type: 'UPDATE_PERSONAL_COVERAGE', data: this.properties.selected_personal_coverages });
            },
            pushCommercialCoverage(coverage) {
                for(let selected_coverage of this.properties.selected_commercial_coverages) {
                    if(selected_coverage.code == coverage.code) {
                        return
                    }
                }
                this.properties.selected_commercial_coverages.push(coverage);
                store.dispatch({ type: 'UPDATE_COMMERCIAL_COVERAGE', data: this.properties.selected_commercial_coverages });
            },
            pushBenefitCoverage(coverage) {
                for(let selected_coverage of this.properties.selected_benefit_coverages) {
                    if(selected_coverage.code == coverage.code) {
                        return
                    }
                }
                this.properties.selected_benefit_coverages.push(coverage);
                store.dispatch({ type: 'UPDATE_BENEFIT_COVERAGE', data: this.properties.selected_benefit_coverages });
            },
            pushCurrentIndustry(industry) {
                for(let selected_industry of this.properties.selected_current_industries) {
                    if(selected_industry.code == industry.code) {
                        return
                    }
                }
                this.properties.selected_current_industries.push(industry);
            },
            pushTargetIndustry(industry) {
                for(let selected_industry of this.properties.selected_target_industries) {
                    if(selected_industry.code == industry.code) {
                        return
                    }
                }
                this.properties.selected_target_industries.push(industry);
            },
            pushTargetCoverage(coverage) {
                for(let selected_coverage of this.properties.selected_target_coverages) {
                    if(selected_coverage.code == coverage.code) {
                        return
                    }
                }
                this.properties.selected_target_coverages.push(coverage);
            },
            setRatio(ratio) {
                this.properties.commercial_mix = ratio.commercial;
                this.properties.personal_mix = ratio.personal;
            },
            previous() {
                store.dispatch({ type: 'SET_COVERAGE', data: this.properties });
                this.$router.push({ name: 'Location' });
            },
            useDefaults() {
                if(this.modal_personal_warning) {
                    this.properties.selected_personal_coverages.push({
                         "id":1,
                         "code":"11005",
                         "desc":"Auto Insurance - Personal"
                    });
                    this.properties.selected_personal_coverages.push({
                         "id":6,
                         "code":"11014",
                         "desc":"Condo Insurance"
                    });
                    this.properties.selected_personal_coverages.push({
                        "id":10,
                        "code":"11029",
                        "desc":"Homeowner's Insurance"
                    });
                    this.properties.selected_personal_coverages.push({
                        "id":16,
                        "code":"11043",
                        "desc":"Renters Insurance"
                    });
                }
                if(this.modal_commercial_warning) {
                    this.properties.selected_commercial_coverages.push({
                        "id":5,
                        "code":"11011",
                        "desc":"Business Owners Policy",
                    });
                    this.properties.selected_commercial_coverages.push({
                        "id":7,
                        "code":"11264",
                        "desc":"Commercial Property Insurance"
                    });
                    this.properties.selected_commercial_coverages.push({
                        "id":17,
                        "code":"11260",
                        "desc":"General Liability Insurance"
                    });
                }
                this.post('Outreach');
            },
            update(route) {
                this.errors = [];
                if(this.properties.selected_carriers.length > 5) {
                    this.errors.push('You may only select up to 5 carriers.');
                }
                if(this.properties.selected_commercial_coverages.length > 5) {
                    this.errors.push('You may only select up to 5 commercial coverages.');
                }
                if(this.properties.selected_personal_coverages.length > 5) {
                    this.errors.push('You may only select up to 5 personal coverages.');
                }
                if(this.properties.selected_benefit_coverages.length > 5) {
                    this.errors.push('You may only select up to 5 benefit coverages.');
                }
                if(this.properties.selected_current_industries.length > 5) {
                    this.errors.push('You may only select up to 5 current industries.');
                }
                if(this.properties.selected_target_industries.length > 5) {
                    this.errors.push('You may only select up to 5 target industries.');
                }
                if(this.properties.selected_target_coverages.length > 5) {
                    this.errors.push('You may only select up to 5 target coverages.');
                }
                if(this.personal_coverage == 'N' &&
                    this.commercial_coverage == 'N' &&
                    this.benefit_coverage == 'N' &&
                    this.crop_coverage == 'N') {
                        this.errors.push('You must select at least 1 type of coverage.')
                }
                if(this.properties.selected_target_coverages.length == 0) {
                    this.errors.push('You must selected a type of coverage you want to sell more of.');
                }
                if(this.properties.commercial_mix == null ||
                    this.properties.personal_mix == null) {
                        if(this.benefit_coverage == 'Y' || this.crop_coverage == 'Y') {
                            //
                        } else {
                            this.errors.push('You must enter how much of your business is personal or commercial.')
                        }
                }
                if(this.errors.length == 0) {
                    if(this.personal_coverage == 'Y' && this.properties.selected_personal_coverages.length == 0) {
                        this.modal_personal_warning = true;
                        this.modal = true;
                    } else {
                        this.modal_personal_warning = false;
                    }
                    if(this.commercial_coverage == 'Y' && this.properties.selected_commercial_coverages.length == 0) {
                        this.modal_commercial_warning = true;
                        this.modal = true;
                    } else {
                        this.modal_commercial_warning = false;
                    }
                    if(this.personal_coverage == 'Y' && this.commercial_coverage == 'N') {
                        this.properties.personal_mix = 100;
                        this.properties.commercial_mix = 0;
                    }
                    if(this.personal_coverage == 'N' && this.commercial_coverage == 'Y') {
                        this.properties.commercial_mix = 100;
                        this.properties.personal_mix = 0;
                    }
                    this.post(route);
                }
            },
            post(route) {
                axios.post(window.location, this.properties).then(response => {
                    this.$router.push({ name: route });
                }).catch(error => {
                    this.errors.push('An error has occured, please contact support.');
                });
            }
        },
        components: {
            ProgressBar,
            QuickNavigation,
            Field,
            Personal,
            Commercial,
            Benefit,
            Crop,
            Dropdown,
            Checkbox,
            Ratio,
            Modal,
            Errors
        }
    }
</script>
