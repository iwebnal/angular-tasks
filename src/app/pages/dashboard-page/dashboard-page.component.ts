import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  taskSubscription: Subscription;
  deleteSubscription: Subscription;
  updateSubscription: Subscription;
  searchStr = '';
  sortColumn = '';
  sortDerection: number = 0;
  intervalId: any;

  constructor(
    private tasksService: TaskService,
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.taskSubscription = this.tasksService.getAll().pipe(map((response: {[key: string]: any}) => {
      return Object.keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }));
    })).subscribe( tasks => {
      this.tasks = tasks;
    })
  }

  remove(id: string) {
    this.deleteSubscription = this.tasksService.remove(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    })
  }

  sort(str: string) {
    this.sortColumn = str;
    if(this.sortDerection === 0) {
      this.sortDerection = 1;
    }else if(this.sortDerection === 1) {
      this.sortDerection = -1;
    }else if(this.sortDerection === -1) {
      this.sortDerection = 0;
    }
  }

  ngOnDestroy() {
    if(this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }

    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
