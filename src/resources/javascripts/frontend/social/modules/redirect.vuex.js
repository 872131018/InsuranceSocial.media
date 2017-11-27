const Module = {
    state: {
        facebookUrl: '',
        twitterUrl: ''
    },
    mutations: {
        setFacebookUrl(state, value) {
            state.facebookUrl = value;
        },
        setTwitterUrl(state, value) {
            state.twitterUrl = value;
        }
    }
}

export default Module;
