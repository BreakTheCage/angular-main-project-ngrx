import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;
  constructor(
      private activatedRoute: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router,
      private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => { 
          return +params['id'];
        })
      )
      .subscribe(paramsId => {
      this.id = paramsId;
      this.editMode = paramsId != null;
      this.initForm();
    })
  }
  onSubmit() {
    
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store.select('recipes')
      .pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => index === this.id);
        })
      )
      .subscribe(recipe => {
        console.log('82: =>',recipe)
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ing of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients

    })
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  

}
