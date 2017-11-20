const initialState = {
    post: '',
    redirect: ''
};

module.exports = function(endpoint = initialState, action) {
    switch(action.type) {
        case 'SET_ENDPOINT':
            endpoint.post = action.data.post;
            endpoint.redirect = action.data.redirect;
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(endpoint));
}
