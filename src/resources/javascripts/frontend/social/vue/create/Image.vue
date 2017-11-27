<template lang="pug">
        div(class="w3-padding-16 w3-row")
            div(class="w3-third" style="position:relative; top:90px")
                input(type="radio"
                    :id="image.id"
                    :checked="selected"
                    @change="$emit('setValue', image.name)")
                label(class="v-align"
                    :for="image.id")
                    span(class="w3-show-inline-block w3-margin-right v-align")
                    | {{ image.name }}
            div(class="w3-third")
                img(class="w3-cell" height="180" width="180"
                    v-if="image.src"
                    :src="image.src")
</template>

<script>
    export default {
        props: {
            image: {
                type: Object
            },
            selected: {
                type: Boolean
            }
        }
    }
</script>
