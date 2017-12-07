const Module = {
    state: {
        posts: [],
        created_at: ''
    },
    mutations: {
        setFacebookPosts(state, value) {
            state.posts = value;
        }
    }
}

export default Module;
