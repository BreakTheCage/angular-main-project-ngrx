import { Recipe } from './recipe.model';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty schnitzel',
            'The super Tasty shnitzel', 'https://d1i2hi5dlrpq5n.cloudfront.net/~/media/images/2018/pizza/wetherspoon-pizza.jpg?h=242&la=en&w=555&vs=1&d=20180824T120817Z&crop=1&cropx=50&cropy=50&hash=F1E84921E592516C79E29B8FB69949CD4C41AB31',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'Big Fat Burger',
            'What else you need to say?',
            'https://d1i2hi5dlrpq5n.cloudfront.net/~/media/images/2018/pizza/wetherspoon-pizza.jpg?h=242&la=en&w=555&vs=1&d=20180824T120817Z&crop=1&cropx=50&cropy=50&hash=F1E84921E592516C79E29B8FB69949CD4C41AB31',  
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}