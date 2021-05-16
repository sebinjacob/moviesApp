export default (state={token:null},action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {...state,token:action.data};
        case 'CLEAR_TOKEN':
            return {token:null};
        default: return state;
    }
}