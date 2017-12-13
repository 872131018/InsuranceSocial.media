const Module = {
    state: {
        twitter: false,
        linkedIn: false
    },
    mutations: {
        setTwitter(state, value) {
            state.twitter = value;
        },
        setLinkedIn(state, value) {
            state.linkedIn = value;
        }
    }
}

export default Module;
