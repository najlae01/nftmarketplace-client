import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MintingComponent } from './pages/minting/minting.component';
import { UserNftsComponent } from './pages/user-nfts/user-nfts.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: MintingComponent, canActivate: [AuthGuard] },
  { path: 'mynfts', component: UserNftsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
