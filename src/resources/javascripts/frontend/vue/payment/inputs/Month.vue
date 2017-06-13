<template>
    <div class="w3-section w3-show-inline-block w3-margin-right">
        <div class="w3-dropdown-hover">
            <button class="w3-button">Month<i class="fa fa-caret-down"></i></button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="month in months"
                    v-on:click="setMonth(month)">{{ month }}
                </div>
            </div>
        </div>
        <div>Expires in: {{ this.selected }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                selected: ''
            }
        },
        methods: {
            setMonth(month) {
                this.selected = month;
                this.$emit('setMonth', month);
            }
        }
    }
</script>
