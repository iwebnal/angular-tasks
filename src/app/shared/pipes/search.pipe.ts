import { Pipe, PipeTransform } from "@angular/core";
import { Task } from 'src/app/shared/interfaces';

@Pipe({
    name: 'searchTasks'
})

export class SearchPipe implements PipeTransform {
    transform(tasks: Task[], search = ''): Task[] {
        if(!search.trim()) {
            return tasks;
        }

        return tasks.filter(task => {
            return task.title.toLowerCase().includes(search.toLowerCase());
        });
    }
}