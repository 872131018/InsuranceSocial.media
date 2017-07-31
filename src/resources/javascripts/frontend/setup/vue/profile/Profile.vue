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
                <h3>Who are we?</h3>
                <h5>Please complete this information so we may provide you the best service.</h5>
            </div>
            <div class="w3-panel">
                <Field
                    v-bind:label="'Full Name'"
                    v-bind:default="properties.name"
                    v-on:setValue="(value) => properties.name = value">
                </Field>
                <Field
                    v-bind:label="'Email'"
                    v-bind:validation="'EMAIL'"
                    v-bind:default="properties.email"
                    v-on:setValue="(value) => properties.email = value">
                </Field>
                <Field
                    v-bind:label="'Cell Phone (e.g. 555-555-1234)'"
                    v-bind:validation="'PHONE'"
                    v-bind:default="properties.cell_phone"
                    v-on:setValue="(value) => properties.cell_phone = value">
                </Field>
                <Dropdown
                    v-bind:label="'What is your title?'"
                    v-bind:options="titles"
                    v-bind:default="properties.title_code"
                    v-on:setOption="(option) => properties.title_code = option.code">
                </Dropdown>
                <div v-if="properties.title_code != 'PR' && properties.title_code != ''">
                    <Field
                        v-bind:label="'Principal Name'"
                        v-bind:default="properties.principal_name"
                        v-on:setValue="(value) => properties.principal_name = value">
                    </Field>
                    <Field
                        v-bind:label="'Principal Email'"
                        v-bind:validation="'EMAIL'"
                        v-bind:default="properties.principal_email"
                        v-on:setValue="(value) => properties.principal_email = value">
                    </Field>
                </div>
                <Field
                    v-bind:label="'Organization Name'"
                    v-bind:default="properties.agency_name"
                    v-on:setValue="(value) => properties.agency_name = value">
                </Field>
                <Field
                    v-bind:label="'Website'"
                    v-bind:default="properties.website"
                    v-on:setValue="(value) => properties.website = value">
                </Field>
                <Dropdown
                    v-bind:label="'What is the size of your staff?'"
                    v-bind:options="sizes"
                    v-bind:default="properties.size"
                    v-on:setOption="(option) => properties.size = option.code">
                </Dropdown>
                <Field
                    v-bind:label="'Founding Year (e.g. 19XX)'"
                    v-bind:validation="'YEAR'"
                    v-bind:default="properties.established"
                    v-on:setValue="(value) => properties.established = value">
                </Field>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'Is this a multigenerational company?'"
                        v-bind:options="generations"
                        v-bind:default="properties.multigenerational"
                        v-on:setOption="(option) => properties.multigenerational = option.code">
                    </Dropdown>
                </div>
                <div class="w3-section">
                    <Dropdown
                        v-bind:label="'How often would you like us to communicate with you?'"
                        v-bind:options="frequencies"
                        v-bind:default="properties.notify_frequency"
                        v-on:setOption="(option) => properties.notify_frequency = option.code">
                    </Dropdown>
                </div>
                <Notification
                    v-bind:notify_email="properties.notify_email"
                    v-bind:notify_text="properties.notify_text"
                    v-on:setEmail="(email) => properties.notify_email = email"
                    v-on:setText="(text) => properties.notify_text = text">
                </Notification>
            </div>
            <div class="w3-panel"
                v-if="errors.length">
                <Errors v-bind:errors="errors"></Errors>
            </div>
            <div class="w3-panel">
                <h5>Please continue to fill out the geographic information for your profile.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Location')">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from '../Progress';
    import QuickNavigation from '../QuickNavigation';
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Notification from './Notification';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: store.getState().UserStore.name,
                    email: store.getState().UserStore.email,
                    cell_phone: store.getState().UserStore.cell_phone,
                    title_code: store.getState().UserStore.title_code,
                    principal_name: store.getState().AgencyStore.principal_name,
                    principal_email: store.getState().AgencyStore.principal_email,
                    agency_name: store.getState().AgencyStore.name,
                    website: store.getState().AgencyStore.website,
                    size: store.getState().AgencyStore.size,
                    established: store.getState().AgencyStore.established,
                    multigenerational: store.getState().AgencyStore.multigenerational,
                    notify_frequency: store.getState().UserStore.notify_frequency,
                    notify_email: store.getState().UserStore.notify_email,
                    notify_text: store.getState().UserStore.notify_text
                },
                titles: store.getState().OptionStore.titles,
                sizes: store.getState().OptionStore.sizes,
                generations: store.getState().OptionStore.generations,
                frequencies: store.getState().OptionStore.frequencies,
                errors: []
            }
        },
        methods: {
            update(route) {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.properties.email == '') {
                    this.errors.push('You must enter your email.');
                }
                if(this.properties.cell_phone == '') {
                    this.errors.push('You must enter your cell phone.');
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
            Progress,
            QuickNavigation,
            Field,
            Dropdown,
            Notification,
            Errors
        }
    }
</script>
