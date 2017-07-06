<template>
    <div>
        <Progress
            v-bind:progress="67">
        </Progress>
        <QuickNavigation
            v-on:route="update($event)">
        </QuickNavigation>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>What do we write?</h3>
                <h5>Please evaluate what forms of insurance you deal with.</h5>
            </div>
            <div class="w3-panel">
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Carriers'"
                        v-bind:options="carriers"
                        v-on:setOption="(carriers) => properties.carriers.push(carriers)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <div> Selected Carriers (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(carrier, index) in properties.carriers"
                            v-on:click="(carrier) => properties.carriers.splice(index, 1)">
                            {{ carrier }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Lines of Coverages'"
                        v-bind:options="coverage_lines"
                        v-on:setOption="(coverage) => properties.coverage_lines.push(coverage)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <div> Selected Coverage Lines (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(coverage, index) in properties.coverage_lines"
                            v-on:click="(coverage) => properties.coverage_lines.splice(index, 1)">
                            {{ coverage }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Target Coverages'"
                        v-bind:options="coverage_targets"
                        v-on:setOption="(target) => properties.coverage_targets.push(target)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <div> Selected Coverage Targets (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(target, index) in properties.coverage_targets"
                            v-on:click="(target) => properties.coverage_targets.splice(index, 1)">
                            {{ target }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Current Industries'"
                        v-bind:options="industry_currents"
                        v-on:setOption="(industry) => properties.industry_currents.push(industry)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <div> Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(industry, index) in properties.industry_currents"
                            v-on:click="(industry) => properties.industry_currents.splice(index, 1)">
                            {{ industry }}
                            <i class="fa fa-times w3-margin-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Target Industries'"
                        v-bind:options="industry_targets"
                        v-on:setOption="(industry) => properties.industry_targets.push(industry)">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <div> Selected Industries (click to remove)</div>
                    <ul class="w3-ul w3-hoverable">
                        <li class="w3-section"
                            v-for="(industry, index) in properties.industry_targets"
                            v-on:click="(industry) => properties.industry_targets.splice(index, 1)">
                            {{ industry }}
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
                <h5>Continue to select the plan you wish to sign up for.</h5>
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
    import Progress from '../Progress';
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
                    email: store.getState().UserStore.email,
                    carriers: store.getState().UserStore.carriers,
                    coverage_lines: store.getState().UserStore.coverage_lines,
                    coverage_targets: store.getState().UserStore.coverage_targets,
                    industry_currents: store.getState().UserStore.industry_currents,
                    industry_targets: store.getState().UserStore.industry_targets,
                    commercial_mix: store.getState().UserStore.commercial_mix,
                    personal_mix: store.getState().UserStore.personal_mix
                },
                carriers: store.getState().OptionStore.carriers,
                coverage_lines: store.getState().OptionStore.coverage_lines,
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
            Progress,
            QuickNavigation,
            Field,
            Dropdown,
            Checkbox,
            Ratio,
            Errors
        }
    }
</script>
