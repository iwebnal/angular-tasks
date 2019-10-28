import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task, Priority, Status, FbCreateResponse } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  public priorities: Priority[];
  public statuses: Status[];

  constructor(
    private tasksService: TaskService,
    private router: Router
  ) {
    this.priorities = environment.priorities;
    this.statuses = environment.statuses;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      planningTime: new FormControl(null, Validators.required),
      spendingTime: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    const task: Task = {
      title : this.form.value.title,
      text : this.form.value.text,
      author : this.form.value.author,
      date : new Date(),
      priority : this.form.value.priority,
      planningTime : this.form.value.planningTime,
      spendingTime : this.form.value.spendingTime,
      status : this.form.value.status,
    }

    this.tasksService.create(task).pipe(
      map((response: FbCreateResponse) => {
        return {
            ...task,
            id: response.name,
            date: new Date(task.date)
        }
      })
    )
    .subscribe(() => {
      this.form.reset();
      this.router.navigate(['/dashboard']);
    });
  }

}
