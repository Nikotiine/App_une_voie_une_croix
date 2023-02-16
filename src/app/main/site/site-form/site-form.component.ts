import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateSiteDto } from '../../../core/api/models/create-site-dto';
import { SiteService } from '../../../core/api/services/site.service';
import { ApiAddressService } from '../../../core/app/services/api-address.service';
import { MessageService } from 'primeng/api';
import { LevelsDto } from '../../../core/api/models/levels-dto';
import { ExpositionsDto } from '../../../core/api/models/expositions-dto';
import { ApproachTypeDto } from '../../../core/api/models/approach-type-dto';
import { EngagementDto } from '../../../core/api/models/engagement-dto';
import { EquipmentDto } from '../../../core/api/models/equipment-dto';
import { RockTypeDto } from '../../../core/api/models/rock-type-dto';
import { RouteProfileDto } from '../../../core/api/models/route-profile-dto';
import { Router } from '@angular/router';
import { Region } from '../../../core/app/models/Region';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { RegionDto } from '../../../core/api/models/region-dto';
import { DepartmentService } from '../../../core/api/services/department.service';
import { DepartmentDto } from '../../../core/api/models/department-dto';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  public form: FormGroup;
  public dialogMapHeader: string = 'Parking';
  public displayMap: boolean = false;
  public expositions: ExpositionsDto[] = [];
  public approachTypes: ApproachTypeDto[] = [];
  public engagements: EngagementDto[] = [];
  public equipments: EquipmentDto[] = [];
  public levels: LevelsDto[] = [];
  public rockTypes: RockTypeDto[] = [];
  public routeProfiles: RouteProfileDto[] = [];
  public coordinateP1: number[] = [];
  public regions: RegionDto[] = [];
  public mapOptions: MapOptions;
  public departments: DepartmentDto[] = [];
  public coordinateP2: number[] = [];
  public selectedParking: number = 0;
  public displayP1: boolean = false;
  public displayP2: boolean = false;
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';
  private toastDetailSuccess: string = 'Nouveau site enregistrer :';
  private siteListUrl: string = '/site/list';
  public showMainParking: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly siteService: SiteService,
    private readonly apiAddressService: ApiAddressService,
    private readonly messageService: MessageService,
    private readonly departmentService: DepartmentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      approachTime: [0, Validators.required],
      averageRouteHeight: [0, Validators.required],
      averageRouteNumber: [0, Validators.required],
      minLevel: ['', Validators.required],
      maxLevel: ['', Validators.required],
      equipment: ['', Validators.required],
      engagement: ['', Validators.required],
      approachType: ['', Validators.required],
      expositions: ['', Validators.required],
      routeProfiles: ['', Validators.required],
      rockType: ['', Validators.required],
      regionCode: ['', Validators.required],
      zipCode: ['', Validators.required],
      water: [false],
      wc: [false],
      network: [false],
      river: [false],
      sectorArray: this.fb.array([]),
    });
    this.mapOptions = {
      draggable: true,
      lat: 45.199398,
      lng: 5.667857,
    };
  }
  ngOnInit(): void {
    this.loadData();
    this.addSector();
  }
  get sectorArray(): FormArray {
    return this.form.controls['sectorArray'] as FormArray;
  }
  public chooseLocalisation(parking: number): void {
    this.selectedParking = parking;
    this.displayMap = !this.displayMap;
  }

  private loadData(): void {
    this.siteService.siteControllerGetData().subscribe({
      next: data => {
        this.levels = data.levels;
        this.rockTypes = data.rockTypes;
        this.approachTypes = data.approachTypes;
        this.expositions = data.expositions;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
        this.routeProfiles = data.routeProfiles;
        this.regions = data.regions;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.toastSummary,
          detail: this.toastDetailLoadDataError,
        });
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
      department: this.form.controls['zipCode'].value.nom,
      region: this.form.controls['regionCode'].value.code,
      water: this.form.controls['water'].value,
      wc: this.form.controls['wc'].value,
      network: this.form.controls['network'].value,
      river: this.form.controls['river'].value,
      secteurs: this.form.controls['sectorArray'].value,
    };
    this.siteService
      .siteControllerCreateSite({
        body: site,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: 'success',
            summary: this.toastSummary,
            detail: this.toastDetailSuccess + '' + data.name,
          });
          return this.router.navigate([this.siteListUrl]);
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: this.toastSummary,
            detail: err.error.message,
          });
        },
      });
  }

  public addCoordinates($event: number[]): void {
    if (this.selectedParking === 1) {
      this.coordinateP1 = $event;
    }
    if (this.selectedParking === 2) {
      this.coordinateP2 = $event;
    }
  }

  public validate(parking: number): void {
    if (parking === 1) {
      this.displayP1 = true;
    }
    if (parking === 2) {
      this.displayP2 = true;
    }
    this.displayMap = !this.displayMap;
  }

  public getDepartment($event: any): void {
    this.departmentService
      .departmentControllerFindByRegion({
        region: $event.value.id,
      })
      .subscribe({
        next: data => {
          this.departments = data;
        },
        error: err => {
          console.log(err);
        },
      });
  }

  public addSector(): void {
    this.sectorArray.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }

  public sendMarker($event: any): void {
    this.mapOptions.lat = $event.value.lat;
    this.mapOptions.lng = $event.value.lng;
    this.showMainParking = !this.showMainParking;
  }
}
