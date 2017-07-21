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
