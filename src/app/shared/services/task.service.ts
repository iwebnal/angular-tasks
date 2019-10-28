import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Task } from '../interfaces';
import { environment } from 'src/environments/environment';
import { tap, take, timeInterval, flatMap, startWith } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    constructor(private http: HttpClient) {
    }

    create(task: Task): Observable<any> {
        return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
    }

    getAll(): Observable<any> {
        return interval(30000).pipe(
            startWith(0),
            flatMap(() => this.http.get(`${environment.fbDbUrl}/tasks.json`))
        )
    }

    getById(id: string): Observable<Task> {
        return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }

    update(task: Task): Observable<Task> {
        return this.http.patch<Task>(`${environment.fbDbUrl}/tasks/${task.id}.json`, task);
    }

}