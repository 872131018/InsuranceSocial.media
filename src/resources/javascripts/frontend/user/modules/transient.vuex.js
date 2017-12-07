const Module = {
    state: {
        facebookPerformanceRange: 60,
        facebookInteractionRange: 60,
        facebookInteractionGraph: 'reach',
        twitterPerformanceRange: 50,
        twitterInteractionRange: 50,
        twitterInteractionGraph: 'retweets'
    },
    mutations: {
        setFacebookPerformanceRange(state, value) {
            state.facebookPerformanceRange = value;
        },
        setFacebookInteractionRange(state, value) {
            state.facebookInteractionRange = value;
        },
        setFacebookInteractionGraph(state, value) {
            state.facebookInteractionGraph = value;
        },
        setTwitterPerformanceRange(state, value) {
            state.twitterPerformanceRange = value;
        },
        setTwitterInteractionRange(state, value) {
            state.twitterInteractionRange = value;
        },
        setTwitterInteractionGraph(state, value) {
            state.twitterInteractionGraph = value;
        }
    }
}

export default Module;
