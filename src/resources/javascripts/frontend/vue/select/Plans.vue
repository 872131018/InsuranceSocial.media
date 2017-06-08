<template>
    <div>
        <div v-for="(features, name) in plans">
            <input class="v-align" type="radio"
                v-bind:id="getId(name)"
                v-bind:value="name"
                v-model="selected"
                v-on:change="$emit('setPlan', name)">
            <label class="v-align check-box"
                v-bind:for="getId(name)">
            </label>
            <span class="w3-large w3-margin-left">{{ name }}</span>
            <div class="w3-container w3-padding">
                <Features v-bind:features="features"></Features>
            </div>
        </div>
    </div>
</template>

<script>
    import Features from '../Features';

    export default {
        props: {
            plans: {
                type: Object
            }
        },
        data() {
            return {
                selected: false
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
