const Module = {
    state: {
        menu: 'home',
        subMenu: '',
        route: ''
    },
    mutations: {
        setMenu(state, value) {
            state.menu = value;
            state.subMenu = '';
        },
        setSubMenu(state, value) {
            state.subMenu = value;
        },
        setRoute(state, value) {
            state.route = value;
        }
    }
}

export default Module;
