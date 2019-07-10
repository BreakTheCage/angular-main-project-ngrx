import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../../recipes/store/recipe.actions';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe; 
  id: number;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => index === this.id);
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      })
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   // this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store.select('recipes').pipe(map(recipesState => {
    //     return recipesState.recipes.find((recipe, index) => index === this.id);
    //   })).subscribe(recipe => {
    //     this.recipe = recipe
    //   })
    // })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
