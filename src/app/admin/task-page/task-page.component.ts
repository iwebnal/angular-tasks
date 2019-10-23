import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../shared/task.serice';
import { Observable } from 'rxjs';
import { Task } from '../../shared/interfaces';
import { switchMap } from 'rxjs/operators';

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
        return this.taskService.getById(params['id'])
      }))
  }

}
