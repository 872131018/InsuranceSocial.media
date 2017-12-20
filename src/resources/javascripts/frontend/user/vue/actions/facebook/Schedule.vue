<template lang="pug">
    div
        div(class="w3-card w3-content w3-padding dashboard")
            div(class="w3-padding w3-text-white primary")
                i(class="fa fa-facebook-official" style="font-size:24px")
                | Schedule a post for {{ facebookPage }}
            p You may upload a link or a photo with an optional message, or just a simple message.
            p Links must be a proper url for Facebook to accept (E.g. www.example.com, https://insurancesocial.media).
            p Facebook recommends photos smaller than 4mb for best results. Large images may be pixelated once posted.
            p Post date must be a minimum of tomorrow and a maximum of 6 months from today.
            div(class="w3-row")
                div(class="w3-half")
                    Month(
                        :value="month"
                        @setMonth="(value) => $store.commit('setMonth', value.value)")
                div(class="w3-half")
                    div(class="w3-half")
                        Field(
                            :label="'Hour'"
                            :value="hour"
                            :valid="hourValid"
                            @setValue="(value) => $store.commit('setHour', value)")
                    div(class="w3-half")
                        Field(
                            :label="'Minute'"
                            :value="minute"
                            :valid="minuteValid"
                            @setValue="(value) => $store.commit('setMinute', value)")
            div(class="w3-row")
                div(class="w3-half")
                    Field(
                        :label="'Day'"
                        :value="day"
                        :valid="dayValid"
                        @setValue="(value) => $store.commit('setDay', value)")
                div(class="w3-half")
                    Field(
                        :label="'Year'"
                        :value="year"
                        :valid="yearValid"
                        @setValue="(value) => $store.commit('setYear', value)")
            div(class="w3-row")
                div(class="w3-half")
                    Field(
                        :label="'Link'"
                        :value="link"
                        :valid="linkValid"
                        @setValue="(value) => $store.commit('setLink', value)")
                    File(
                        :label="'Upload File'"
                        :valid="fileValid"
                        @setFile="(value) => $store.commit('setFile', value)")
                div(class="w3-half")
                    Message(
                        :label="'Post Content'"
                        :value="message"
                        :valid="messageValid"
                        @setValue="(value) => $store.commit('setMessage', value)")
                    button(class="w3-button w3-text-white secondary"
                        @click="post()") Post
            Errors(
                v-if="errors.length"
                :errors="errors")
</template>

<script>
    import Month from './Month';
    export default {
        computed: {
            facebookPage() {
                return this.$store.state.recent.facebook_page;
            },
            link() {
                return this.$store.state.post.link;
            },
            linkValid() {
                return this.link != '' && this.link != null;
            },
            message() {
                return this.$store.state.post.message;
            },
            messageValid() {
                return this.message != '' && this.message != null;
            },
            file() {
                return this.$store.state.post.file;
            },
            fileValid() {
                return this.file != '' && this.file != null;
            },
            month() {
                return this.$store.state.post.month;
            },
            day() {
                return this.$store.state.post.day;
            },
            dayValid() {
                return this.day != '' && this.day != null
                && parseInt(this.day) < 31; //@TODO: ADD LOGIC FOR DATE CHECKING WITH MOMENT
            },
            year() {
                return this.$store.state.post.year;
            },
            yearValid() {
                return this.year != '' && this.year != null
                && this.year.length  == 4;
            },
            hour() {
                return this.$store.state.post.hour;
            },
            hourValid() {
                return this.hour != '' && this.hour != null
                && this.hour.length  == 2;
            },
            minute() {
                return this.$store.state.post.minute;
            },
            minuteValid() {
                return this.minute != '' && this.minute != null
                && this.minute.length  == 2;;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            post() {
                this.$store.commit('clearErrors');

                let form = new FormData();
                form.append('message', this.message);
                form.append('link', this.link);
                form.append('file', this.file);
                form.append('month', this.month);
                form.append('day', this.day);
                form.append('year', this.year);
                form.append('hour', this.hour);
                form.append('minute', this.minute);

                this.$store.commit('serviceLoading');
                axios.post('/api/facebook/schedule', form, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    this.$store.commit('serviceFinished');
                }).catch(error => {
                    this.$store.commit('serviceFinished');
                    this.$store.commit('setError', 'An error has occured, please contact support.');
                });
            }
        },
        components: {
            Month
        }
    }
</script>
