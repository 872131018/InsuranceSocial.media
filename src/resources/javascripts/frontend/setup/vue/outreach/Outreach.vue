<template>
    <div>
        <ProgressBar
            v-bind:progress="96">
        </ProgressBar>
        <QuickNavigation
            v-on:route="update($event)">
        </QuickNavigation>
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
                <Dropdown
                    v-bind:label="'Special Post Topics (Select all that apply)'"
                    v-bind:options="special_topics"
                    v-on:setOption="(topic) => properties.selected_special_topics.push(topic)">
                </Dropdown>
            </div>
            <div class="w3-panel"
                v-if="properties.selected_special_topics.length > 0">
                <div>Selected Topics (click to remove)</div>
                <ul class="w3-ul w3-hoverable">
                    <li class="w3-section"
                        v-for="(topic, index) in properties.selected_special_topics"
                        v-on:click="(topic) => properties.selected_special_topics.splice(index, 1)">
                        {{ topic.desc }}
                        <i class="fa fa-times w3-margin-left"></i>
                    </li>
                </ul>
            </div>
            <div class="w3-panel">
                <Dropdown
                    v-bind:label="'Supported Causes (Select all that apply)'"
                    v-bind:options="causes"
                    v-on:setOption="(cause) => properties.selected_causes.push(cause)">
                </Dropdown>
            </div>
            <div class="w3-panel"
                v-if="properties.selected_causes.length > 0">
                <div>Selected Causes (click to remove)</div>
                <ul class="w3-ul w3-hoverable">
                    <li class="w3-section"
                        v-for="(cause, index) in properties.selected_causes"
                        v-on:click="(cause) => properties.selected_causes.splice(index, 1)">
                        {{ cause.desc }}
                        <i class="fa fa-times w3-margin-left"></i>
                    </li>
                </ul>
            </div>
            <div class="w3-panel">
                <Dropdown
                    v-bind:label="day_label"
                    v-bind:options="days"
                    v-on:setOption="(day) => properties.posting_days.push(day)">
                </Dropdown>
            </div>
            <div class="w3-panel"
                v-if="properties.posting_days.length > 0">
                <div>Selected Posting Days (click to remove)</div>
                <ul class="w3-ul w3-hoverable">
                    <li class="w3-section"
                        v-for="(day, index) in properties.posting_days"
                        v-on:click="(day) => properties.posting_days.splice(index, 1)">
                        {{ day.desc }}
                        <i class="fa fa-times w3-margin-left"></i>
                    </li>
                </ul>
            </div>
            <div class="w3-panel">
                <div>Times to post (all times PST)</div>
                <Radio
                    v-bind:options="times"
                    v-bind:default="properties.time_code"
                    v-on:setChecked="(option) => properties.time_code = option">
                </Radio>
            </div>
            <div class="w3-panel"
                v-if="errors.length">
                <Errors v-bind:errors="errors"></Errors>
            </div>
            <div class="w3-panel">
                <h5>TODO convert to popup!  Congratulations! You have completed your profile. Click continue to go to your dashboard.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="previous()">Previous
                </button>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update('Done')">Finish
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';
    import QuickNavigation from '../QuickNavigation';
    import Field from './inputs/Field';
    import Dropdown from './inputs/Dropdown';
    import Checkbox from './inputs/Checkbox';
    import Radio from './inputs/Radio';
    import Errors from './Errors';

    export default {
        data() {
            return {
                properties: {
                    engagement_mix: store.getState().PlanStore.engagement_mix,
                    engagement_tone: store.getState().PlanStore.engagement_tone,
                    selected_special_topics: store.getState().SelectionStore.selected_special_topics,
                    selected_causes: store.getState().SelectionStore.selected_causes,
                    posting_days: this.getDays(),
                    time_code: store.getState().PlanStore.time_code
                },
                engagement_mix: store.getState().OptionStore.engagement_mix,
                engagement_tone: store.getState().OptionStore.engagement_tone,
                special_topics: store.getState().OptionStore.special_topics,
                causes: store.getState().OptionStore.causes,
                day_label: this.getLabel(),
                days: store.getState().OptionStore.days,
                times: store.getState().OptionStore.times,
                errors: []
            }
        },
        methods: {
            getLabel() {
                if(store.getState().PlanStore.plan_code == 1) {
                    return 'Days to Post (Select 3)';
                } else {
                    return 'Days to Post (Select 5)';
                }
            },
            getDays() {
                let days = store.getState().OptionStore.days;
                let selected_days = [];
                for(let day of days) {
                    if(store.getState().PlanStore[day.code]) {
                        selected_days.push(day)
                    }
                }
                return selected_days;
            },
            previous() {
                store.dispatch({ type: 'SET_OUTREACH', data: this.properties });
                this.$router.push({ name: 'Coverage' });
            },
            update(route) {
                this.errors = [];
                if(this.properties.selected_special_topics.length > 5) {
                    this.errors.push('You may only select up to 5  post topics.');
                }
                if(this.properties.selected_causes.length > 5) {
                    this.errors.push('You may only select up to 5 causes.');
                }
                if(store.getState().PlanStore.plan_code == 1 && this.properties.posting_days.length > 3) {
                    this.errors.push('You may only select up to 3 posting days.');
                } else if(store.getState().PlanStore.plan_code > 1 && this.properties.posting_days.length > 5) {
                    this.errors.push('You may only select up to 5 posting days.');
                }
                if(this.errors.length == 0) {
                    axios.post(window.location, this.properties).then(response => {
                        if(route == 'Done') {
                            window.location = `${ window.base_url }/file`;
                        } else {
                            this.$router.push({ name: route });
                        }
                    }).catch(error => {
                        this.errors.push('An error has occured, please contact support.');
                    });
                }
            }
        },
        components: {
            ProgressBar,
            QuickNavigation,
            Field,
            Dropdown,
            Checkbox,
            Radio,
            Errors
        }
    }
</script>
