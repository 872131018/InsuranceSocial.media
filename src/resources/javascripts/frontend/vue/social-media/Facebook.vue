<template>
    <div class="w3-section">
        <input class="v-align" type="checkbox" id="facebook"
            v-model="facebook"
            v-on:change="$emit('setFacebook', facebook)">
        <label class="v-align w3-margin-right  check-box" for="facebook"></label>
        <span class="w3-large">
            Facebook<i class="fa fa-facebook-official fa-2x w3-margin-left w3-text-blue v-align"></i>
        </span>
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
