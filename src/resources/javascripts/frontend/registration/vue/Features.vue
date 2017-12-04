<template lang="pug">
    ul(class="w3-ul")
        li(v-for="feature in features")
            i(class="fa fa-check w3-text-green")
            | {{ feature }}
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
