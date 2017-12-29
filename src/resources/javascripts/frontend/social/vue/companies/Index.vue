<template lang="pug">
    div(class="w3-padding w3-card form")
        h3 Select a LinkedIn Company
        h5 This is the company Insurance Social Media will post content to.
        Company(
            v-for="(company, index) in $store.state.company.companies"
            :key="index"
            :company="company"
            :selected="selected == company.id"
            @setCompany="(value) => $store.commit('setCompany', value)")
        h5 Chose an option to continue.
        Errors(
            v-if="errors.length"
            :errors="errors")
        button(class="w3-button w3-text-white w3-margin-right primary"
            @click="update()") Continue
        //-
            button(class="w3-button w3-text-white w3-margin-left w3-margin-right primary"
                @click="$router.push({ name: 'Create' })") Create New Page
        button(class="w3-button w3-text-white w3-margin-left primary"
            @click="$router.push({ name: 'Twitter' })") Skip
</template>

<script>
    import Company from './Company';

    export default {
        mounted() {
            this.$store.commit('serviceLoading');
            axios.get('/api/companies').then(response => {
                this.$store.commit('serviceFinished');
                this.$store.commit('setCompanies', response.data);
            });
        },
        computed: {
            selected() {
                return this.$store.state.company.id;
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
                    axios.post('/companies', this.$store.state.company).then(response => {
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
                    this.$store.commit('setError', 'You must select a company unless you want skip this step.');
                }
            }
        },
        components: {
            Company
        }
    }
</script>
