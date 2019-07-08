import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';

import * as shoppingListAction from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    edittedIngredient: Ingredient;
    edittedIngredientIndex: number;
}
export interface AppState {
    shoppingList: State;
}


const iState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10) ],
    edittedIngredient: null,
    edittedIngredientIndex: -1
} 

export function shoppingListReducer(
    state: State = iState,
    action: shoppingListAction.ShoppingListActions) {
        switch (action.type) {
            case shoppingListAction.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                }
            case shoppingListAction.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...action.payload]
                }
            case shoppingListAction.UPDATE_INGREDIENT:
                const ingredient = state.ingredients[state.edittedIngredientIndex];
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload
                }
                const updatedIngredients = [ ...state.ingredients ];
                updatedIngredients[state.edittedIngredientIndex] = updatedIngredient;
                return {
                    ...state,
                    ingredients: updatedIngredients,
                    edittedIngredientIndex: -1,
                    edittedIngredient: null
                }
            case shoppingListAction.DELETE_INGREDIENT:
                return {
                    ...state,
                    ingredients: state.ingredients.filter((ig, igIndex) => {
                        return igIndex != state.edittedIngredientIndex;
                    }),
                    edittedIngredientIndex: -1,
                    edittedIngredient: null
                }
            case shoppingListAction.START_EDIT:
                return {
                    ...state,
                    edittedIngredientIndex: action.payload,
                    edittedIngredient: {...state.ingredients[action.payload]}
                }
            case shoppingListAction.STOP_EDIT:
                return {
                    ...state,
                    edittedIngredientIndex: -1,
                    edittedIngredient: null
                }
        
            default:
                return state;
        }
}