import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MintingComponent } from './pages/minting/minting.component';
import { UserNftsComponent } from './pages/user-nfts/user-nfts.component';

var userId = localStorage.getItem("accountId");

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path:'upload', component: (() => { return userId ? MintingComponent : HomeComponent })() },
  { path:'mynfts', component: (() => { return userId ? UserNftsComponent : HomeComponent })() }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
