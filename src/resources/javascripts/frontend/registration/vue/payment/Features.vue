<template lang="pug">
    div(class="w3-panel")
        ul(class="w3-ul")
            li(v-for="feature in features")
                i(class="fa fa-check w3-text-green")
                span {{ feature }}
</template>

<script>
    export default {
        props: {
            features: {
                type: Array
            }
        }
    }
</script>
