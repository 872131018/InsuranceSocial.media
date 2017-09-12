const initialState = {
    id:'',
    user_id:'',
    email:'',
    principal_name:'',
    principal_email:'',
    name:'',
    website:'',
    size:'',
    established:'',
    multigenerational:'',
    address_1:'',
    address_2:'',
    city:'',
    state:'',
    zip:'',
    latitude:'',
    longitude:''
};

module.exports = function(agency = initialState, action) {
    switch(action.type) {
        case 'SET_AGENCY':
            for(let property in action.data) {
                agency[property] = action.data[property];
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(agency));
}
