<template>
    <div class="w3-section">
        <input class="v-align" type="radio" checked>
        <label class="v-align check-box"
            v-bind:for="plan.name">
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
            }
        },
        components: {
            Features
        }
    }
</script>
