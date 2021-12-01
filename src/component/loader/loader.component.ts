import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rib-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss', './../../../assets/core/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {
  isAnyActivated: boolean = false; 
  isLoading: boolean = false;

  start() {
    setTimeout(() => {
      this.isLoading = true;
      this.isAnyActivated = true;
    });
  }

  stop() {
    setTimeout(() => this.isLoading = false);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
