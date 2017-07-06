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
                <h3>Where are we?</h3>
                <h5>Please complete this information for geographic service marketing.</h5>
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
                    v-on:setOption="(option) => properties.state = option">
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
                <div v-if="target == 'Region'">
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing Regions'"
                            v-bind:options="regions"
                            v-on:setOption="(region) => properties.marketing_regions.push(region)">
                        </Dropdown>
                    </div>
                    <div class="w3-section">
                        <div> Selected Counties (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(region, index) in properties.marketing_regions"
                                v-on:click="(region) => properties.marketing_regions.splice(index, 1)">
                                {{ region }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="target == 'State and Counties'">
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing State'"
                            v-bind:options="states"
                            v-on:setOption="setState($event)">
                        </Dropdown>
                    </div>
                    <div class="w3-section">
                        <div> Selected States (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(state, index) in properties.marketing_states"
                                v-on:click="(state) => properties.marketing_states.splice(index, 1)">
                                {{ state }}
                                <i class="fa fa-times w3-margin-left"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="w3-section">
                        <Dropdown
                            v-bind:label="'Marketing Counties'"
                            v-bind:options="counties"
                            v-on:setOption="(county) => properties.marketing_counties.push(county)">
                        </Dropdown>
                    </div>
                    <div class="w3-section">
                        <div> Selected Counties (click to remove)</div>
                        <ul class="w3-ul w3-hoverable">
                            <li class="w3-section"
                                v-for="(counties, index) in properties.marketing_counties"
                                v-on:click="(county) => properties.marketing_counties.splice(index, 1)">
                                {{ counties }}
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
                <h5>Continue to select the plan you wish to sign up for.</h5>
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
    import Progress from '../Progress';
    import QuickNavigation from '../QuickNavigation';
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    email: store.getState().UserStore.email,
                    address_1: store.getState().UserStore.address_1,
                    address_2: store.getState().UserStore.address_2,
                    city: store.getState().UserStore.city,
                    state: store.getState().UserStore.state,
                    zip: store.getState().UserStore.zip,
                    marketing_regions: store.getState().UserStore.marketing_regions,
                    marketing_states: store.getState().UserStore.marketing_states,
                    marketing_counties: store.getState().UserStore.marketing_counties
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
                this.properties.marketing_states.push(state);
                let filtered_counties = [];
                for(let filter of this.properties.marketing_states) {
                    let abbr = filter.slice(0, 2);
                    for(let county of store.getState().OptionStore.counties) {
                        if(county.search(abbr) != -1) {
                            filtered_counties.push(county);
                        }
                    }
                }
                this.counties = filtered_counties;
            },
            previous() {
                store.dispatch({ type: 'SET_LOCATION', data: this.properties });
                this.$router.push({ name: 'Profile' });
            },
            update(route) {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_LOCATION', data: response.data });
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
            Errors
        }
    }
</script>
