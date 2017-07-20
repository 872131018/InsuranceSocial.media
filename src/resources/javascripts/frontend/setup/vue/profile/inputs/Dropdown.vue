<template>
    <div class="eighty v-align">
        <div>{{ label }}</div>
        <div class="w3-dropdown-hover w3-grey">
            <button class="w3-button">{{ selected.desc }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="option in options"
                    v-on:click="setSelected(option)">{{ option.desc }}
                </div>
            </div>
        </div>
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
            },
            default: {
                type: String
            }
        },
        data() {
            return {
                selected: { code: 'DE', desc:'Options' }
            }
        },
        mounted() {
            if(this.default) {
                this.selected = this.default;
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
