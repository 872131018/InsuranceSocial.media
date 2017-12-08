<template lang="pug">
    div(class="w3-padding-16")
        label(class="w3-show-block") {{ label }}
        input(class="w3-input w3-show-inline-block eighty" type="file"
            v-on:change="$emit('setFile', $event.target.files[0])")
        Check(v-show="valid")
        Cross(v-show="!valid")
    </div>
</template>

<script>
    import Check from './Check';
    import Cross from './Cross';

    export default {
        props: {
            label: {
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
