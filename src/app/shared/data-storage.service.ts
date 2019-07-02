import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipes/recipe.model'
import { RecipeService } from '../recipes/recipe.service'
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService ) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        //put: like post but for overwritting all data
         this.http.put(
            'https://ng-course-recipe-book-546b8.firebaseio.com/recipes.json',
            recipes
         ).subscribe(resp => {
             console.log('Data Stored in firebase Successfully: ', resp);
        })
    }
    fetchRecipes() {
        this.http.get(
            'https://ng-course-recipe-book-546b8.firebaseio.com/recipes.json'
        ).subscribe(recipes => {
            console.log(recipes);    
        });
    }
}