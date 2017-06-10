<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-panel">
            <h3>Payment Methods</h3>
            <h5>Enter a payment method as the last step in registration</h5>
        </div>
        <div class="w3-panel">
            <Cart v-bind:plan="plan"></Cart>
        </div>
        <div class="w3-panel">
            <Code v-on:setCode="setCode($event)"></Code>
        </div>
        <div class="w3-panel">
            <h3>Payment Information</h3>
            <h5>Visa, Mastercard, American Express</h5>
            <input class="w3-input" type="text"
                v-model="number">
            <label>Card Number</label>
            <select class="w3-select"
                v-model="month">
                <option value="" disabled selected>Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <input class="w3-input" type="text"
                v-model="year">
             <label>Year</label>
             <input class="w3-input" type="text"
                 v-model="name">
              <label>Cardholder Name</label>
        </div>
        <div class="w3-panel">
            <h5 class="w3-large">We look forward to working with you. Please click register to finish setting up your account.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Complete
            </button>
        </div>
    </div>
</template>

<script>
    import Code from './Code';
    import Cart from './Cart';

    export default {
        data() {
            return {
                plan: '',
                code: '',
                discount: '',
                number: '',
                month: '',
                year: '',
                name: ''
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.plan = store.getState().UserStore.plan;
            });
        },
        methods: {
            update() {
                //
            },
            setCode(code) {
                console.log(code)
            }
        },
        components: {
            Code,
            Cart
        }
    }
</script>
