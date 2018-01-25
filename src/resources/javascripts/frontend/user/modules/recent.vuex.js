const Module = {
    state: {
        facebook_page: '',
        twitter_handle: '',
        linkedin_email: '',
        facebook_posts: [],
        twitter_posts: [],
        score: 0,
        linkedin_posts: []
    },
    mutations: {
        setRecent(state, value) {
            state.facebook_page = value.facebook_page;
            state.twitter_handle = value.twitter_handle;
            state.linkedin_email = value.linkedin_email;
            state.facebook_posts = value.facebook_posts;
            state.twitter_posts = value.twitter_posts;
            state.linkedin_posts = value.linkedin_posts;
        },
        setScore(state, value) {
            state.score = value;
        }
    }
}

export default Module;
