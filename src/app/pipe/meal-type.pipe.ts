import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mealType'
})
export class MealTypePipe implements PipeTransform {

  transform(value: string): string {

    switch(value){
      case 'Breakfast':
        return 'mug-saucer';

      case 'Lunch':
        return 'utensils';

      case 'Snack':
        return 'burger';

      case 'Supper':
        return 'moon';

      default:
        return ''
    }
  }

}
