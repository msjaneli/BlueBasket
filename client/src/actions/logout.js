import { sessionService } from 'redux-react-session';
import { LOGOUT } from './actionTypes';
import { push } from 'connected-react-router'

export const logoutUser = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    })
    dispatch(push('/'))
    await sessionService.deleteSession();
    await sessionService.deleteUser();
}