<template lang="pug">
    div(class="w3-card w3-padding form")
        h3 Refer a colleague to InsuranceSocial.media?
        h5 Enter thier email and they will recieve an invitation email to join.
        p Referrals impact your ISM success score in a positive way.
        Field(
            :label="'Email of agent to refer'"
            :value="referral"
            :valid="referralValid"
            @setValue="(value) => $store.commit('setReferral', value)")
        Errors(
            v-if="errors.length"
            :errors="errors")
        h5 Please continue to fill out the geographic information for your profile.
        button(class="w3-button w3-text-white primary"
            @click="update()") Continue
</template>

<script>
    export default {
        computed: {
            referral() {
                return this.$store.state.referral.referral;
            },
            referralValid() {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.referral);
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
                    axios.post('/api/referral', this.$store.state.referral).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.$router.push({ name: 'Recent' });
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.referralValid) {
                    this.$store.commit('setError', 'You must enter an email to refer.');
                }
            }
        }
    }
</script>
