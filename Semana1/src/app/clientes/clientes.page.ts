import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes:any = [];

  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.ObtenerClientes().subscribe(res=>{
      console.log("Resultado",res);
      this.clientes=res;
    });
  }

  navHome(){
    this.router.navigate(['/home'])
  }

  ObtenerClientes(){
    return this.http
    .get("assets/clientes_data.json")
    .pipe(
      map((res:any) =>{
        return res.data;
      })
    )
  }
}
