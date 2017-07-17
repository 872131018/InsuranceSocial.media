<template>
    <div class="w3-section">
        <span class="w3-large w3-margin-left">{{ plan.name }}</span>
        <span class="w3-large w3-right w3-margin-right w3-padding-right">{{ plan.cost }}</span>
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
