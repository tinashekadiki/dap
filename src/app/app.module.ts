import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { PersonalinfoPageComponent } from './pages/personalinfopage/personalinfo-page.component';
import { ContactinfopageComponent } from './pages/contactinfopage/contactinfopage.component';
import { ReviewPageComponent } from './pages/reviewpage/review-page.component';
import { EmploymentinfoComponent } from './pages/employmentinfo/employmentinfo.component';
import { DiscloursesComponent } from './pages/disclourses/disclourses.component';
import { FinaldisclosureComponent } from './pages/finaldisclosure/finaldisclosure.component';
import { FinalPageComponent } from './pages/finalpage/final-page.component';
import { AdditionalpersonalComponent } from './pages/additionalpersonal/additionalpersonal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormatTimePipe, WaitingPageComponent } from './pages/waiting-page/waiting-page.component';
import { LinkInvalidComponent } from './pages/link-invalid/link-invalid.component'
import { FinancialInfoComponent } from './pages/finacialinfo/financial-info.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { RedirectingComponent } from './pages/redirecting/redirecting.component';
import { LoadingComponent } from './pages/loading/loading.component'
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ReviewCoborowerComponent } from './pages/review-coborower/review-coborower.component';
import { AppRoutingModule } from './app-routing.module';
import { AreadySubmittedComponent } from './pages/aready-submitted/aready-submitted.component';
import { AuthGuard } from './services/interceptors/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    PersonalinfoPageComponent,
    ContactinfopageComponent,
    ReviewPageComponent,
    EmploymentinfoComponent,
    DiscloursesComponent,
    FinaldisclosureComponent,
    FinalPageComponent,
    AdditionalpersonalComponent,

    WaitingPageComponent,
    LinkInvalidComponent,
    FinancialInfoComponent,
    FormatTimePipe,
    RedirectingComponent,
    LoadingComponent,
    ReviewCoborowerComponent,
    AreadySubmittedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width',
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [Title,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
