<template lang="pug">
    div
        ProgressBar(
            :progress="33")
        div(class="w3-card w3-padding form")
            h3 Link your Facebook
            p Do you have a corporate Facebook page you’d like us to post to, or do you need us to create a page for you?
            button(class="w3-button w3-margin-right w3-text-white primary"
                @click="facebookLogin()") Post to my page
            button(class="w3-button w3-margin-left w3-text-white primary"
                @click="createPage()") Create a new page
</template>

<script>
    import ProgressBar from '../Progress';

    export default {
        data() {
            return {
                redirectUrl: ''
            }
        },
        mounted() {
            axios.get('/api/facebook').then(response => {
                this.redirectUrl = response.data
            });
        },
        methods: {
            facebookLogin() {
                window.location = this.redirectUrl;
            },
            createPage() {
                this.$router.push({ name: 'Create' });
            }
        },
        components: {
            ProgressBar
        }
    }
</script>
