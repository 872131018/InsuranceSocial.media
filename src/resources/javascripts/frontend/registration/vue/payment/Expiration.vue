<template>
    <div class="eighty w3-row-padding">
        <Month v-on:setMonth="(month) => $emit('setMonth', month)"></Month>
        <Year v-on:setYear="(year) => $emit('setYear', year)"></Year>
        <CCV v-on:setCode="(code) => $emit('setCode', code)"></CCV>
    </div>
</template>

<script>
    import Month from './inputs/Month';
    import Year from './inputs/Year';
    import CCV from './inputs/CCV';

    export default {
        components: {
            Month,
            Year,
            CCV
        }
    }
</script>
