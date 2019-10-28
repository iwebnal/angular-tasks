import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-scrumboard-page',
  templateUrl: './scrumboard-page.component.html',
  styleUrls: ['./scrumboard-page.component.css']
})
export class ScrumboardPageComponent implements OnInit, OnDestroy {
  tasksTodo: Task[] = [];
  tasksDoing: Task[] = [];
  tasksDone: Task[] = [];

  taskSubscription: Subscription;
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
    if(this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
    
    this.taskSubscription = this.tasksService.getAll().pipe(map((response: {[key: string]: any}) => {
      return Object.keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }));
    })).subscribe( tasks => {
      this.tasksTodo = tasks.filter(item => item.status === 'Todo').sort(this.sortPriority);
      this.tasksDoing = tasks.filter(item => item.status === 'Doing').sort(this.sortPriority);
      this.tasksDone = tasks.filter(item => item.status === 'Done').sort(this.sortPriority);
    })
    
  }

  sortPriority(task1: Task, task2: Task) {
    if(task1.priority === 'high-priority' && task2.priority != 'high-priority') {
      return -1;
    }else if(task1.priority === 'medium-priority' && task2.priority === 'low-priority') {
      return -1;
    }
    return 1;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      event.container.data[event.currentIndex].status = event.container.id;
      this.updateSubscription = this.tasksService.update(event.container.data[event.currentIndex]).subscribe();
    }
  }

  ngOnDestroy() {
    if(this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }

    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
