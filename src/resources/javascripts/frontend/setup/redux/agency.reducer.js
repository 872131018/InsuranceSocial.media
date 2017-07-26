const initialState = {
    id:null,
    user_id:null,
    email:null,
    principal_name:null,
    principal_email:null,
    name:null,
    website:null,
    size:null,
    established:null,
    multigenerational:null,
    address_1:null,
    address_2:null,
    city:null,
    state:null,
    zip:null,
    latitude:null,
    longitude:null
};

module.exports = function(agency = initialState, action) {
    switch(action.type) {
        case 'SET_AGENCY':
            for(let property in agency) {
                agency[property] = action.data[property];
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(agency));
}
