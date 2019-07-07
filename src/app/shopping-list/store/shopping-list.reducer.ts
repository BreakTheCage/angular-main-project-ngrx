import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';

import * as shoppingListAction from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
        ]
} 

export function shoppingListReducer(
    state = initialState,
    action: shoppingListAction.AddIngredient) {
        switch (action.type) {
            case shoppingListAction.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                }
                break;
        
            default:
                return state;
                break;
        }
}