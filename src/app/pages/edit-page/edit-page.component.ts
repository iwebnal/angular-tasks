import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Task, Priority, Status } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  task: Task;
  submitted: boolean = false;
  updateSubscription: Subscription;

  public priorities: Priority[];
  public statuses: Status[];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.priorities = environment.priorities;
    this.statuses = environment.statuses;
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.taskService.getById(params['id'])
         .pipe(
            map((task: Task) => {
              return {
                ...task,
                id: params['id'],
                date: new Date(task.date)
              }
            })
          )
      })
    ).subscribe((task: Task) => {
      this.task = task;
      this.form = new FormGroup({
        title: new FormControl(task.title, Validators.required),
        text: new FormControl(task.text, Validators.required),
        priority: new FormControl(task.priority, Validators.required),
        planningTime: new FormControl(task.planningTime, Validators.required),
        spendingTime: new FormControl(task.spendingTime, Validators.required),
        status: new FormControl(task.status, Validators.required),
      })
    })
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubscription = this.taskService.update({
      ...this.task,
      text: this.form.value.text,
      title: this.form.value.title,
      priority: this.form.value.priority,
      planningTime: this.form.value.planningTime,
      spendingTime: this.form.value.spendingTime,
      status: this.form.value.status,
    }).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/dashboard']);
    })
    
  }

  ngOnDestroy() {
    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

}
