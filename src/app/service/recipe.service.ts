import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../interface/meal';
import { DataResponse } from '../interface/data-response';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = "/assets/db.json"

  constructor(
    private http: HttpClient
  ) { }

  getAllMeals(): Observable<DataResponse>{
    return this.http.get<DataResponse>(`${this.baseUrl}`);
  }

  postMeal(meal: Meal): Observable<Meal>{
    return this.http.post<Meal>(`${this.baseUrl}`, meal);
  }
}
