<template lang="pug">
    div(class="w3-padding-16")
        div(class="w3-third") Notification Method:
        div(class="w3-third")
            input(type="checkbox" id="notifyEmail"
                :checked="notifyEmail"
                @change="$emit('setEmail', $event.target.checked)")
            label(for="notifyEmail")
                span(class="w3-show-inline-block v-align")
                | Email
        div(class="w3-third")
            input(type="checkbox" id="notifyText"
                :checked="notifyText"
                @change="$emit('setText', $event.target.checked)")
            label(for="notifyText")
                span(class="w3-show-inline-block v-align")
                | Text
</template>

<script>
    export default {
        props: {
            notifyEmail: {
                type: Boolean
            },
            notifyText: {
                type: Boolean
            }
        }
    }
</script>
