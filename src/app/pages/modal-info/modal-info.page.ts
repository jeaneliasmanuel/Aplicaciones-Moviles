import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() index: any;
  @Input() accion: any;
  @Input() nombre: any;
  @Input() telefono: any;
  @Input() correo: any;
  @Input() foto: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async Registar() {
    // Crea un objeto con los valores de los campos
    const contacto = {
      index: this.index,
      nombre: this.nombre,
      telefono: this.telefono,
      correo: this.correo,
      foto: this.foto
    };

    this.modalCtrl.dismiss(
      contacto
    );
  
  }

  Cancelar(){
    this.modalCtrl.dismiss();
  }

}
