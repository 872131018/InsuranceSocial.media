<template>
    <div class="w3-section">
        <input class="v-align" type="radio"
            v-bind:id="getId(plan.name)"
            v-bind:checked="selected"
            v-on:change="$emit('setPlan', plan)">
        <label class="v-align check-box"
            v-bind:for="getId(plan.name)">
        </label>
        <span class="w3-large w3-margin-left">{{ plan.name }}</span>
        <Features v-bind:features="plan.features"></Features>
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
