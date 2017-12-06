const Module = {
    state: {
        menu: 'home',
        subMenu: ''
    },
    mutations: {
        setMenu(state, value) {
            state.menu = value;
        },
        setSubMenu(state, value) {
            state.subMenu = value;
        }
    }
}

export default Module;
