<template lang="pug">
    div(class="w3-section")
        span(class="w3-large w3-margin-left") {{ plan.name }}
        span(class="w3-large w3-right w3-margin-right w3-padding-right") {{ plan.cost }}
        Features(:features="plan.features")
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
