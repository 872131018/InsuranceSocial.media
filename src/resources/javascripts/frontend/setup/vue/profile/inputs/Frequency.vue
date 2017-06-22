<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.frequency }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="frequency in frequencies"
                    v-on:click="setFrequency(frequency)">{{ frequency.frequency }}
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
                        frequency: 'Daily'
                    },
                    {
                        frequency: 'Weekly'
                    },
                    {
                        frequency: 'Monthly'
                    },
                    {
                        frequency: 'Quarterly'
                    },
                    {
                        frequency: 'Never'
                    },
                ],
                selected: {
                    frequency: 'How often would like to be notified?'
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
