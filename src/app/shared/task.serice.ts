import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, FbCreateResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    constructor(private http: HttpClient) {
    }

    create(task: Task): Observable<Task> {
        return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
        .pipe(
            map((response: FbCreateResponse) => {
                return {
                    ...task,
                    id: response.name,
                    date: new Date(task.date)
                }
            })
        )
    }

    getAll(): Observable<Task[]> {
        return this.http.get(`${environment.fbDbUrl}/tasks.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object.keys(response).map(key => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                }));
            }));
    }

    getById(id: string): Observable<Task> {
        return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
            .pipe(
                map((task: Task) => {
                    return {
                        ...task,
                        id,
                        date: new Date(task.date)
                    }
                })
            )
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`)
    }

    update(task: Task): Observable<Task> {
        return this.http.patch<Task>(`${environment.fbDbUrl}/tasks/${task.id}.json`, task);
    }

}