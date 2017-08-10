const initialState = {
    id:'',
    user_id:'',
    email:'',
    plan_code:'',
    engagement_mix:'',
    engagement_tone:'',
    monday:'',
    tuesday:'',
    wednesday:'',
    thursday:'',
    friday:'',
    saturday:'',
    sunday:'',
    time_code:''
};

module.exports = function(plan = initialState, action) {
    switch(action.type) {
        case 'SET_PLAN':
            for(let property in plan) {
                plan[property] = action.data[property];
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(plan));
}
