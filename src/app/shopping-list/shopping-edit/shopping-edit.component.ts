import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]} }>
  ) { }
  
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditting.subscribe((index: number) => {
      this.edittedItemIndex = index;
      this.editMode = true;
      this.edittedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.edittedItem.name,
        amount: this.edittedItem.amount
      })
    });
  }
  //on Add/Update button clicking
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.edittedItemIndex, 
        ingredient: newIngredient}));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset({
      name: '',
      amount: ''
    });

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.edittedItemIndex));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
