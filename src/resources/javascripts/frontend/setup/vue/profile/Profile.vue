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
                v-on:setValue="(value) => properties.email = value">
            </Field>
            <Dropdown
                v-bind:label="'Title'"
                v-bind:options="titles"
                v-on:setOption="(option) => properties.title = option">
            </Dropdown>
            <div v-if="properties.title != 'Principle' && properties.title != ''">
                <Field
                    v-bind:label="'Principle Name'"
                    v-on:setValue="(value) => properties.principle_name = value">
                </Field>
                <Field
                    v-bind:label="'Principle Email'"
                    v-on:setValue="(value) => properties.principle_email = value">
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
                v-bind:label="'Staff Size'"
                v-bind:options="sizes"
                v-on:setOption="(option) => properties.staff_size = option">
            </Dropdown>
            <Field
                v-bind:label="'Founding Year'"
                v-on:setValue="(value) => properties.year_founded = value">
            </Field>
            <Dropdown
                v-bind:label="'Generation'"
                v-bind:options="generations"
                v-on:setOption="(option) => properties.multi_generation = option">
            </Dropdown>
            <Dropdown
                v-bind:label="'Frequency'"
                v-bind:options="frequencies"
                v-on:setOption="(option) => properties.notification_frequency = option">
            </Dropdown>
            <Notification
                v-on:setEmail="(email) => { properties.notify_email = email }"
                v-on:setText="(text) => { properties.notify_text = text }">
            </Notification>
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

    import Title from './inputs/Title';
    import Website from './inputs/Website';
    import Staff from './inputs/Staff';
    import Year from './inputs/Year';
    import Generation from './inputs/Generation';
    import Frequency from './inputs/Frequency';
    import Notification from './inputs/Notification';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    name: store.getState().UserStore.name,
                    email: store.getState().UserStore.email,
                    phone: '',
                    title: '',
                    principle_name: '',
                    principle_email: '',
                    organization_name: '',
                    website: '',
                    staff_size: '',
                    year_founded: '',
                    multi_generation: '',
                    notification_frequency: '',
                    notify_email: true,
                    notify_text: true
                },
                titles: [],
                sizes: [],
                frequencies: [],
                generations: [],
                errors: []
            }
        },
        methods: {
            update() {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter your full name.');
                }
                if(this.properties.email == '') {
                    this.errors.push('You must enter your full email.');
                }
                if(this.properties.phone == '') {
                    this.errors.push('You must enter your full phone.');
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
            Title,
            Website,
            Staff,
            Year,
            Generation,
            Frequency,
            Notification,
            Errors
        }
    }
</script>
