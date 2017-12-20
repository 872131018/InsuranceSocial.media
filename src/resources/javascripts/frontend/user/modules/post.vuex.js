const Module = {
    state: {
        link: '',
        message: '',
        file: '',
        month: '',
        day: '',
        year: '',
        hour: '',
        minute: ''
    },
    mutations: {
        setLink(state, value) {
            state.link = value;
        },
        setMessage(state, value) {
            state.message = value;
        },
        setFile(state, value) {
            state.file = value;
        },
        setMonth(state, value) {
            state.month = value;
        },
        setDay(state, value) {
            state.day = value;
        },
        setYear(state, value) {
            state.year = value;
        },
        setHour(state, value) {
            state.hour = value;
        },
        setMinute(state, value) {
            state.minute = value;
        }
    }
}

export default Module;
