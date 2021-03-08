import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openmenu: boolean;

  constructor() { }

  ngOnInit(): void {
    this.openmenu = false;
  }

  openMenu(){
    this.openmenu = true;
  }

  closeMenu(){
    this.openmenu = false;
  }

}
