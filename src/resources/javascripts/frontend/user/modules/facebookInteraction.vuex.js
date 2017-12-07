const Module = {
    state: {
        reach_labels: [],
        reach_series: [],
        engagement_labels: [],
        engagement_series: [],
        ratio_labels: [],
        ratio_series: [],
        created_at: ''
    },
    mutations: {
        setFacebookInteraction(state, value) {
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
