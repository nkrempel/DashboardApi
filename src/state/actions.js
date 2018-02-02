import axios from 'axios';

export const fetchUserData = () => {
    return (dispatch, getState, url) => {
        //dispatch(changePeopleStatus('isLoading'));
        axios.get(url + '/users')
            .then(({ data }) => {

                //});
                dispatch(loadUserToState(data));
                //}); 

                //dispatch(changePeopleStatus('isLoaded'));

                //}
                //.catch(() => dispatch(changePeopleStatus('failedToLoad')));
            });
    }
}
export function loadUserToState(payload) {
    return {
        type: 'LOAD_USERS',
        payload
    }
}
export function switchView(payload) {
    return {
        type: 'SWITCH_VIEW',
        payload
    }
}
export function createUser(payload) {
    return (dispatch, getState, url) => {
        axios.post(url + '/users', payload)
            .then((response) => {
                dispatch(switchView('list'))
                dispatch(fetchUserData())
            })
    }
}