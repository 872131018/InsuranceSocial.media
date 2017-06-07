<template>
    <div class="w3-container w3-card-2 form">
        <h3>Add additional features to your plan</h3>
        <div class="w3-container">
            <input class="v-align" type="radio" id="plana"
                v-bind:value="'plana'"
                v-model="selected"
                v-on:change="$emit('setTerms', checked)">
            <label class="v-align check-box" for="plana"></label>
            <span class="w3-large w3-margin-left">Plan A</span>
            <ul class="w3-ul w3-border">
                <li class="w3-padding-16"
                    v-for="feature in features">
                    <i class="fa fa-check w3-margin-right w3-text-green"></i>{{ feature }}
                </li>
            </ul>
            <input class="v-align" type="radio" id="planb"
                v-bind:value="'planb'"
                v-model="selected"
                v-on:change="$emit('setTerms', checked)">
            <label class="v-align check-box" for="planb"></label>
            <span class="w3-large w3-margin-left">Plan B</span>
            <ul class="w3-ul w3-border">
                <li class="w3-padding-16"
                    v-for="feature in features">
                    <i class="fa fa-check w3-margin-right w3-text-green"></i>{{ feature }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: false,
                features: [
                    '1', '2', '3'
                ]
            }
        },
        methods: {
            //
        },
        components: {
            //
        }
    }
</script>
