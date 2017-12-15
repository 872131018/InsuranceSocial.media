<template lang="pug">
    div(class="w3-padding-16")
        div(class="w3-third") Marketing Geography:
        div(class="w3-third")
            input(type="radio" id="marketingRegion"
                :checked="marketingRegion"
                @change="$emit('setMarketingRegion', $event.target.checked)")
            label(for="marketingRegion")
                span(class="w3-show-inline-block v-align")
                | Region
        div(class="w3-third")
            input(type="radio" id="marketingState"
                :checked="marketingState"
                @change="$emit('setMarketingState', $event.target.checked)")
            label(for="marketingState")
                span(class="w3-show-inline-block v-align")
                | State and County
</template>

<script>
    export default {
        props: {
            marketingRegion: {
                type: Boolean
            },
            marketingState: {
                type: Boolean
            }
        }
    }
</script>
