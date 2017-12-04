<template lang="pug">
    div
        div(class="w3-padding w3-card form")
            h3 Select a Corporate Facebook Page
            h5 This is the page Insurance Social Media will post content to.
            Page(
                v-for="(page, index) in pages"
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
            axios.get('/api/pages').then(response => {
                this.$store.commit('setPages', response.data);
            });
        },
        computed: {
            pages() {
                return this.$store.state.page.pages;
            },
            selected() {
                return this.$store.state.page.id;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            update() {
                this.$store.commit('clearErrors');
                axios.post('/pages', this.$store.state.page).then(response => {
                    this.$router.push({ name: 'Twitter' });
                }).catch(error => {
                    this.$store.commit('setError', 'An error has occured, please contact support.');
                });
            }
        },
        components: {
            Page
        }
    }
</script>
