<template>
    <div>
        <ProgressBar
            v-bind:progress="44">
        </ProgressBar>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Select a Corporate Facebook Page</h3>
                <h5>This is the page Insurance Social Media will post content to.</h5>
            </div>
            <div class="w3-panel">
                <Radio
                    v-bind:options="pages"
                    v-on:setChecked="setPage($event)">
                </Radio>
            </div>
            <div class="w3-section">
                <h5>Click continue to set up your Twitter account.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Twitter')">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';
    import Radio from './inputs/Radio';

    export default {
        data() {
            return {
                properties: {
                    page_id: '',
                    page_name: '',
                    page_access_token: ''
                },
                pages: [],
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get(`${ window.base_url }/api/pages`).then(response => {
                this.pages = response.data;
            });
        },
        methods: {
            setPage(page) {
                this.properties.page_id = page.id;
                this.properties.page_name = page.name;
                this.properties.page_access_token = page.access_token;
            },
            update(route) {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        this.$router.push({ name: route });
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            ProgressBar,
            Radio
        }
    }
</script>
