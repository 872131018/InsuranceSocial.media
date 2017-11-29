const Module = {
    state: {
        name: '',
        email: '',
        phone: '',
        title_code: '',
        notify_frequency: '',
        notify_email: '',
        notify_text: '',
        cell_phone: ''

    },
    mutations: {
        setUser(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
        setPhone(state, value) {
            state.phone = value;
        },
        setTitle(state, value) {
            state.title_code = value;
        },
        setFrequency(state, value) {
            state.notify_frequency = value;
        },
        setNotifyEmail(state, value) {
            state.notify_email = value;
        },
        setNotifyText(state, value) {
            state.notify_text = value;
        },
        setCellphone(state, value) {
            state.cell_phone = value;
        }
    }
}

export default Module;
