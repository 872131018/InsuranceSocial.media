<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Where are we?</h3>
            <h5>Please complete this information for geographic service marketing.</h5>
        </div>
        <div class="w3-panel">
            <Field
                v-bind:label="'Business Address 1'"
                v-on:setValue="(value) => properties.address_1 = value">
            </Field>
            <Field
                v-bind:label="'Business Address 2'"
                v-on:setValue="(value) => properties.address_2 = value">
            </Field>
            <Field
                v-bind:label="'City'"
                v-on:setValue="(value) => properties.city = value">
            </Field>
            <Dropdown
                v-bind:label="'State'"
                v-bind:options="states"
                v-on:setOption="(option) => properties.state = option">
            </Dropdown>
            <Field
                v-bind:label="'Zip Code'"
                v-bind:validation="'ZIP'"
                v-on:setValue="(value) => properties.zip = value">
            </Field>
            <Dropdown
                v-bind:label="'Marketing Geography'"
                v-bind:options="targets"
                v-on:setOption="(option) => target = option">
            </Dropdown>
            <div v-if="target == 'Region'">
                <ul class="w3-ul w3-hoverable">
                    <li class="w3-section"
                        v-for="(region, index) in regions">
                        <Checkbox
                            v-bind:label="region"
                            v-bind:id="`check${ index }`"
                            v-bind:value="region"
                            v-on:setChecked="(region) => properties.marketing_regions.push(region)">
                        </Checkbox>
                    </li>
                </ul>
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
                v-on:click="update()">Continue
            </button>
        </div>
        </div>
    </div>
</template>

<script>
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    email: store.getState().UserStore.email,
                    address_1: '',
                    address_2: '',
                    city: '',
                    state: '',
                    zip: '',
                    marketing_regions: [],
                    marketing_states: [],
                    marketing_counties: []
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
            update() {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_LOCATION', data: response.data });
                        this.$router.push({ name: 'Coverage' });
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            Field,
            Dropdown,
            Checkbox,
            Errors
        }
    }
</script>
