const initialState = {
    id:null,
    user_id:null,
    email:null,
    plan_code:null,
    engagement_mix:null,
    engagement_tone:null,
    monday:null,
    tuesday:null,
    wednesday:null,
    thursday:null,
    friday:null,
    saturday:null,
    sunday:null,
    time_code:null
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
