const initialState = {
    id: '',
    name:'',
    email:'',
    status:'',
    role:'',
    phone:'',
    cell_phone: '',
    title_code:'',
    effective_date:'',
    expiration_date:'',
    coupon_code:'',
    termination_reason:'',
    termination_comment:'',
    customer_profile_id:'',
    customer_payment_profile_id:'',
    notify_email:'',
    notify_text:'',
    notify_frequency:'',
    commercial_mix:'',
    personal_mix:'',
    api_token:'',
    commercial_mix: '0',
    personal_mix: '0'
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
