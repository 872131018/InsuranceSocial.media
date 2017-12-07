const Module = {
    state: {
        posts: [],
        created_at: ''
    },
    mutations: {
        setTwitterPosts(state, value) {
            state.posts = value;
        }
    }
}

export default Module;
