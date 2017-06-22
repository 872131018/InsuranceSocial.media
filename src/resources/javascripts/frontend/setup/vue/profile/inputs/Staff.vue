<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.size }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="size in sizes"
                    v-on:click="setStaff(size)">{{ size.size }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sizes: [
                    {
                        size: 'Sole Proprietor'
                    },
                    {
                        size: '2-5 Employees'
                    },
                    {
                        size: '6-10 Employees'
                    },
                    {
                        size: '11-15 Employees'
                    },
                    {
                        size: '16+ Employees'
                    }
                ],
                selected: {
                    size: 'How many agents do you employ?'
                }
            }
        },
        methods: {
            setStaff(size) {
                this.selected = size;
                this.$emit('setStaff', size);
            }
        }
    }
</script>
