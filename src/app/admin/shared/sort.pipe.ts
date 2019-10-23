import { Pipe, PipeTransform } from "@angular/core";
import { Task } from 'src/app/shared/interfaces';

@Pipe({
    name: 'sortTasks'
})

export class SortPipe implements PipeTransform {
    transform(tasks: Task[], column = '', sortDerection = 0): Task[] {
        if(!column.trim() || sortDerection === 0) {
            return tasks;
        }

        const newArr = tasks.slice().sort((task1, task2) => {
            if(task1[column] < task2[column]) {
                return -1 * sortDerection;
            }

            return 1 * sortDerection;
        } );

        return newArr;
    }
}