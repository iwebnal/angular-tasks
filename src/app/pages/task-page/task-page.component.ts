import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  task$: Observable<Task>

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.task$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.taskService.getById(params['id']).pipe(
          map((task: Task) => {
              return {
                  ...task,
                  id: params['id'],
                  date: new Date(task.date)
              }
          })
      )
      }))
  }

}
