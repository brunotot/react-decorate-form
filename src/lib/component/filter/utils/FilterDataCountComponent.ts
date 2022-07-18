import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "filter-data-count",
  template: `<span style="margin-left: 0.25rem">
    ({{ filteredCount }})<sup style="color: #808080">{{ count }}</sup>
  </span>`,
})
export class FilterDataCountComponent implements OnInit {
  @Input() count!: number;
  @Input() filteredCount!: number;

  constructor() {}

  ngOnInit(): void {}
}
