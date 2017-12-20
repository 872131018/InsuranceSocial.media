<template lang="pug">
    div(class="w3-third v-align")
        div(class="w3-dropdown-hover")
            button(class="w3-button") {{ selected.name }}
                i(class="fa fa-caret-down")
            div(class="w3-dropdown-content w3-bar-block w3-border")
                div(class="w3-bar-item w3-button"
                    v-for="month in months"
                    v-on:click="setMonth(month)") {{ month.name }}
</template>

<script>
    export default {
        props: {
            value: {
                type: String
            }
        },
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
        mounted() {
            if(this.value) {
                for(let month of this.months) {
                    if(this.value == month.value) {
                        this.selected = month;
                    }
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
