import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/** @angular/material */
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../material-module';

//import { SwiperModule } from 'swiper/angular';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LandingRoutingModule } from './landing-routing.module';

import { SourceService } from '../services/source.service';
import { VegetablesService } from '../services/vegetables.service';

import { LandingComponent } from './landing.component';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { CapabilitiesComponent } from './capabilities/capabilities.component';
import { FeaturesComponent } from './features/features.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { TeamComponent } from './team/team.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    LandingComponent, 
    BannerComponent, 
    AboutComponent, 
    OurServicesComponent, 
    CapabilitiesComponent, 
    FeaturesComponent, 
    AdvantagesComponent, 
    TeamComponent, 
    ContactsComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    CommonModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule
  ],
  providers: [
    SourceService,
    VegetablesService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class LandingModule { }
