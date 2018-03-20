import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdSnackBar, MdDialog } from '@angular/material';
import 'hammerjs';
import { HttpModule, Http } from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { RlTagInputModule } from 'angular2-tag-input';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { routing, appRoutingProviders } from './app.routing';
// import { MdInputInlineModule } from 'md-input-inline';
// import { CKEditorModule } from 'ng2-ckeditor';

import { CustomerService } from './services/customer.service';
import { PayphoneService_ } from './services/payphone.service';
import { CountryService } from './services/country.service';
import { ModulationService } from './services/modulation.service';
import { TariffService } from './services/tariff.service';
import { GroupService } from './services/group.service';
import { ZoneService } from './services/zone.service';
import { PrefixService } from './services/prefix.service';
import { ContractService } from './services/contract.service';

// Public Services
import { SnackBar } from './services/snack-bar.service';
import { SessionService } from './services/session.service';
import { Broadcaster } from './shared/broadcaster';
import { MessageEvent } from './services/message-event.service';
import { HttpClient } from './shared/http-client';
import { Utils } from './shared/utils';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { PrepaidContractCreateComponent  } from './components/prepaid-contract-create/prepaid-contract-create.component';
import { ContractTemplateCreateComponent } from './components/contract-template-create/contract-template-create.component';
import { ContractTemplatesComponent } from './components/contract-templates/contract-templates.component';
import { PostpaidServicesCreateComponent } from './components/postpaid-services-create/postpaid-services-create.component';
import { PayphoneCreateComponent } from './components/payphone-create/payphone-create.component';
import { PayphonesComponent } from './components/payphones/payphones.component';
import { SelfCareLoginComponent } from './components/self-care-login/self-care-login.component';
import { ServicesComponent } from './components/services/services.component';
import { TaxTypesComponent } from './components/tax-types/tax-types.component';
import { ServiceTypesComponent } from './components/service-types/service-types.component';
import { PostpaidServicesComponent } from './components/postpaid-services/postpaid-services.component';
import { PrepaidServicesComponent } from './components/prepaid-services/prepaid-services.component';
import { PrepaidServicesCreateComponent } from './components/prepaid-services-create/prepaid-services-create.component';
import { PostpaidServicesViewComponent } from './components/postpaid-services-view/postpaid-services-view.component';
import { PrepaidServicesViewComponent } from './components/prepaid-services-view/prepaid-services-view.component';
import { PayphoneComponent } from './components/payphone/payphone.component';
import { InlineEditComponent } from './components/custom/inline-edit/inline-edit.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { BackofficeLinksComponent } from './components/backoffice-links/backoffice-links.component';
import { ModulationCreateComponent } from './components/modulation-create/modulation-create.component';
import { ModulationsComponent } from './components/modulations/modulations.component';
import { CustomerAddressComponent } from './components/customer-address/customer-address.component';
import { ContactComponent } from './components/contact/contact.component';


import { ConfirmDialogComponent, ConfirmDialog } from './components/custom/confirm-dialog/confirm-dialog.component';
import { TariffVersionCreateComponent } from './components/tariff-version-create/tariff-version-create.component';
import { TariffVersionsComponent } from './components/tariff-versions/tariff-versions.component';
import { TeloAgentComponent } from './components/telo-agent/telo-agent.component';
import { PspComponent } from './components/psp/psp.component';
import { TecComponent } from './components/tec/tec.component';
import { TeloOperatorComponent } from './components/telo-operator/telo-operator.component';
import { TariffsComponent } from './components/tariffs/tariffs.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpecialDaysComponent } from './components/special-days/special-days.component';
import { PromptDialogComponent, PromptDialog } from './components/custom/prompt-dialog/prompt-dialog.component';
import { PrepaidContractComponent } from './components/prepaid-contract/prepaid-contract.component';
import { PaymentUploadStatementComponent } from './components/payment-upload-statement/payment-upload-statement.component';
import { TaTopupDialogComponent, TaTopupDialog } from './components/custom/ta-topup-dialog/ta-topup-dialog.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ToggleComponent } from './components/custom/toggle/toggle.component';
import { ContractTemplateComponent } from './components/contract-template/contract-template.component';
import { RichTextFieldComponent } from './components/custom/rich-text-field/rich-text-field.component';
import { PrepaidServicesPaymentComponent } from './components/prepaid-services-payment/prepaid-services-payment.component';
import { PrepaidContractSupplementCreateComponent } from './components/prepaid-contract-supplement-create/prepaid-contract-supplement-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerCreateComponent,
    ContractTemplateCreateComponent,
    ContractTemplatesComponent,
    PostpaidServicesCreateComponent,
    PayphoneCreateComponent,
    PayphonesComponent,
    SelfCareLoginComponent,
    ServicesComponent,
    TaxTypesComponent,
    ServiceTypesComponent,
    PostpaidServicesComponent,
    PrepaidServicesComponent,
    PrepaidServicesCreateComponent,
    PrepaidServicesViewComponent,
    PostpaidServicesViewComponent,
    PayphoneComponent,
    InlineEditComponent,
    GroupsComponent,
    GroupCreateComponent,
    BackofficeLinksComponent,
    ModulationCreateComponent,
    ModulationsComponent,
    CustomerAddressComponent,
    ContactComponent,
    ConfirmDialogComponent,
    ConfirmDialog,
    TariffVersionCreateComponent,
    TariffVersionsComponent,
    TeloAgentComponent,
    PspComponent,
    TecComponent,
    TeloOperatorComponent,
    TariffsComponent,
    HomeContentComponent,
    FooterComponent,
    TariffsComponent,
    SpecialDaysComponent,
    PromptDialogComponent,
    PromptDialog,
    PrepaidContractCreateComponent,
    PaymentUploadStatementComponent,
    TaTopupDialogComponent,
    TaTopupDialog,
    PrepaidContractComponent,
    PaymentsComponent,
    ContractTemplateComponent,
    ToggleComponent,
    RichTextFieldComponent,
    PrepaidServicesPaymentComponent,
    PrepaidContractSupplementCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) =>
        new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    routing,
    RlTagInputModule,
    Ng2AutoCompleteModule
    // MdInputInlineModule
  ],
  providers: [appRoutingProviders,
    HttpClient,
    CustomerService,
    PayphoneService_,
    CountryService,
    ModulationService,
    TariffService,
    GroupService,
    ZoneService,
    PrefixService,
    MdSnackBar,
    SnackBar,
    MdDialog,
    ContractService,
    SessionService,
    Broadcaster,
    MessageEvent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
{ }
{ }
