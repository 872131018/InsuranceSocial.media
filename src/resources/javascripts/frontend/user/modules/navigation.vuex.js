const Module = {
    state: {
        menu: 'home',
        subMenu: ''
    },
    mutations: {
        setMenu(state, value) {
            state.menu = value;
            state.subMenu = '';
        },
        setSubMenu(state, value) {
            state.subMenu = value;
        }
    }
}

export default Module;
