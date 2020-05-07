import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-list-user',
  templateUrl: './delete-list-user.component.html',
  styleUrls: ['./delete-list-user.component.scss']
})
export class DeleteListUserComponent implements OnInit {
  showModalDelete = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleModalDelete() {
    this.showModalDelete = !this.showModalDelete;
  }

  closeModal() {
    this.showModalDelete = false;
  }

  confirmDelete() {

  }
}
