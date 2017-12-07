const Module = {
    state: {
        retweet_labels: [],
        retweet_series: [],
        favorite_labels: [],
        favorite_series: [],
        mention_labels: [],
        mention_series: [],
        created_at: ''
    },
    mutations: {
        setTwitterInteraction(state, value) {
            for(let property in state) {
                if(property != 'created_at') {
                    state[property] = JSON.parse(value[property]);
                } else {
                    state[property] = value[property];
                }
            }
        }
    }
}

export default Module;
