import { User } from '../user.model';

export interface State {
    user: User;

}

const initinalState: State = {
    user: null
}
export function authReducer(state = initinalState, action) {
    return state;
}