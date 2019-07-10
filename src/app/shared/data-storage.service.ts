import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model'
import { RecipeService } from '../recipes/recipe.service'
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) { }

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
        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-546b8.firebaseio.com/recipes.json'
        )
        .pipe(
            map(recipes => {
                console.log('@data-storage: Recipes line 32=>', recipes);
                return recipes.map(recipe => {
                    return {... recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })
            }),
            tap(recipes => {
                // this.recipesService.setRecipes(recipes)
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            })
        )
    }
}