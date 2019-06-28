import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
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

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}