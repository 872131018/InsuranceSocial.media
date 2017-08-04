<template>
    <div>
        <ProgressBar
            v-bind:progress="67">
        </ProgressBar>
        <QuickNavigation
            v-on:route="update($event)">
        </QuickNavigation>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>What do we write?</h3>
                <h5>Please tell us about the lines you write and any industries you market to.</h5>
            </div>
            <div class="w3-panel">
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Carriers (Select all that apply)'"
                        v-bind:options="carriers"
                        v-on:setOption="(carriers) => properties.selected_carriers.push(carriers)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_carriers.length > 0">
                    <div>Selected Carriers (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(carrier, index) in properties.selected_carriers"
                            v-on:click="(carrier) => properties.selected_carriers.splice(index, 1)">
                            {{ carrier.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Commercial Lines of Coverage (Select all that apply)'"
                        v-bind:options="coverage_targets"
                        v-on:setOption="(coverage) => properties.selected_commercial_coverages.push(coverage)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_commercial_coverages.length > 0">
                    <div>Selected Coverage Lines (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(coverage, index) in properties.selected_commercial_coverages"
                            v-on:click="(coverage) => properties.selected_commercial_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Crop Coverage'"
                        v-bind:options="crop_coverages"
                        v-bind:default="properties.crop_coverages"
                        v-on:setOption="(option) => properties.selected_crop_coverages = option.code">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Personal Lines of Coverage (Select all that apply)'"
                        v-bind:options="coverage_targets"
                        v-on:setOption="(coverage) => properties.selected_personal_coverages.push(coverage)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_personal_coverages.length > 0">
                    <div>Selected Coverage Lines (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(coverage, index) in properties.selected_personal_coverages"
                            v-on:click="(coverage) => properties.selected_personal_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Benefit Lines of Coverage (Select all that apply)'"
                        v-bind:options="coverage_targets"
                        v-on:setOption="(coverage) => properties.selected_benefit_coverages.push(coverage)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_benefit_coverages.length > 0">
                    <div>Selected Coverage Lines (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(coverage, index) in properties.selected_benefit_coverages"
                            v-on:click="(coverage) => properties.selected_benefit_coverages.splice(index, 1)">
                            {{ coverage.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Current industries you market to (Select all that apply)'"
                        v-bind:options="industry_currents"
                        v-on:setOption="(industry) => properties.selected_current_industries.push(industry)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_current_industries.length > 0">
                    <div>Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(industry, index) in properties.selected_current_industries"
                            v-on:click="(industry) => properties.selected_current_industries.splice(index, 1)">
                            {{ industry.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Target industries for future marketing (Select all that apply)'"
                        v-bind:options="industry_targets"
                        v-on:setOption="(industry) => properties.selected_target_industries.push(industry)">
                    </Dropdown>
                </div>
                <div class="w3-section"
                    v-if="properties.selected_target_industries.length > 0">
                    <div> Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(industry, index) in properties.selected_target_industries"
                            v-on:click="(industry) => properties.selected_target_industries.splice(index, 1)">
                            {{ industry.desc }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Ratio
                        v-bind:commercial_mix="properties.commercial_mix"
                        v-bind:personal_mix="properties.personal_mix"
                        v-on:setRatio="setRatio($event)">
                    </Ratio>
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
        </div>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';
    import QuickNavigation from '../QuickNavigation';
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Ratio from './Ratio';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    selected_carriers: store.getState().SelectionStore.selected_carriers,
                    selected_commercial_coverages: store.getState().SelectionStore.selected_commercial_coverages,
                    selected_crop_coverages: store.getState().SelectionStore.selected_crop_coverages,
                    selected_personal_coverages: store.getState().SelectionStore.selected_personal_coverages,
                    selected_benefit_coverages: store.getState().SelectionStore.selected_benefit_coverages,
                    selected_current_industries: store.getState().SelectionStore.selected_current_industries,
                    selected_target_industries: store.getState().SelectionStore.selected_target_industries,
                    commercial_mix: store.getState().UserStore.commercial_mix,
                    personal_mix: store.getState().UserStore.personal_mix
                },
                carriers: store.getState().OptionStore.carriers,
                coverage_lines: store.getState().OptionStore.coverage_lines,
                crop_coverages: store.getState().OptionStore.crop_coverages,
                coverage_targets: store.getState().OptionStore.coverage_targets,
                industry_currents: store.getState().OptionStore.industry_currents,
                industry_targets: store.getState().OptionStore.industry_targets,
                errors: []
            }
        },
        methods: {
            setRatio(ratio) {
                this.properties.commercial_mix = ratio.commercial;
                this.properties.personal_mix = ratio.personal;
            },
            previous() {
                store.dispatch({ type: 'SET_COVERAGE', data: this.properties });
                this.$router.push({ name: 'Location' });
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
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_COVERAGE', data: response.data });
                        this.$router.push({ name: route });
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            ProgressBar,
            QuickNavigation,
            Field,
            Dropdown,
            Checkbox,
            Ratio,
            Errors
        }
    }
</script>
