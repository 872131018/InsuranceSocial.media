const initialState = {
    facebook_page: '',
    twitter_handle: '',
    facebook_posts: [],
    twitter_posts: []
};

module.exports = function(recent = initialState, action) {
    switch(action.type) {
        case 'SET_RECENT':
            recent.facebook_page = action.data.facebook_page;
            recent.twitter_handle = action.data.twitter_handle;
            recent.facebook_posts = action.data.facebook_posts;
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(recent));
}
