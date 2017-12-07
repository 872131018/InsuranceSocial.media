const Module = {
    state: {
        reach: '',
        clicks: '',
        likes: '',
        shares: '',
        comments: '',
        engagement: '',
        reach_percentage: '',
        clicks_percentage: '',
        likes_percentage: '',
        shares_percentage: '',
        comments_percentage: '',
        engagement_percentage: '',
        created_at: ''
    },
    mutations: {
        setFacebookPerformance(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
    }
}

export default Module;
