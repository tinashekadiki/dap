import { AreadySubmittedComponent } from './pages/aready-submitted/aready-submitted.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalpersonalComponent } from './pages/additionalpersonal/additionalpersonal.component';
import { ContactinfopageComponent } from './pages/contactinfopage/contactinfopage.component';
import { DiscloursesComponent } from './pages/disclourses/disclourses.component';
import { EmploymentinfoComponent } from './pages/employmentinfo/employmentinfo.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FinancialInfoComponent } from './pages/finacialinfo/financial-info.component';
import { FinaldisclosureComponent } from './pages/finaldisclosure/finaldisclosure.component';
import { FinalPageComponent } from './pages/finalpage/final-page.component';
import { LinkInvalidComponent } from './pages/link-invalid/link-invalid.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { PersonalinfoPageComponent } from './pages/personalinfopage/personalinfo-page.component';
import { RedirectingComponent } from './pages/redirecting/redirecting.component';
import { ReviewCoborowerComponent } from './pages/review-coborower/review-coborower.component';
import { ReviewPageComponent } from './pages/reviewpage/review-page.component';
import { WaitingPageComponent } from './pages/waiting-page/waiting-page.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { AuthGuard } from './services/interceptors/auth-interceptor.service';

const routes: Routes = [
  {
    path: 'additionalpersonalinfo',
    component: AdditionalpersonalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finaldisclosure',
    component: FinaldisclosureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'disclosures',
    component: DiscloursesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome/:id',
    component: WelcomepageComponent
  },
  {
    path: '',
    component: WelcomepageComponent
  },
  {
    path: 'personalinfo',
    component: PersonalinfoPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contactinfo',
    component: ContactinfopageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employmentinfo',
    component: EmploymentinfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finacialinfo',
    component: FinancialInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviewinfo',
    component: ReviewPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'review-coborower',
    component: ReviewCoborowerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finalpage',
    component: FinalPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'waiting-page',
    component: WaitingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'link-invalid',
    component: LinkInvalidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'redirect',
    component: RedirectingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: 'aready-submitted',
    component: AreadySubmittedComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
