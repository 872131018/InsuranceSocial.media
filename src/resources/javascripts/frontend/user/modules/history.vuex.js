const Module = {
    state: {
        history: [],
        remaining: '',
        next: ''
    },
    mutations: {
        setHistory(state, value) {
            state.history = value.histories;
            state.remaining = value.resremains,
            state.next = value.nextpage;
        }
    }
}

export default Module;
