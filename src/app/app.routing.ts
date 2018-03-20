import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { ContractTemplateCreateComponent } from './components/contract-template-create/contract-template-create.component';
import { ContractTemplatesComponent } from './components/contract-templates/contract-templates.component';
import { PayphonesComponent } from './components/payphones/payphones.component';
import { PayphoneCreateComponent } from './components/payphone-create/payphone-create.component';
import { PayphoneComponent } from './components/payphone/payphone.component';
import { SelfCareLoginComponent } from './components/self-care-login/self-care-login.component';
import { TaxTypesComponent } from './components/tax-types/tax-types.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceTypesComponent } from './components/service-types/service-types.component';
import { PostpaidServicesCreateComponent } from './components/postpaid-services-create/postpaid-services-create.component';
import { PrepaidServicesCreateComponent } from './components/prepaid-services-create/prepaid-services-create.component';
import { PostpaidServicesComponent } from './components/postpaid-services/postpaid-services.component';
import { PostpaidServicesViewComponent } from './components/postpaid-services-view/postpaid-services-view.component';
import { PrepaidServicesComponent } from './components/prepaid-services/prepaid-services.component';
import { PrepaidServicesViewComponent } from './components/prepaid-services-view/prepaid-services-view.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { ModulationCreateComponent } from './components/modulation-create/modulation-create.component';
import { ModulationsComponent } from './components/modulations/modulations.component';
import { TariffVersionCreateComponent } from './components/tariff-version-create/tariff-version-create.component';
import { TariffVersionsComponent } from './components/tariff-versions/tariff-versions.component';
import { TariffsComponent } from './components/tariffs/tariffs.component';
import { SpecialDaysComponent } from './components/special-days/special-days.component';
import { PrepaidContractCreateComponent } from './components/prepaid-contract-create/prepaid-contract-create.component';
import { PrepaidContractComponent } from './components/prepaid-contract/prepaid-contract.component';
import { PaymentUploadStatementComponent } from './components/payment-upload-statement/payment-upload-statement.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PrepaidServicesPaymentComponent } from './components/prepaid-services-payment/prepaid-services-payment.component';
import { ContractTemplateComponent } from './components/contract-template/contract-template.component';
import { PrepaidContractSupplementCreateComponent } from './components/prepaid-contract-supplement-create/prepaid-contract-supplement-create.component';




const appRoutes: Routes = [
  // Back office
  { path: 'backoffice/login', component: LoginComponent },
  { path: 'backoffice/customers', component: CustomersComponent },
  { path: 'backoffice/customers/:id', component: CustomerComponent },
  { path: 'backoffice/customer/create', component: CustomerCreateComponent },
  { path: 'backoffice/contract-templates', component: ContractTemplatesComponent },
  { path: 'backoffice/contract-template/create', component: ContractTemplateCreateComponent },
  { path: 'backoffice/contract-templates/:id', component: ContractTemplateComponent },
  { path: 'backoffice/payphones', component: PayphonesComponent },
  { path: 'backoffice/payphone/create', component: PayphoneCreateComponent },
  { path: 'backoffice/payphones/:id', component: PayphoneComponent },
  { path: 'backoffice/tax-type/create', component: TaxTypesComponent },
  { path: 'backoffice/service-types', component: ServiceTypesComponent },
  { path: 'backoffice/postpaid-service/create', component: PostpaidServicesCreateComponent },
  { path: 'backoffice/prepaid-service/create', component: PrepaidServicesCreateComponent },
  { path: 'backoffice/postpaid-services', component: PostpaidServicesComponent },
  { path: 'backoffice/postpaid-services/:id', component: PostpaidServicesViewComponent },
  { path: 'backoffice/prepaid-services', component: PrepaidServicesComponent },
  { path: 'backoffice/customers/:customerId/prepaid-services/:id', component: PrepaidServicesViewComponent },
  { path: 'backoffice/prepaid-services/:id', component: PrepaidServicesViewComponent },
  { path: 'backoffice/tariff-versions/:id', component: GroupsComponent },
  { path: 'backoffice/tariff-versions/:id/groups', component: GroupsComponent },
  { path: 'backoffice/group/create', component: GroupCreateComponent },
  { path: 'backoffice/modulation/create', component: ModulationCreateComponent },
  { path: 'backoffice/modulations', component: ModulationsComponent },
  { path: 'backoffice/tariff-version/create', component: TariffVersionCreateComponent },
  { path: 'backoffice/tariff-versions', component: TariffVersionsComponent },
  { path: 'backoffice/special-days', component: SpecialDaysComponent },
  { path: 'backoffice/tariff-versions/:id/tariffs', component: TariffsComponent },
  { path: 'backoffice/payments', component: PaymentsComponent },
  { path: 'backoffice/customers/:id/prepaid-contract/create', component: PrepaidContractCreateComponent },
  { path: 'backoffice/customers/:customerId/prepaid-contracts/:contractId', component: PrepaidContractComponent },
  {
    path: 'backoffice/customers/:customerId/prepaid-contracts/:contractId/services/:serviceId/create-supplement',
    component: PrepaidContractSupplementCreateComponent
  },
  { path: 'backoffice/payment/upload-statement', component: PaymentUploadStatementComponent },
  { path: 'backoffice/customers/:customerId/prepaid-services/:prepaidServiceId/payment', component: PrepaidServicesPaymentComponent },
  { path: 'backoffice/', component: HomeComponent },

  // Self Care
  { path: '', component: HomeComponent },
  { path: 'login', component: SelfCareLoginComponent },
  // 404
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
