import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosPageRoutingModule } from './contactos-routing.module';

import { ContactosPage } from './contactos.page';
import { ModalInfoPage } from '../pages/modal-info/modal-info.page';
import { ModalInfoPageModule } from '../pages/modal-info/modal-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosPageRoutingModule,
    ModalInfoPageModule
  ],
  declarations: [ContactosPage]
})
export class ContactosPageModule {}
