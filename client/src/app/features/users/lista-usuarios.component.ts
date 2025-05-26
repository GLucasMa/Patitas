import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
  console.log('🔥 Componente ListaUsuariosComponent cargado');
}

}
