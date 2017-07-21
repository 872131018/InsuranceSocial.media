const initialState = {
    id: null,
    name:null,
    email:null,
    status:null,
    role:null,
    cell_phone:null,
    title_code:null,
    effective_date:null,
    expiration_date:null,
    coupon_code:null,
    termination_reason:null,
    termination_comment:null,
    customer_profile_id:null,
    customer_payment_profile_id:null,
    notify_email:null,
    notify_text:null,
    notify_frequency:null,
    commercial_mix:null,
    personal_mix:null,
    api_token:null
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            for(let property in user) {
                user[property] = action.data[property];
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
