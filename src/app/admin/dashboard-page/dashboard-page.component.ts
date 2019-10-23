import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/shared/task.serice';
import { Task } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

enum LoadingState {
  none,
  loading,
  loaded
} 

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  taskSubscription: Subscription;
  deleteSubscription: Subscription;
  searchStr = '';
  sortColumn = '';
  sortDerection: number = 0;
  intervalId: any;
  loadingState = LoadingState.none;

  constructor(
    private tasksService: TaskService,
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    this.getAll();
    this.intervalId = setInterval(() => {
      if(this.loadingState != LoadingState.loading) {
        this.getAll();
      }
    }, 3000);
  }

  getAll() {
    this.loadingState = LoadingState.loading;
    this.taskSubscription = this.tasksService.getAll().subscribe( tasks => {
      this.tasks = tasks;
      this.loadingState = LoadingState.loaded;
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

    clearInterval(this.intervalId);
  }
}
