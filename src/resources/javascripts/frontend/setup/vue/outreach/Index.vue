<template lang="pug">
    div
        div(class="w3-padding w3-card form")
            h3 How do we reach your customers?
            h5 Please set your preferences for the type of outreach you would like.
            div Desired engagement mix
                Radio(
                    v-for="(option, index) in $store.state.options.mixes"
                    :key="index"
                    :option="option"
                    :selected="option.code == engagementMix"
                    @setValue="(value) => $store.commit('setEngagementMix', value)")
            div Desired engagement tone
                Radio(
                    v-for="(option, index) in $store.state.options.tones"
                    :key="index"
                    :option="option"
                    :selected="option.code == engagementTone"
                    @setValue="(value) => $store.commit('setEngagementTone', value)")
            List(
                :label="'Selected Topics (click to remove)'"
                :items="specialTopics"
                @clearValue="(value) => $store.commit('removeSpecialTopic', value)")
            Dropdown(
                :label="'Special Post Topics (Select all that apply)'"
                :options="$store.state.options.topics"
                :selected="label"
                @setValue="(value) => $store.commit('setSpecialTopic', value)")
            List(
                :label="'Selected Causes (click to remove)'"
                :items="causes"
                @clearValue="(value) => $store.commit('removeCause', value)")
            Dropdown(
                :label="'Supported Causes (Select up to 5)'"
                :options="$store.state.options.causes"
                :selected="label"
                @setValue="(value) => $store.commit('setCause', value)")
            Days(
                :label="'Selected Posting Days (click to remove)'"
                :items="days"
                @clearValue="(value) => $store.commit('removeDay', value)")
            Dropdown(
                :label="dayLabel"
                :options="$store.state.options.days"
                :selected="label"
                @setValue="(value) => $store.commit('setDay', value)")
            div Times to post (all times PST)
                Radio(
                    v-for="(option, index) in $store.state.options.times"
                    :key="index"
                    :option="option"
                    :selected="option.code == timeCode"
                    @setValue="(value) => $store.commit('setTimeCode', value)")
            Errors(
                v-if="errors.length"
                :errors="errors")
            button(class="w3-button w3-text-white w3-margin-right primary"
                @click="$router.push({ name: 'Coverages' })") Previous
            button(class="w3-button w3-text-white w3-margin-left primary"
                @click="update()") Finish
</template>

<script>
    import Days from './Days';

    export default {
        computed: {
            engagementMix() {
                return this.$store.state.plan.engagement_mix;
            },
            engagementTone() {
                return this.$store.state.plan.engagement_tone;
            },
            specialTopics() {
                return this.$store.state.user.special_topics;
            },
            causes() {
                return this.$store.state.user.causes;
            },
            days() {
                let array = [];
                for(let day of this.$store.state.options.days) {
                    if(this.$store.state.plan[day.code]) {
                        array.push(day);
                    }
                }
                return array;
            },
            dayLabel() {
                let code = this.$store.state.plan.plan_code;
                switch(code) {
                    case 1:
                        return 'Days to Post (Select 3)';
                        break;
                    case 2:
                        return 'Days to Post (Select 5)';
                        break;
                    case 3:
                        return 'Days to Post (Select 7)';
                        break;
                    default:
                        return '';
                        break;
                }
            },
            timeCode() {
                return this.$store.state.plan.time_code;
            },
            label() {
                return { code: 'DE', desc:'Options' };
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
                    axios.post('/outreach', this.$store.state.plan).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.export();
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                    this.$store.commit('serviceLoading');
                    axios.post('/outreach/selections', this.$store.state.user).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.export();
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            export() {
                this.$store.commit('serviceLoading');
                axios.get('/export').then(response => {
                    delete axios.defaults.headers.common['X-Requested-With'];
                    delete axios.defaults.headers.common['X-CSRF-TOKEN'];
                    delete axios.defaults.headers.common['Authorization'];
                    axios.post(this.$store.state.transient.post, response.data).then(response => {
                        if(response.data.success) {
                            this.loading = false;
                            window.location = this.$store.state.transient.redirect;
                        } else {
                            this.$store.commit('setError', response.data.errors);
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                });
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.engagementMix) {
                    this.$store.commit('setError', 'You must select your desired engagement mix.');
                }
                if(!this.engagementTone) {
                    this.$store.commit('setError', 'You must select your desired engagement tone.');
                }
                if(this.specialTopics.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 post topics.');
                }
                if(this.causes.length > 5) {
                    this.$store.commit('setError', 'You may only select up to 5 causes.');
                }
                let code = this.$store.state.plan.plan_code;
                if(code == 1 && this.days.length != 3) {
                    this.$store.commit('setError', 'You must select 3 posting days.');
                } else if(code == 2 && this.days.length != 5) {
                    this.$store.commit('setError', 'You must select 5 posting days.');
                } else if(code == 3 && this.days.length != 7) {
                    this.$store.commit('setError', 'You must select 7 posting days.');
                }
                if(!this.timeCode) {
                    this.$store.commit('setError', 'You must select a time to post content.');
                }
            }

        },
        components: {
            Days
        }
    }
</script>
