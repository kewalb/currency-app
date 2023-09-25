import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './exchange/exchange.component';
import { HomeComponent } from './home/home.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "exchange", component: ExchangeComponent},
  {path: "compare", component: CompareComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [HomeComponent, ExchangeComponent]
