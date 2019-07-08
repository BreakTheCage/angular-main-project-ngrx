import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';

import * as shoppingListAction from './shopping-list.actions';

const iState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
        ]
} 

export function shoppingListReducer(state=iState, action: shoppingListAction.ShoppingListActions) {
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
                const ingredient = state.ingredients[action.payload.index];
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload.ingredient
                }
                const updatedIngredients = [ ...state.ingredients ];
                updatedIngredients[action.payload.index] = updatedIngredient;
                return {
                    ...state,
                    ingredients: updatedIngredients
                }
            case shoppingListAction.DELETE_INGREDIENT:
                    return {
                        ...state,
                        ingredients: state.ingredients.filter((ig, igIndex) => {
                            return igIndex != action.payload;
                        })
                    }
        
            default:
                return state;
        }
}