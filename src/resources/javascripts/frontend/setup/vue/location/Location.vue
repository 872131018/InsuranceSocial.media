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
            <div v-show="target == 'Region'">
                <ul class="w3-ul w3-hoverable">
                    <Checkbox></Checkbox>
                    <li v-for="region in regions">{{ region }}</li>
                </ul>
                <Dropdown
                    v-bind:label="'Marketing Region'"
                    v-bind:options="regions"
                    v-on:setOption="(option) => properties.marketing_region = option">
                </Dropdown>
            </div>
            <div v-show="target == 'State and Counties'">
                <Dropdown
                    v-bind:label="'Marketing State'"
                    v-bind:options="states"
                    v-on:setOption="(option) => properties.marketing_state = option">
                </Dropdown>
                <Dropdown
                    v-bind:label="'Marketing County'"
                    v-bind:options="counties"
                    v-on:setOption="(option) => properties.marketing_county = option">
                </Dropdown>
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
                    marketing_region: '',
                    marketing_state: '',
                    marketing_county: ''
                },
                states: store.getState().OptionStore.states,
                targets: store.getState().OptionStore.targets,
                target: '',
                regions: store.getState().OptionStore.regions,
                counties: [
                    'asdf',
                    'asdfasdf',
                    'qerqwer',
                    'asdf',
                    'asdf',
                    'asdfasdfasdf'
                ],
                errors: []
            }
        },
        methods: {
            update() {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_LOCATION', data: response.data });
                        this.$router.push({ name: 'Select' });
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
