<template>
    <div>
        <Progress
            v-bind:progress="33">
        </Progress>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Corporate Page Preferences</h3>
                <h5>Please select your preferences for your corporate Facebook page.</h5>
            </div>
            <div class="w3-section">
                <Field
                    v-bind:label="'Preferred Page Name'"
                    v-on:setValue="(value) => properties.name = value">
                </Field>
                <div>Note: Your desired Page name may not be available. InsuranceSocial.Media will strive to get a Page name as close to your desired name as possible.</div>
            </div>
            <div class="w3-section">
                <h5>Please select an image to use as your Facebook background and profile picture. Note, you will be able to change this later.</h5>
                <Radio
                    v-bind:options="images"
                    v-on:setChecked="(image) => properties.image = image">
                </Radio>
            </div>
            <div class="w3-section">
                <h5>By clicking continue, your Facebook Page will be queued for creation. You will be charged a one-time fee of $25.  You will also receive an email within 24 hours with further instructions. Please follow these instructions to complete the set-up of your business Facebook Page.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Twitter')">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from '../Progress';
    import Field from './inputs/Field';
    import Radio from './inputs/Radio';

    export default {
        data() {
            return {
                properties: {
                    name: '',
                    image: {}
                },
                images: [
                    {'id':'1', 'name':'Apartment', 'src':'images/apartment.jpg'},
                    {'id':'2', 'name':'Cars', 'src':'images/cars.jpg'},
                    {'id':'3', 'name':'Cellphone', 'src':'images/cellphone.jpg'},
                    {'id':'4', 'name':'Compass', 'src':'images/compass.jpg'},
                    {'id':'5', 'name':'Door', 'src':'images/door.jpg'},
                    {'id':'6', 'name':'House', 'src':'images/house.jpg'},
                    {'id':'7', 'name':'Office', 'src':'images/office.jpg'},
                    {'id':'8', 'name':'Pen', 'src':'images/pen.jpg'},
                    {'id':'9', 'name':'Plan', 'src':'images/plan.jpg'},
                    {'id':'10', 'name':'Tree', 'src':'images/tree.jpg'}
                ]
            }
        },
        methods: {
            update(route) {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        //store.dispatch({ type: 'SET_TEMPLATE', data: response.data });
                        this.$router.push({ name: route });
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            Progress,
            Field,
            Radio
        }
    }
</script>
