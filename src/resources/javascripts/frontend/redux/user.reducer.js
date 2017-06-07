const initialState = {
    id: '',
    name: '',
    email: '',
    api_token: ''
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            //Lockr.set('FrontendContents', action.data);
            user = action.data;
            break;
        default:
            /*
            if(Lockr.get('FrontendContents')) {
                contents = Lockr.get('FrontendContents');
            }
            */
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
