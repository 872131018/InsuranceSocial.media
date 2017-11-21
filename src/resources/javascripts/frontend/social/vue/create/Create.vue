<template lang="pug">
    div
        ProgressBar(
            v-bind:progress="44")
        div(class="w3-padding w3-card form")
            h3 Corporate Page Preferences
            h5 Please select your preferences for your corporate Facebook page.
            Field(
                :label="'Preferred Page Name'"
                :setValue="(value) => properties.name = value")
            p Note: Your desired Page name may not be available. InsuranceSocial.Media will strive to get a Page name as close to your desired name as possible.
            h5 Please select an image to use as your Facebook background and profile picture. Note, you will be able to change this later.
            Radio(
                :options="images"
                :setChecked="(image) => properties.image = image")
            h5 I need InsuranceSocial.Media to create a new Facebook page for me. I approve the $25 Facebook page creation fee.  You will receive an email within 24 hours with further instructions. Please follow these instructions to complete the set-up of your business Facebook Page.
            Errors(
                v-if="errors.length"
                :errors="errors")
            button(class="w3-button w3-margin-right w3-text-white primary"
                @click="update('Twitter')") Continue
            button(class="w3-button w3-margin-left w3-text-white primary"
                @click="warning = true") I don't want to post to Facebook.
            div(
                v-if="warning")
                h6(class="w3-text-red") One in five page views in the United States is on Facebook! Are you sure you don’t want to make Facebook part of your social media marketing?
                button(class="w3-button w3-text-white primary"
                    @click="$router.push({ name: 'Twitter' })") Yes, I'm sure
</template>

<script>
    import ProgressBar from '../Progress';
    import Field from './inputs/Field';
    import Radio from './inputs/Radio';
    import Errors from './Errors';

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
                ],
                redirectUrl: '',
                warning: false,
                errors: []
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/facebook`).then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            update(route) {
                this.errors = [];
                if(this.properties.name == '') {
                    this.errors.push('You must enter a name for your page.');
                }
                if(!this.properties.image.id) {
                    this.errors.push('You must select an image for your page.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_TEMPLATE', data: response.data });
                        this.$router.push({ name: route });
                        //window.location = this.redirectUrl;
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            ProgressBar,
            Field,
            Radio,
            Errors
        }
    }
</script>
