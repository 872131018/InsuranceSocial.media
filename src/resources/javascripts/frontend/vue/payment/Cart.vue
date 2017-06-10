<template>
    <div class="w3-section">
        <table class="w3-table">
            <tr>
                <th>Plan Description</th>
                <th>Price</th>
            </tr>
            <tr>
                <td>{{ plan.name }}</td>
                <td>{{ plan.price }}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td>{{ discount }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            plan: {
                type: Object
            },
            discount: {
                type: String
            }
        }
    }
</script>
