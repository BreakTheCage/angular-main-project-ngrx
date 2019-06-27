import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
  constructor(private shoppingListService: ShoppingListService){}
  
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
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
