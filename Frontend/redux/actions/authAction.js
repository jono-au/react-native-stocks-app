

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'http://172.22.27.231:3000';

export const registerUser = (authdata) => {
    const {fullName, email, password} = authdata;

    return async dispatch => {

        //logic to make a post to REGISTER the user
        const result = await fetch(`${BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        })

        const resultData = await result.json();
        console.log(resultData);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: 1
        });
    }
}


export const loginUser = (authdata) => {
    const { email, password} = authdata;

    return async dispatch => {

        //logic to make a post to LOGIN the user
        const result = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const resultData = await result.json();
        console.log(resultData);

        if(resultData.success){
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: resultData
            });
        }

        return resultData;
    }
}