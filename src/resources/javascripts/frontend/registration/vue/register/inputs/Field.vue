<template lang="pug">
    div(class="w3-padding-16")
        label(class="w3-show-block") {{ label }}
        input(class="w3-input w3-show-inline-block eighty" type="text"
            :value="value"
            @keyup="$emit('setValue', $event.target.value)")
        Check(v-show="valid")
        Cross(v-show="!valid")
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        props: {
            label: {
                type: String
            },
            value: {
                type: String
            },
            valid: {
                type: Boolean
            }
        },
        components: {
            Check,
            Cross
        }
    }
</script>
