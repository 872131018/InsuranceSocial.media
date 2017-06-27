<template>
    <div class="w3-section">
        <span class="w3-large">Notification Method: </span>
        <div class="w3-show-inline-block w3-margin-left">
            <Checkbox
                v-bind:label="'Email'"
                v-bind:id="'check1'"
                v-bind:value="'Email'"
                v-on:setChecked="$emit('setChecked', $event)">
            </Checkbox>
        </div>
        <div class="w3-show-inline-block w3-margin-left">
            <Checkbox
                v-bind:label="'Text'"
                v-bind:id="'check2'"
                v-bind:value="'Text'"
                v-on:setChecked="$emit('setChecked', $event)">
            </Checkbox>
        </div>
    </div>
</template>

<script>
    import Checkbox from './inputs/Checkbox';

    export default {
        components: {
            Checkbox
        }
    }
</script>
