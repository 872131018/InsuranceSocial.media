const initialState = {
    id: '',
    name: '',
    email: '',
    api_token: '',
    coupon_code: '',
    plan: {},
    status: ''
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            user = {
                id: action.data.id,
                name: action.data.name,
                email: action.data.email,
                api_token: action.data.api_token,
                coupon_code: action.data.coupon_code
            };
            if(action.data.status) {
                user.status = action.data.status;
            }
            break;
        case 'SET_PLAN':
            user.plan = action.data;
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
