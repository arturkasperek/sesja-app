const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case LOGIN:
            return state + 1
        case LOGIN_SUCCESS:
            return state - 1
        default:
            return state
    }
}