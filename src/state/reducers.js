

const initialState = {
    users: [{id: "1", firstName:"Bob", lastName:"Thomas", email:"email@email.com", createdAt: "this is a date"}],
    currentView: 'list',
    selectedUser: undefined
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOAD_USERS' :
        return {
            ...state, users: action.payload
        }
        case 'SWITCH_VIEW' :
        return {
            ...state, currentView: action.payload
        }

        case 'SELECT_USER' :
        return {
            ...state, selectedUser: action.payload
        }
        default: 
        return state;
    }
    


    
}


export default reducer
