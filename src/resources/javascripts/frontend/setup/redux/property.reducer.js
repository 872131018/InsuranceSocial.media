const initialState = {
    name: '',
    email: '',
    phone: '',
    title: '',
    principle_name: '',
    principle_email: '',
    website: '',
    staff: '',
    year: '',
    generation: '',
    frequency: '',
    notify: {
        email: true,
        text: true
    }
};

module.exports = function(properties = initialState, action) {
    switch(action.type) {
        case 'SET_PROPERTIES':
            //Lockr.set('FrontendContents', action.data);
            properties = {
                name: action.data.name,
                email: action.data.email,
                phone: action.data.phone,
                title: action.data.title,
                principle_name: action.data.principle_name,
                principle_email: action.data.principle_email,
                website: action.data.website,
                staff: action.data.staff,
                year: action.data.year,
                generation: action.data.generation,
                frequency: action.data.frequency,
                notify: action.data.notify
            };
            break;
        default:
            /*
            if(Lockr.get('FrontendContents')) {
                contents = Lockr.get('FrontendContents');
            }
            */
            break;
    }
    return JSON.parse(JSON.stringify(properties));
}
