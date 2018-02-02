const initialState = {
    users: [{id: "1", firstName:"Bob", lastName:"Thomas", email:"email@email.com", createdAt: "this is a date"}],
    currentView: 'list',
    selectedUser: undefined
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        default: 
        return state;
    }


    
}


export default reducer
