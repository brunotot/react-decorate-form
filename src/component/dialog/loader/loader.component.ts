import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'ngxp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
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
