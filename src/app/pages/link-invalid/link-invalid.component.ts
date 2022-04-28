import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-invalid',
  templateUrl: './link-invalid.component.html',
  styleUrls: ['./link-invalid.component.css']
})
export class LinkInvalidComponent implements OnInit {



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    sessionStorage.clear();

  }
}
