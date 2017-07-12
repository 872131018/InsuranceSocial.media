<template>
    <div class="eighty w3-row-padding">
        <Month v-on:setMonth="(month) => $emit('setMonth', month)"></Month>
        <Year v-on:setYear="(year) => $emit('setYear', year)"></Year>
        <CCV v-on:setCode="(code) => $emit('setCode', code)"></CCV>
    </div>
</template>

<script>
    import Month from './Month';
    import Year from './Year';
    import CCV from './CCV';

    export default {
        components: {
            Month,
            Year,
            CCV
        }
    }
</script>
