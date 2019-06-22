import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe', 'https://d1i2hi5dlrpq5n.cloudfront.net/~/media/images/2018/pizza/wetherspoon-pizza.jpg?h=242&la=en&w=555&vs=1&d=20180824T120817Z&crop=1&cropx=50&cropy=50&hash=F1E84921E592516C79E29B8FB69949CD4C41AB31'),
    new Recipe('A Test Recipe', 'This is a test recipe', 'https://d1i2hi5dlrpq5n.cloudfront.net/~/media/images/2018/pizza/wetherspoon-pizza.jpg?h=242&la=en&w=555&vs=1&d=20180824T120817Z&crop=1&cropx=50&cropy=50&hash=F1E84921E592516C79E29B8FB69949CD4C41AB31')

  ];
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe:Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
