import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatNativeDateModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { ScrumboardPageComponent } from './pages/scrumboard-page/scrumboard-page.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: LoginPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'scrumboard', component: ScrumboardPageComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'task/:id', component: TaskPageComponent},
      {path: 'task/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    MainPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    ScrumboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    TaskPageComponent,
    SearchPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MatSelectModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
