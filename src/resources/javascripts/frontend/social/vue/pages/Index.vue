<template lang="pug">
    div(class="w3-padding w3-card form")
        h3 Select a Corporate Facebook Page
        h5 This is the page Insurance Social Media will post content to.
        Page(
            v-for="(page, index) in $store.state.page.pages"
            :key="index"
            :page="page"
            :selected="selected == page.id"
            @setPage="(value) => $store.commit('setPage', value)")
        h5 Chose an option to continue.
        Errors(
            v-if="errors.length"
            :errors="errors")
        button(class="w3-button w3-text-white w3-margin-right primary"
            @click="update()") Continue
        button(class="w3-button w3-text-white w3-margin-left w3-margin-right primary"
            @click="$router.push({ name: 'Create' })") Create New Page
        button(class="w3-button w3-text-white w3-margin-left primary"
            @click="$router.push({ name: 'Twitter' })") Skip
</template>

<script>
    import Page from './Page';

    export default {
        mounted() {
            this.$store.commit('serviceLoading');
            axios.get('/api/pages').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setPages', response.data);
            });
        },
        computed: {
            selected() {
                return this.$store.state.page.id;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            update() {
                this.validate();
                if(this.errors.length == 0) {
                    this.$store.commit('serviceLoading');
                    axios.post('/pages', this.$store.state.page).then(response => {
                        this.$store.commit('serviceFinished');
                        this.$router.push({ name: 'Twitter' });
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.selected) {
                    this.$store.commit('setError', 'You must select a page unless you want to create a new page or skip this step.');
                }
            }
        },
        components: {
            Page
        }
    }
</script>
