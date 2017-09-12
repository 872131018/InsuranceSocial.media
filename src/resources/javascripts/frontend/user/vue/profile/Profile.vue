<template>
    <div>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Who are you?</h3>
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
                    v-bind:label="'Phone (e.g. 555-555-1234)'"
                    v-bind:validation="'PHONE'"
                    v-bind:default="properties.phone"
                    v-on:setValue="(value) => properties.phone = value">
                </Field>
                <Dropdown
                    v-bind:label="'What is your title?'"
                    v-bind:options="titles"
                    v-bind:default="properties.title_code"
                    v-on:setOption="(option) => properties.title_code = option.code">
                </Dropdown>
                <div v-if="properties.title_code != 'OW' && properties.title_code != ''">
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
                <Field
                    v-if="properties.notify_text"
                    v-bind:label="'Cell Phone (e.g. 555-555-1234)'"
                    v-bind:validation="'PHONE'"
                    v-bind:default="properties.cell_phone"
                    v-on:setValue="(value) => properties.cell_phone = value">
                </Field>
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
                    phone: store.getState().UserStore.phone,
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
                    notify_text: store.getState().UserStore.notify_text,
                    cell_phone: store.getState().UserStore.cell_phone
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
                if(this.properties.phone == '') {
                    this.errors.push('You must enter your phone number.');
                }
                if(this.properties.title_code == '') {
                    this.errors.push('You must enter your title.');
                }
                if(this.properties.agency_name == '') {
                    this.errors.push('You must enter your agency name.');
                }
                if(this.properties.website == '') {
                    this.errors.push('You must enter your agency website.');
                }
                if(this.properties.size == '') {
                    this.errors.push('You must enter your agency size.');
                }
                if(this.properties.established == '') {
                    this.errors.push('You must enter your agency\'s founding year.');
                }
                if(this.properties.multigenerational == '') {
                    this.errors.push('You must declare if your agency is multigenerational.');
                }
                if(this.properties.notify_frequency == '') {
                    this.errors.push('You must enter how often you would like to be contact.');
                }
                if(this.properties.notify_email == '' || this.properties.notify_text == '') {
                    this.errors.push('You must select a notification method.');
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
            Field,
            Dropdown,
            Notification,
            Errors
        }
    }
</script>
