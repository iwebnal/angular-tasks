import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {TaskPageComponent} from './admin/task-page/task-page.component';
import { LoginPageComponent } from './admin/login-page/login-page.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './admin/create-page/create-page.component';
import { EditPageComponent } from './admin/edit-page/edit-page.component';
import { AuthGuard } from './admin/shared/services/auth.guard';
import { SearchPipe } from './admin/shared/search.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SortPipe } from './admin/shared/sort.pipe';
import { MatSelectModule, MatNativeDateModule } from '@angular/material';
import { NavMenuComponent } from './admin/nav-menu/nav-menu.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
  {path: 'task/:id', component: TaskPageComponent},
  {path: 'task/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    NavMenuComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    TaskPageComponent,
    SearchPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
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
