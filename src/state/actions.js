import axios from 'axios';

export const fetchUserData = () => {
    return (dispatch, getState, url) => {
        //dispatch(changePeopleStatus('isLoading'));
        console.log(url)
        axios.get(url + '/users')
            .then(({ data }) => {
                console.log(data);

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