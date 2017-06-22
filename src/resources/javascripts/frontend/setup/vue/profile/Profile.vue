<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Who are we?</h3>
            <h5>Please complete this information so we may provide you the best service.</h5>
        </div>
        <div class="w3-panel">
            <Name
                v-bind:label="'Full Name'"
                v-bind:value="properties.name"
                v-on:setName="(name) => { properties.name = name }">
            </Name>
            <Email
                v-bind:label="'Email'"
                v-bind:value="properties.email"
                v-on:setEmail="(email) => { properties.email = email }">
            </Email>
            <Phone
                v-on:setPhone="(phone) => { properties.phone = phone }">
            </Phone>
            <Title
                v-on:setTitle="(title) => { properties.title = title.name }">
            </Title>
            <div v-if="properties.title != 'Principle' && properties.title != ''">
                <Name
                    v-bind:label="'Principle Name'"
                    v-on:setName="(name) => { properties.principle_name = name }">
                </Name>
                <Email
                    v-bind:label="'Principle Email'"
                    v-on:setEmail="(email) => { properties.principle_email = email }">
                </Email>
            </div>
            <Name
                v-bind:label="'Organization Name'"
                v-on:setName="(name) => { properties.organization_name = name }">
            </Name>
            <Website
                v-on:setWebsite="(website) => { properties.website = website }">
            </Website>
            <Staff
                v-on:setStaff="(staff) => { properties.staff = staff.name }">
            </Staff>
            <Year
                v-on:setYear="(year) => { properties.year = year }">
            </Year>
            <Generation
                v-on:setGeneration="(generation) => { properties.generation = generation.generation }">
            </Generation>
            <Frequency
                v-on:setFrequency="(frequency) => { properties.frequency = frequency }">
            </Frequency>
            <Notification
                v-on:setEmail="(email) => { properties.notify.email = email }"
                v-on:setText="(text) => { properties.notify.text = text }">
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
    import Name from './inputs/Name';
    import Email from './inputs/Email';
    import Phone from './inputs/Phone';
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
                    website: '',
                    staff: '',
                    year: '',
                    generation: '',
                    frequency: '',
                    notify: {
                        email: true,
                        text: true
                    }
                },
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
                    console.log(this.properties)
                    store.dispatch({ type: 'SET_PROPERTIES', data: this.properties });
                    /*
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_USER', data: response.data });
                        if(response.data.discount) {
                            this.$router.push({ name: 'Corporate' });
                        } else {
                            this.$router.push({ name: 'Select' });
                        }
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                    */
                }
            }
        },
        components: {
            Name,
            Email,
            Phone,
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
