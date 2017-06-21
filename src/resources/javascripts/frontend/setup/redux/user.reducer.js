const initialState = {
    id: '',
    name: '',
    email: '',
    api_token: '',
    discount: '',
    plan: {},
    facebook: false,
    twitter: false
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            //Lockr.set('FrontendContents', action.data);
            user = {
                id: action.data.id,
                name: action.data.name,
                email: action.data.email,
                api_token: action.data.api_token,
                discount: action.data.discount
            };
            break;
        case 'SET_PLAN':
            user.plan = action.data;
            break;
        case 'SET_SOCIAL_MEDIA':
            user.facebook = action.data.facebook;
            user.twitter = action.data.twitter;
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
