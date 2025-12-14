import {Recipe} from '../../models/recipe';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard implements OnInit {
  @Input() recipe!: Recipe;
  ngOnInit() {
    console.log('Recipe card ngOnInit:', this.recipe);
  }

}
