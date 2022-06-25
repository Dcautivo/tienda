import { Component, OnInit } from '@angular/core';

declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto:any = {};
  public file:any = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if(registroForm.valid){

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

  fileChangeEvent(event:any):void{
    var file;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      console.log(file);
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay un imagen de envio'
      });
    }
    
    if(this.file.size <= 4000000){
      if(this.file.type == 'image/png' || this.file.type == 'image/webp' || this.file.type == 'image/jpg' || this.file.type == 'image/gif' || this.file.type == 'image/jpeg'){

        // const reader = FileReader();
        // reader.onload = () =>

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor:'#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor:'#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      });
    }
  }

}
