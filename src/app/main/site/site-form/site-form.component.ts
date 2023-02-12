import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateSiteDto } from '../../../core/api/models/create-site-dto';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteDataDto } from '../../../core/api/models/site-data-dto';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  public form: FormGroup;
  public dialogMapHeader: string = 'Parking';
  public displayMap: boolean = false;
  public expositions: string[] = [];
  public approachTypes: string[] = [];
  public engagements: string[] = [];
  public equipments: string[] = [];
  public levels: string[] = [];
  public rockTypes: string[] = [];
  public routeProfiles: string[] = [];

  public coordinateP1: number[] = [];
  public coordinateP2: number[] = [];
  private selectedParking: number = 0;

  constructor(
    private fb: FormBuilder,

    private readonly siteService: SiteService
  ) {
    this.form = this.fb.group({
      name: [''],
      approachTime: [0],
      averageRouteHeight: [0],
      averageRouteNumber: [0],
      minLevel: [0],
      maxLevel: [0],
      equipment: [0],
      engagement: [0],
      approachType: [0],
      expositions: [''],
      routeProfiles: [''],
      rockType: [''],
    });
  }
  ngOnInit(): void {
    this.loadData();
  }
  public chooseLocalisation(parking: number): void {
    this.selectedParking = parking;
    this.displayMap = !this.displayMap;
  }

  private loadData() {
    this.siteService.siteControllerGetData().subscribe({
      next: data => {
        console.log(data.levels);
        this.levels = data.levels;
        this.rockTypes = data.rockTypes;
        this.approachTypes = data.approachTypes;
        this.expositions = data.expostions;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
        this.routeProfiles = data.routeProfiles;
      },
    });
  }

  public submit(): void {
    const site: CreateSiteDto = {
      name: this.form.controls['name'].value,
      approachTime: this.form.controls['approachTime'].value,
      minLevel: this.form.controls['minLevel'].value,
      averageRouteNumber: this.form.controls['averageRouteNumber'].value,
      averageRouteHeight: this.form.controls['averageRouteHeight'].value,
      mainParkingLat: String(this.coordinateP1[1]),
      mainParkingLng: String(this.coordinateP1[0]),
      secondaryParkingLat: String(this.coordinateP2[1]),
      secondaryParkingLng: String(this.coordinateP2[0]),
      engagement: this.form.controls['engagement'].value,
      equipment: this.form.controls['equipment'].value,
      approachType: this.form.controls['approachType'].value,
      maxLevel: this.form.controls['maxLevel'].value,
      expositions: this.form.controls['expositions'].value,
      rockType: this.form.controls['rockType'].value,
      routeProfiles: this.form.controls['routeProfiles'].value,
    };
    console.log(site);
    this.siteService
      .siteControllerCreateSite({
        body: site,
      })
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        },
      });
  }

  public addCoordinates($event: number[]) {
    if (this.selectedParking === 1) {
      this.coordinateP1 = $event;
    }
    if (this.selectedParking === 2) {
      this.coordinateP2 = $event;
    }
  }

  public validate(): void {
    this.displayMap = !this.displayMap;
  }
}
