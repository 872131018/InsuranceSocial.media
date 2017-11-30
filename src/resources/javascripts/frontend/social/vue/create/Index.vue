<template lang="pug">
    div
        ProgressBar(
            :progress="44")
        div(class="w3-padding w3-card form")
            h3 Corporate Page Preferences
            h5 Please select your preferences for your corporate Facebook page.
            Field(
                :label="'Preferred Page Name'"
                :value="name"
                :valid="nameValid"
                @setValue="(value) => $store.commit('setName', value)")
            p Note: Your desired Page name may not be available. InsuranceSocial.Media will strive to get a Page name as close to your desired name as possible.
            h5 Please select an image to use as your Facebook background and profile picture. Note, you will be able to change this later.
            ImageOption(
                v-for="(image, index) in images"
                :key="index"
                :image="image"
                :selected="selected == image.name"
                @setValue="(value) => $store.commit('setImage', value)")
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
    import ImageOption from './Image';

    export default {
        data() {
            return {
                warning: false
            }
        },
        computed: {
            name() {
                return this.$store.state.create.name;
            },
            nameValid() {
                return this.$store.state.create.name != '';
            },
            selected() {
                return this.$store.state.create.image;
            },
            images() {
                return this.$store.state.create.images;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            update(route) {
                this.validate();
                if(this.errors.length == 0) {
                    axios.post(window.location, this.$store.state.create).then(response => {
                        this.$router.push({ name: route });
                    }).catch(error => {
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(this.name == '') {
                    this.$store.commit('setError', 'You must enter a name for your page.');
                }
                if(this.selected == '') {
                    this.$store.commit('setError', 'You must select an image for your page.');
                }
            }
        },
        components: {
            ImageOption
        }
    }
</script>
