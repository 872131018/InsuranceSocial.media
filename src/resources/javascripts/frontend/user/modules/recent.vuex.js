const Module = {
    state: {
        facebook_page: '',
        twitter_handle: '',
        facebook_posts: [],
        twitter_posts: [],
        score: 0
    },
    mutations: {
        setRecent(state, value) {
            state.facebook_page = value.facebook_page;
            state.twitter_handle = value.twitter_handle;
            state.facebook_posts = value.facebook_posts;
            state.twitter_posts = value.twitter_posts;
        },
        setScore(state, value) {
            state.score = value;
        }
    }
}

export default Module;
