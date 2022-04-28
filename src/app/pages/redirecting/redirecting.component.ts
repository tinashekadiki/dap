import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecting',
  templateUrl: './redirecting.component.html',
  styleUrls: ['./redirecting.component.css']
})
export class RedirectingComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['review-coborower']);
    }, 4000);
  }

}
