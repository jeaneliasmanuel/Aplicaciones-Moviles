import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from "rxjs/operators";
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../pages/modal-info/modal-info.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos:any = [];
  constructor(private http:HttpClient, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.ObtenerContactos().subscribe(res=>{
    console.log("Resultado",res);
    this.contactos=res;
    });
  }

  ObtenerContactos(){
    return this.http
    .get("assets/contactos.json")
    .pipe(
      map((res:any) =>{
      return res.data;
      })
    )
  }
  
  async agregarContacto(){
    // Se crea una instancia de un modal utilizando el controlador de modales
    const modal = await this.modalCtrl.create(
      {
        component: ModalInfoPage,
        componentProps: {
          index: -1,
          accion:"Agregar",
          nombre: "",
          telefono: "",
          correo: "",
          foto: ""
        }
      }
    );
    // Se muestra el modal
    await modal.present();
    // Se espera hasta que el modal se cierre y se obtiene la data devuelta por el modal
    const { data } = await modal.onDidDismiss();
    // Se elimina la propiedad "index" de la data antes de agregarla al arreglo "contactos"
    delete data.index;
    // Se agrega la data al arreglo "contactos"
    this.contactos.push(data);
}

// Definición de la función asincrónica "eliminarContacto" que toma un índice como argumento
async eliminarContacto(index: number) {
  // Verifica que el índice proporcionado sea válido (dentro del rango de los contactos existentes)
  if (index >= 0 && index < this.contactos.length) {
      // Crea una instancia de un cuadro de diálogo de confirmación utilizando el controlador de alertas
      const alert = await this.alertController.create({
          header: 'Confirmación', // Título del cuadro de diálogo
          message: '¿Estás seguro de que deseas eliminar este contacto?', // Mensaje de confirmación
          buttons: [
              {
                  text: 'Cancelar', // Botón para cancelar la acción
                  role: 'cancel',   // Define el rol del botón como 'cancel' para cerrar el cuadro de diálogo
                  cssClass: 'secondary',
                  handler: () => {
                      // El usuario canceló la acción, no se hace nada
                  }
              },
              {
                  text: 'Eliminar', // Botón para confirmar la eliminación del contacto
                  handler: () => {
                      // El usuario confirmó la acción, se elimina el contacto del arreglo "contactos"
                      this.contactos.splice(index, 1); // Elimina 1 elemento en la posición 'index'
                  }
              }
          ]
      });

      // Se muestra el cuadro de diálogo de confirmación
      await alert.present();
  }
}
  

  // Definición de la función asincrónica "editarContacto" que toma un índice como argumento
  async editarContacto(index: number) {
    // Verifica que el índice proporcionado sea válido (dentro del rango de los contactos existentes)
    if (index >= 0 && index < this.contactos.length) {
        // Obtiene el contacto existente en el índice proporcionado
        const contacto = this.contactos[index];
        // Crea una instancia de un modal utilizando el controlador de modales
        const modal = await this.modalCtrl.create(
          {
            component: ModalInfoPage, // Componente que se mostrará en el modal
            componentProps: {
              index: index,               // Propiedad: index con el índice del contacto
              accion: "Editar",          // Propiedad: accion con valor "Editar"
              nombre: contacto.nombre,   // Propiedad: nombre con el nombre del contacto
              telefono: contacto.telefono, // Propiedad: telefono con el teléfono del contacto
              correo: contacto.correo,     // Propiedad: correo con el correo del contacto
              foto: contacto.foto          // Propiedad: foto con la foto del contacto
            }
          }
        );
        
        // Se muestra el modal
        await modal.present();
        // Se espera hasta que el modal se cierre y se obtiene la data devuelta por el modal
        const { data } = await modal.onDidDismiss();
        // Se actualizan los datos del contacto en el arreglo "contactos" con los datos editados
        this.contactos[index].nombre = data.nombre;
        this.contactos[index].telefono = data.telefono;
        this.contactos[index].correo = data.correo;
        this.contactos[index].foto = data.foto;
    }
}

}