import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActons from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private subscription: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) { }
  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // console.log('Ingredient: ', this.ingredients);

    // this.subscription =  this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    //   console.log('Ingredient: ', this.ingredients);
    // });

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    // this.shoppingListService.startedEditting.next(index);
    this.store.dispatch(new ShoppingListActons.StartEdit(index))

  }

}
