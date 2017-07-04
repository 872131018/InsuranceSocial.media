<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>How do we reach our customers?</h3>
            <h5>Please set your preferences for the type of outreach you would like.</h5>
        </div>
        <div class="w3-panel">
            <div>Desired engagement mix</div>
            <Radio
                v-bind:options="engagement_mix"
                v-bind:default="properties.engagement_mix"
                v-on:setChecked="(option) => properties.engagement_mix = option">
            </Radio>
        </div>
        <div class="w3-panel">
            <div>Desired engagement tone</div>
            <Radio
                v-bind:options="engagement_tone"
                v-bind:default="properties.engagement_tone"
                v-on:setChecked="(option) => properties.engagement_tone = option">
            </Radio>
        </div>
        <div class="w3-panel">
            <div>Special Post Topics</div>
            <ul class="w3-ul w3-hoverable">
                <li class="w3-section"
                    v-for="(topic, index) in special_topics">
                    <Checkbox
                        v-bind:label="topic"
                        v-bind:id="`check${ index }`"
                        v-bind:value="topic"
                        v-on:setChecked="(topic) => properties.special_topics.push(topic)">
                    </Checkbox>
                </li>
            </ul>
        </div>
        <div class="w3-panel">
            <Dropdown
                v-bind:label="'Supported Causes'"
                v-bind:options="causes"
                v-on:setOption="(cause) => properties.causes.push(cause)">
            </Dropdown>
        </div>
        <div class="w3-panel">
            <div> Selected Causes (click to remove)</div>
            <ul class="w3-ul w3-hoverable">
                <li class="w3-section"
                    v-for="(cause, index) in properties.causes"
                    v-on:click="(cause) => properties.causes.splice(index, 1)">
                    {{ cause }}
                    <i class="fa fa-times w3-margin-left"></i>
                </li>
            </ul>
        </div>
        <div class="w3-panel">
            <Dropdown
                v-bind:label="'Days to Post'"
                v-bind:options="days"
                v-on:setOption="(day) => properties.posting_days.push(day)">
            </Dropdown>
        </div>
        <div class="w3-panel">
            <div> Selected Posting Days (click to remove)</div>
            <ul class="w3-ul w3-hoverable">
                <li class="w3-section"
                    v-for="(day, index) in properties.posting_days"
                    v-on:click="(day) => properties.posting_days.splice(index, 1)">
                    {{ day }}
                    <i class="fa fa-times w3-margin-left"></i>
                </li>
            </ul>
        </div>
        <div class="w3-panel">
            <div>Times to post</div>
            <Radio
                v-bind:options="times"
                v-on:setChecked="(option) => properties.posting_time = option">
            </Radio>
        </div>
        <div class="w3-panel"
            v-if="errors.length">
            <Errors v-bind:errors="errors"></Errors>
        </div>
        <div class="w3-panel">
            <h5>Continue to select the plan you wish to sign up for.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="previous()">Previous
            </button>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Continue
            </button>
        </div>
        </div>
    </div>
</template>

<script>
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Radio from './inputs/Radio';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    email: store.getState().UserStore.email,
                    engagement_mix: store.getState().UserStore.engagement_mix,
                    engagement_tone: store.getState().UserStore.engagement_tone,
                    special_topics: [],
                    causes: [],
                    posting_days: [],
                    posting_time: ''
                },
                engagement_mix: store.getState().OptionStore.engagement_mix,
                engagement_tone: store.getState().OptionStore.engagement_tone,
                special_topics: store.getState().OptionStore.special_topics,
                causes: store.getState().OptionStore.causes,
                days: store.getState().OptionStore.days,
                times: store.getState().OptionStore.times,
                errors: []
            }
        },
        methods: {
            previous() {
                store.dispatch({ type: 'SET_OUTREACH', data: this.properties });
                this.$router.push({ name: 'Coverage' });
            },
            update() {
                this.errors = [];
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        store.dispatch({ type: 'SET_OUTREACH', data: response.data });
                        alert(`success! info saved in database ${ store.getState().UserStore }`)
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            Field,
            Dropdown,
            Checkbox,
            Radio,
            Errors
        }
    }
</script>
