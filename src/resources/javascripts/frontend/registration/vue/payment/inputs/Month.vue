<template>
    <div class="w3-col l3 m3 s12 w3-margin-right v-align">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.name }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="month in months"
                    v-on:click="setMonth(month)">{{ month.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                months: [
                    {
                        name: 'January',
                        value: '01'
                    },
                    {
                        name: 'February',
                        value: '02'
                    },
                    {
                        name: 'March',
                        value: '03'
                    },
                    {
                        name: 'April',
                        value: '04'
                    },
                    {
                        name: 'May',
                        value: '05'
                    },
                    {
                        name: 'June',
                        value: '06'
                    },
                    {
                        name: 'July',
                        value: '07'
                    },
                    {
                        name: 'August',
                        value: '08'
                    },
                    {
                        name: 'September',
                        value: '09'
                    },
                    {
                        name: 'October',
                        value: '10'
                    },
                    {
                        name: 'November',
                        value: '11'
                    },
                    {
                        name: 'December',
                        value: '12'
                    }
                ],
                selected: {
                    name: 'Month'
                }
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
