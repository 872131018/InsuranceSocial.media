const Module = {
    state: {
        followers: '',
        retweets: '',
        favorites: '',
        mentions: '',
        retweets_percentage: '',
        favorites_percentage: '',
        mentions_percentage: '',
        created_at: ''
    },
    mutations: {
        setTwitterPerformance(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
    }
}

export default Module;
