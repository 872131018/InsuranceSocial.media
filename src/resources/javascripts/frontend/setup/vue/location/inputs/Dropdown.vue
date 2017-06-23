<template>
    <div class="fifty v-align">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="option in options"
                    v-on:click="setSelected(option)">{{ option }}
                </div>
            </div>
        </div>
        <div>{{ label }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            options: {
                type: Array
            }
        },
        data() {
            return {
                selected: 'Options'
            }
        },
        methods: {
            setSelected(option) {
                this.selected = option;
                this.$emit('setOption', option);
            }
        }
    }
</script>
