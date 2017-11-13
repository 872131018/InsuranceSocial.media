<template lang="pug">
    div
        ProgressBar(
            :progress="33")
        div(class="w3-card w3-padding form")
            div(class="w3-panel")
                h3 Link your Facebook
            div(class="w3-section")
                div(class="w3-panel")
                    div Do you have a Facebook account? If so, please log in to Facebook in order to recieve our Facebook services.
                    div(class="w3-panel")
                        input(class="v-align" type="radio" id="facebook_yes"
                            :value="true"
                            :checked="properties.has_facebook"
                            v-model="properties.has_facebook")
                        label(for="facebook_yes")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | Yes
                        input(class="v-align" type="radio" id="facebook_no"
                            :value="false"
                            :checked="properties.has_facebook"
                            v-model="properties.has_facebook")
                        label(for="facebook_no")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | No
                div(class="w3-panel")
                    div Do you have a corporate Facebook Page?
                    div(class="w3-panel")
                        input(class="v-align" type="radio" id="page_yes"
                            :value="true"
                            :checked="properties.has_page"
                            v-model="properties.has_page")
                        label(for="page_yes")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | Yes
                        input(class="v-align" type="radio" id="page_no"
                            :value="false"
                            :checked="properties.has_page"
                            v-model="properties.has_page")
                        label(for="page_no")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | No
                div(class="w3-panel"
                    v-if="properties.has_page == false")
                    div Do you want InsuranceSocial.Media to setup a corporate Facebook Page for you?
                    div  #[em  (Note: A one-time $25 fee will apply)]
                    div(class="w3-panel")
                        input(class="v-align" type="radio" id="create_yes"
                            :value="true"
                            v-model="properties.create_facebook")
                        label(for="create_yes")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | Yes
                        input(class="v-align" type="radio" id="create_no"
                            :value="false"
                            v-model="properties.create_facebook")
                        label(for="create_no")
                            span(class="w3-show-inline-block w3-margin v-align")
                            | No
            div(class="w3-section")
                h5(class="w3-text-orange"
                    v-if="properties.has_page == false && properties.create_facebook == false") One in five page views in the United States is on Facebook! Are you sure you don’t want to make Facebook part of your social media marketing?
                h5(v-else) We look forward to working with you. Please click continue to finish setting up your account.
                button(class="w3-button w3-text-white primary"
                    v-if="properties.has_page == false && properties.create_facebook == false"
                    @click="update()") Yes, I'm sure
                button(class="w3-button w3-text-white primary"
                    v-else
                    @click="update()") Continue
</template>

<script>
    import ProgressBar from '../Progress';

    export default {
        data() {
            return {
                properties: {
                    has_facebook: true,
                    has_page: false,
                    create_facebook: true
                },
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/facebook`).then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            update() {
                if(this.properties.has_facebook) {
                    window.location = this.redirectUrl;
                } else {
                    if(this.properties.create_facebook) {
                        this.$router.push({ name: 'Create' });
                    } else {
                        this.$router.push({ name: 'Twitter' });
                    }
                }
            }
        },
        components: {
            ProgressBar
        }
    }
</script>
