<template>
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
                v-bind:label="'Phone'"
                v-bind:validation="'PHONE'"
                v-on:setValue="(value) => properties.phone = value">
            </Field>
            <Dropdown
                v-bind:label="'What is your title?'"
                v-bind:options="titles"
                v-on:setOption="(option) => properties.title = option">
            </Dropdown>
            <div v-if="properties.title != 'Principal' && properties.title != ''">
                <Field
                    v-bind:label="'Principal Name'"
                    v-on:setValue="(value) => properties.principal_name = value">
                </Field>
                <Field
                    v-bind:label="'Principal Email'"
                    v-bind:validation="'EMAIL'"
                    v-on:setValue="(value) => properties.principal_email = value">
                </Field>
            </div>
            <Field
                v-bind:label="'Organizaiton Name'"
                v-on:setValue="(value) => properties.organization_name = value">
            </Field>
            <Field
                v-bind:label="'Website'"
                v-on:setValue="(value) => properties.website = value">
            </Field>
            <Dropdown
                v-bind:label="'What is the size of your staff?'"
                v-bind:options="sizes"
                v-on:setOption="(option) => properties.staff_size = option">
            </Dropdown>
            <Field
                v-bind:label="'Founding Year'"
                v-bind:validation="'YEAR'"
                v-on:setValue="(value) => properties.year_founded = value">
            </Field>
            <div class="w3-section">
                <Dropdown
                    v-bind:label="'Is this a multigenerational company?'"
                    v-bind:options="generations"
                    v-on:setOption="(option) => properties.multi_generation = option">
                </Dropdown>
            </div>
            <div class="w3-section">
                <Dropdown
                    v-bind:label="'How often would you like to be notified?'"
                    v-bind:options="frequencies"
                    v-on:setOption="(option) => properties.notification_frequency = option">
                </Dropdown>
            </div>
            <Notification
                v-on:setChecked="(method) => properties.notify_method.push(method)">
            </Notification>
        </div>
        <div class="w3-panel"
            v-if="errors.length">
            <Errors v-bind:errors="errors"></Errors>
        </div>
        <div class="w3-panel">
            <h5>Please continue to fill out the geographic information for your profile.</h5>
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
    import Notification from './Notification';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: store.getState().UserStore.name,
                    email: store.getState().UserStore.email,
                    phone: '',
                    title: '',
                    principal_name: '',
                    principal_email: '',
                    organization_name: '',
                    website: '',
                    staff_size: '',
                    year_founded: '',
                    multi_generation: '',
                    notification_frequency: '',
                    notify_method: [],
                },
                titles: store.getState().OptionStore.titles,
                sizes: store.getState().OptionStore.sizes,
                generations: store.getState().OptionStore.generations,
                frequencies: store.getState().OptionStore.frequencies,
                errors: []
            }
        },
        methods: {
            update() {
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.properties.email == '') {
                    this.errors.push('You must enter your email.');
                }
                if(this.properties.phone == '') {
                    this.errors.push('You must enter your phone.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_PROPERTIES', data: response.data });
                        this.$router.push({ name: 'Location' });
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
