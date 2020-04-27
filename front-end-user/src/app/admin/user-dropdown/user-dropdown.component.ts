import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Popper from 'popper.js';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', {static: false}) btnDropdownRef: ElementRef;
  popper = document.createElement('div');

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.popper.innerHTML = `<div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" style="min-width:12rem" #popoverDropdownRef>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Action
  </a>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Another action
  </a>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Something else here
  </a>
  <div class="h-0 my-2 border border-solid border-gray-200"></div>
  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800">
    Thoát
    <span class="text-gray-800">
    <i class="fa fa-sign-out"></i>
</span>
  </a>
</div>`;
  }

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
      this.destroyPopper();
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }

  destroyPopper() {
    this.popper.parentNode.removeChild(this.popper);
  }

  createPoppper() {
    new Popper(this.btnDropdownRef.nativeElement, this.popper, {
      placement: 'bottom-end'
    });
    this.btnDropdownRef.nativeElement.parentNode.insertBefore(this.popper, this.btnDropdownRef.nativeElement.nextSibling);

  }

}
