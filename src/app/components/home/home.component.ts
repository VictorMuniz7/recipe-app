import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { Meal } from 'src/app/interface/meal';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { DataResponse } from 'src/app/interface/data-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  meals: Meal[] = [];
  clicked: boolean = false;
  postClicked: boolean = false;
  currentMeal: any;

  form = this.formBuilder.group({
    title: ['', Validators.required],
    type: ['', Validators.required],
    serving: [null, [Validators.required, Validators.min(1)]],
    difficulty: ['', Validators.required],
    image: ['', Validators.required],
    ingredients: this.formBuilder.array<string>([]),
    steps: this.formBuilder.array<string>([]),
  });

  constructor(
    private recipeService: RecipeService,
    private formBuilder: NonNullableFormBuilder
  ){}

  ngOnInit(): void {
    this.refreshData()
  }

  submit(){
    if(this.form.valid){
      this.postClicked = false;
      const mealData = this.form.value;

      const meal: Meal = {
        title: mealData.title ?? '',
        type: mealData.type ?? '',
        serving: mealData.serving ?? 0,
        difficulty: mealData.difficulty ?? '',
        image: mealData.image ?? '',
        ingredients: mealData.ingredients ?? [],
        steps: mealData.steps ?? [],
      }

      this.meals.push(meal);
      this.form.reset();
    }
  }

  refreshData(){
    this.recipeService.getAllMeals().subscribe({
      next: (data) => this.meals = data.meals

    })
  }

  addIngredient(ingredient: string){
    if(ingredient != ''){
      this.form.value.ingredients?.push(ingredient)
    }
  }

  addStep(step: string){
    if(step != ''){
      this.form.value.steps?.push(step)
    }
  }

  showCard(index: number){
    this.currentMeal = this.meals[index];
    this.clicked = true;
  }

  closeCard(){
    this.clicked = false
  }

  closePostCard(){
    this.postClicked = false
  }


}
