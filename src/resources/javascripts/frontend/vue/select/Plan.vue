<template>
    <div class="w3-section">
        <div v-if="plan.name != 'Enterprise Plan'">
            <input class="v-align" type="radio"
                v-bind:id="getId(plan.name)"
                v-bind:checked="selected"
                v-on:change="$emit('setPlan', plan)">
            <label class="v-align check-box"
                v-bind:for="getId(plan.name)">
            </label>
            <span class="w3-large w3-margin-left">{{ plan.name }}</span>
            <span class="w3-large w3-right w3-margin-right w3-padding-right">{{ plan.price }} Monthly</span>
            <Features v-bind:features="plan.features"></Features>
        </div>
        <div v-else>
            <span class="w3-large w3-text-blue">Contact Us for Enterprise Pricing</span>
            <Features v-bind:features="plan.features"></Features>
        </div>
    </div>
</template>

<script>
    import Features from './Features';

    export default {
        props: {
            plan: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        },
        methods: {
            getId(name) {
                return name.replace(' ', '');
            }
        },
        components: {
            Features
        }
    }
</script>
