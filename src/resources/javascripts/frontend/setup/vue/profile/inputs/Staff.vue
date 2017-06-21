<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.name }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="size in sizes"
                    v-on:click="setStaff(size)">{{ size.name }}
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
                    name: 'Staff Size'
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
