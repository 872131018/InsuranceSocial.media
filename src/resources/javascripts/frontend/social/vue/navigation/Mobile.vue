<template>
    <div>
        <div class="w3-bar">
            <a class="w3-bar-item w3-button">Home</a>
            <Toggle v-on:toggle="toggle()"></Toggle>
        </div>
        <div class="w3-bar-block"
            v-if="toggled">
            <a class="w3-bar-item w3-button">Link 1</a>
            <a class="w3-bar-item w3-button">Link 2</a>
            <a class="w3-bar-item w3-button">Link 3</a>
            <a class="w3-bar-item w3-button">Link 4</a>
        </div>
    </div>
</template>

<script>
    import Toggle from './Toggle';

    export default {
        data() {
            return {
                toggled: false
            }
        },
        methods: {
            toggle() {
                this.toggled = !this.toggled;
            }
        },
        components: {
            Toggle
        }
    }
</script>
