import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  ButtonModule,
  DrawerModule,
  DCommonModule,
  AlertModule,
  ToastModule,
  TooltipModule,
  RadioModule,
  BreadcrumbModule,
  ModalModule
} from 'ng-devui';
import { I18nModule } from 'ng-devui/i18n';

const SHARED_MODULES = [
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  ButtonModule,
  DrawerModule,
  BreadcrumbModule,
  RadioModule,
  ModalModule
];
const COMPONENTS = [
];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DCommonModule,
    AlertModule,
    ClipboardModule,
    ToastModule,
    TooltipModule,
    I18nModule,
    ...SHARED_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    I18nModule,
    ...SHARED_MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot (): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
