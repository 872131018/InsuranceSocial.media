const initialState = {
    id: '',
    name: '',
    email: '',
    api_token: '',
    plan: {}
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            user = {
                id: action.data.id,
                name: action.data.name,
                email: action.data.email,
                api_token: action.data.api_token
            };
            break;
        case 'SET_PLAN':
            user.plan = action.data;
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
