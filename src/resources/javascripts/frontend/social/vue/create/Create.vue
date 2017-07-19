<template>
    <div>
        <Progress
            v-bind:progress="33">
        </Progress>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Corporate Page Preferences</h3>
                <h5>Please select your preferences for your corporate facebook page.</h5>
            </div>
            <div class="w3-section">
                <Field
                    v-bind:label="'Preferred Page Name'"
                    v-on:setValue="(value) => properties.name = value"
                    v-on:valid="() => name_confirmed = true"
                    v-on:invalid="() => name_confirmed = false">
                </Field>
            </div>
            <div class="w3-section">
                <h5>Please select an image for your page (this can be changed later).</h5>
                <Radio
                    v-bind:options="images"
                    v-on:setChecked="(image) => properties.image = image">
                </Radio>
            </div>
            <div class="w3-section">
                <h5>We look forward to working with you. Please click continue to finish setting up your account.</h5>
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
                    {'id':'1', 'name':'montain1', 'src':'images/mountain1.jpg'},
                    {'id':'2', 'name':'montain2', 'src':'images/mountain2.jpg'},
                    {'id':'3', 'name':'montain3', 'src':'images/mountain3.jpg'},
                    {'id':'4', 'name':'montain4', 'src':'images/mountain4.jpg'}
                ]
            }
        },
        methods: {
            update(route) {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_TEMPLATE', data: response.data });
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
