<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.name }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="frequency in frequencies"
                    v-on:click="setFrequency(frequency)">{{ frequency.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                frequencies: [
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
                    }
                ],
                selected: {
                    name: 'Notification Frequency'
                }
            }
        },
        methods: {
            setFrequency(frequency) {
                this.selected = frequency;
                this.$emit('setFrequency', frequency);
            }
        }
    }
</script>
