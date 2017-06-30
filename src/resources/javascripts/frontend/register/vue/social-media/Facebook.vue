<template>
    <div class="w3-section">
        <input class="v-align" type="checkbox" id="facebook"
            v-model="facebook"
            v-on:change="$emit('setFacebook', facebook)">
        <label for="facebook">
            <span class="w3-show-inline-block w3-margin-right v-align"></span>
            Facebook<i class="fa fa-facebook-official fa-2x w3-margin-left w3-text-blue v-align"></i>
        </label>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                facebook: true
            }
        }
    }
</script>
