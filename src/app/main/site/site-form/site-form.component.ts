import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  public form: FormGroup;
  geolocSite: number[] = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      approachTime: [0],
      averageRouteHeight: [0],
      latitudeP1: [0],
      longitudeP1: [0],
    });
  }
  ngOnInit(): void {
    this.loadData();
    this.geolocSite = [4.454554, 5.454545];
  }

  private loadData() {
    console.log('it works');
  }

  submit() {}
}
