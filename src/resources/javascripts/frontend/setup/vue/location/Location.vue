<template>
    <div>
        <ProgressBar
            v-bind:progress="72">
        </ProgressBar>
        <QuickNavigation
            v-on:route="update($event)">
        </QuickNavigation>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Where are you?</h3>
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
                <Marketing
                    v-on:setMarketing="(market) => target = market">
                </Marketing>
                <div v-show="target == 'R'">
                    <div class="w3-section"
                        v-if="properties.selected_regions.length > 0">
                        <div>Selected Regions (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                                v-for="(region, index) in properties.selected_regions"
                                v-on:click="(region) => properties.selected_regions.splice(index, 1)">
                                {{ region.desc }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing Regions (Select up to 5)'"
                            v-bind:options="regions"
                            v-on:setOption="(region) => properties.selected_regions.push(region)">
                        </Dropdown>
                    </div>
                </div>
                <div v-show="target == 'S'">
                    <div class="w3-section"
                        v-if="properties.selected_states.length > 0">
                        <div>Selected States (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                                v-for="(state, index) in properties.selected_states"
                                v-on:click="(state) => properties.selected_states.splice(index, 1)">
                                {{ state.desc }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing States (Select up to 5)'"
                            v-bind:options="states"
                            v-on:setOption="setState($event)">
                        </Dropdown>
                    </div>
                    <div class="w3-section">
                        <div class="w3-section"
                            v-if="properties.selected_counties.length > 0">
                            <div>Selected Counties (click to remove)</div>
                            <ul class="w3-ul w3-hoverable">
                                <li class="w3-section w3-show-inline-block w3-border-0 w3-padding"
                                    v-for="(counties, index) in properties.selected_counties"
                                    v-on:click="(county) => properties.selected_counties.splice(index, 1)">
                                    {{ counties.desc }} - {{ counties.state_code }}
                                    <i class="fa fa-times w3-margin-left"></i>
                                </li>
                            </ul>
                        </div>
                        <Dropdown
                            v-bind:label="'Marketing Counties (No selection is all counties)'"
                            v-bind:options="counties"
                            v-on:setOption="(county) => properties.selected_counties.push(county)">
                        </Dropdown>
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
    import Marketing from './Marketing';
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
                if(this.properties.address_1 == '') {
                    this.errors.push('You must enter an address.');
                }
                if(this.properties.city == '') {
                    this.errors.push('You must enter your city.');
                }
                if(this.properties.state == '') {
                    this.errors.push('You must enter your state.');
                }
                if(this.properties.zip == '') {
                    this.errors.push('You must enter your zip code.');
                }
                if(this.properties.selected_regions.length == 0 &&
                    (this.properties.selected_states.length == 0 && this.properties.selected_counties.length == 0) ) {
                    this.errors.push('You must enter either marketing regions or states and counties.');
                }
                if(this.properties.selected_regions.length > 5) {
                    this.errors.push('You may only select up to 5 regions.');
                }
                if(this.properties.selected_states.length > 5) {
                    this.errors.push('You may only select up to 5 states.');
                }
                if(this.properties.selected_counties.length > 5) {
                    this.errors.push('You may only select up to 5 counties.');
                }
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
            Marketing,
            Errors
        }
    }
</script>
