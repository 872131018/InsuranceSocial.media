const Module = {
    state: {
        images: [
            {'id':'1', 'name':'Apartment', 'src':'images/apartment.jpg'},
            {'id':'2', 'name':'Cars', 'src':'images/cars.jpg'},
            {'id':'3', 'name':'Cellphone', 'src':'images/cellphone.jpg'},
            {'id':'4', 'name':'Compass', 'src':'images/compass.jpg'},
            {'id':'5', 'name':'Door', 'src':'images/door.jpg'},
            {'id':'6', 'name':'House', 'src':'images/house.jpg'},
            {'id':'7', 'name':'Office', 'src':'images/office.jpg'},
            {'id':'8', 'name':'Pen', 'src':'images/pen.jpg'},
            {'id':'9', 'name':'Plan', 'src':'images/plan.jpg'},
            {'id':'10', 'name':'Tree', 'src':'images/tree.jpg'}
        ],
        name: '',
        image: ''
    },
    mutations: {
        setName(state, value) {
            state.name = value;
        },
        setImage(state, value) {
            state.image = value;
        },
    }
}

export default Module;
