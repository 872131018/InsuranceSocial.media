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
                <h3>Where are we?</h3>
                <h5>Please complete this information to receive content pertaining to your marketing areas.</h5>
            </div>
            <div class="w3-panel">
                <Field
                    v-bind:label="'Business Address 1'"
                    v-bind:default="properties.address_1"
                    v-on:setValue="(value) => properties.address_1 = value">
                </Field>
                <Field
                    v-bind:label="'Business Address 2'"
                    v-bind:default="properties.address_2"
                    v-on:setValue="(value) => properties.address_2 = value">
                </Field>
                <Field
                    v-bind:label="'City'"
                    v-bind:default="properties.city"
                    v-on:setValue="(value) => properties.city = value">
                </Field>
                <Dropdown
                    v-bind:label="'State'"
                    v-bind:options="states"
                    v-bind:default="properties.state"
                    v-on:setOption="(option) => properties.state = option.code">
                </Dropdown>
                <Field
                    v-bind:label="'Zip Code'"
                    v-bind:validation="'ZIP'"
                    v-bind:default="properties.zip"
                    v-on:setValue="(value) => properties.zip = value">
                </Field>
                <Dropdown
                    v-bind:label="'Marketing Geography'"
                    v-bind:options="targets"
                    v-on:setOption="(option) => target = option">
                </Dropdown>
                <div v-if="target.code == 'R'">
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing Regions (Select all that apply)'"
                            v-bind:options="regions"
                            v-on:setOption="(region) => properties.selected_regions.push(region)">
                        </Dropdown>
                    </div>
                    <div class="w3-section"
                        v-if="properties.selected_regions.length > 0">
                        <div>Selected Regions (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(region, index) in properties.selected_regions"
                                v-on:click="(region) => properties.selected_regions.splice(index, 1)">
                                {{ region.desc }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="target.code == 'S'">
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing States (Select all that apply)'"
                            v-bind:options="states"
                            v-on:setOption="setState($event)">
                        </Dropdown>
                    </div>
                    <div class="w3-section"
                        v-if="properties.selected_states.length > 0">
                        <div>Selected States (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(state, index) in properties.selected_states"
                                v-on:click="(state) => properties.selected_states.splice(index, 1)">
                                {{ state.desc }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing Counties (Select all that apply)'"
                            v-bind:options="counties"
                            v-on:setOption="(county) => properties.selected_counties.push(county)">
                        </Dropdown>
                    </div>
                    <div class="w3-section"
                        v-if="properties.selected_counties.length > 0">
                        <div>Selected Counties (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(counties, index) in properties.selected_counties"
                                v-on:click="(county) => properties.selected_counties.splice(index, 1)">
                                {{ counties.desc }} - {{ counties.state_code }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w3-panel"
                v-if="errors.length">
                <Errors v-bind:errors="errors"></Errors>
            </div>
            <div class="w3-panel">
                <h5>Click continue to select the coverages you wish to write.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="previous()">Previous
                </button>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Coverage')">Continue
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
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    address_1: store.getState().AgencyStore.address_1,
                    address_2: store.getState().AgencyStore.address_2,
                    city: store.getState().AgencyStore.city,
                    state: store.getState().AgencyStore.state,
                    zip: store.getState().AgencyStore.zip,
                    selected_regions: store.getState().SelectionStore.selected_regions,
                    selected_states: store.getState().SelectionStore.selected_states,
                    selected_counties: store.getState().SelectionStore.selected_counties
                },
                states: store.getState().OptionStore.states,
                targets: store.getState().OptionStore.targets,
                target: '',
                regions: store.getState().OptionStore.regions,
                counties: store.getState().OptionStore.counties,
                errors: []
            }
        },
        methods: {
            setState(state) {
                this.properties.selected_states.push(state);
                let filtered_counties = [];
                for(let filter of this.properties.selected_states) {
                    let state_code = filter.state_code;
                    for(let county of store.getState().OptionStore.counties) {
                        if(county.state_code == state_code) {
                            filtered_counties.push(county);
                        }
                    }
                }
                this.counties = filtered_counties;
            },
            previous() {
                store.dispatch({ type: 'SET_AGENCY', data: this.properties });
                this.$router.push({ name: 'Profile' });
            },
            update(route) {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_USER', data: response.data.user });
                        store.dispatch({ type: 'SET_AGENCY', data: response.data.agency });
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
            Errors
        }
    }
</script>
