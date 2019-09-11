import { ActionReducer, Action } from '@ngrx/store';

export function logger<T, V extends Action = Action>(reducer: ActionReducer<T, V>): ActionReducer<T, V> {
  return (state, action): any => {
    const currentState = reducer(state, action);
    console.groupCollapsed(`%c ${action.type}`, 'text-transform: uppercase');
    console.log('previous state: ', state);
    console.log('action: ', action);
    console.log('current state: ', currentState);
    console.groupEnd();

    return currentState;
  };
}
