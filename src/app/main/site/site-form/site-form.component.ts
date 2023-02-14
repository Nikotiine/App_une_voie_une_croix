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
  public regions: any[] = [];
  public departments: any[] = [];
  public coordinateP2: number[] = [];
  private selectedParking: number = 0;
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';
  private toastDetailSuccess: string = 'Nouveau site enregistrer :';
  private siteListUrl: string = '/site/list';

  constructor(
    private fb: FormBuilder,
    private readonly siteService: SiteService,
    private readonly apiAddressService: ApiAddressService,
    private readonly messageService: MessageService,
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

  private loadData() {
    this.siteService.siteControllerGetData().subscribe({
      next: data => {
        this.levels = data.levels;
        this.rockTypes = data.rockTypes;
        this.approachTypes = data.approachTypes;
        this.expositions = data.expositions;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
        this.routeProfiles = data.routeProfiles;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.toastSummary,
          detail: this.toastDetailLoadDataError,
        });
      },
    });
    this.apiAddressService.getRegions().subscribe({
      next: data => {
        this.regions = data;
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
      zipCode: this.form.controls['zipCode'].value,
      regionCode: this.form.controls['regionCode'].value,
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

  public getDepartment($event: any) {
    this.apiAddressService.getDepartment($event.value).subscribe({
      next: data => {
        this.departments = data;
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

  public addSector() {
    this.sectorArray.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }
}
