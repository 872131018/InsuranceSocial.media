<template>
    <div class="w3-modal w3-show"
        v-on:click="$emit('setModal')">
        <div class="w3-modal-content w3-card-4">
            <header class="w3-container primary">
                <i class="fa fa-times fa-3x w3-display-topright w3-padding w3-text-white"></i>
                <h2 class="w3-center w3-text-white">Terms of Service</h2>
            </header>
            <div class="w3-container">
                <p>Some text. Some text. Some text.</p>
                <p>Some text. Some text. Some text.</p>
            </div>
            <footer class="w3-container w3-text-white primary">
                <p class="w3-center">Click anywhere to close</p>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false
            }
        }
    }
</script>
