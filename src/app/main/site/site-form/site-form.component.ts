import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';

import { ActivatedRoute, Router } from '@angular/router';
import { MapOptions } from '../../../core/app/models/MapOptions';

import { DepartmentService } from '../../../core/api/services/department.service';

import { SiteCreateDto } from '../../../core/api/models/site-create-dto';

import { ExpositionListDto } from '../../../core/api/models/exposition-list-dto';
import { ApproachTypeListDto } from '../../../core/api/models/approach-type-list-dto';
import { EngagementListDto } from '../../../core/api/models/engagement-list-dto';
import { EquipmentListDto } from '../../../core/api/models/equipment-list-dto';
import { LevelListDto } from '../../../core/api/models/level-list-dto';
import { RockTypeListDto } from '../../../core/api/models/rock-type-list-dto';
import { RouteProfileListDto } from '../../../core/api/models/route-profile-list-dto';
import { RegionListDto } from '../../../core/api/models/region-list-dto';
import { DepartmentListDto } from '../../../core/api/models/department-list-dto';
import { SecteurListDto } from '../../../core/api/models/secteur-list-dto';
import { AppIcon } from '../../../core/app/config/app-icon.config';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  public form: FormGroup;
  public dialogMapHeader: string = 'Parking';
  public displayMap: boolean = false;
  public expositions: ExpositionListDto[] = [];
  public approachTypes: ApproachTypeListDto[] = [];
  public engagements: EngagementListDto[] = [];
  public equipments: EquipmentListDto[] = [];
  public levels: LevelListDto[] = [];
  public rockTypes: RockTypeListDto[] = [];
  public routeProfiles: RouteProfileListDto[] = [];
  public coordinateP1: number[] = [];
  public regions: RegionListDto[] = [];
  public mapOptions: MapOptions;
  public departments: DepartmentListDto[] = [];
  public coordinateP2: number[] = [];
  public selectedParking: number = 0;
  public displayP1: boolean = false;
  public displayP2: boolean = false;
  public title: string;
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';
  private toastDetailSuccess: string = 'Nouveau site enregistrer :';
  private siteListUrl: string = '/site/list';
  public showMainParking: boolean = false;
  public showSecondaryParking: boolean = false;
  private readonly siteId: number;
  public iconRoute: string;
  public iconRouteNumber: string;
  public iconRouteHeight: string;
  public iconExposition: string;
  public iconRockType: string;
  public iconMinLevel: string;
  public iconMaxLevel: string;
  public iconEquipment: string;
  public iconEngagement: string;
  public iconApproachTime: string;
  public iconApproachType: string;

  constructor(
    private fb: FormBuilder,
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
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
      region: ['', Validators.required],
      department: ['', Validators.required],
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

    this.siteId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.title = this.siteId ? 'Editer le site' : 'Nouveau site';
    this.iconRoute = AppIcon.ROUTE;
    this.iconRouteNumber = AppIcon.ROUTE_NUMBER;
    this.iconRouteHeight = AppIcon.ROUTE_HEIGHT;
    this.iconExposition = AppIcon.EXPOSITION;
    this.iconRockType = AppIcon.ROCK_TYPE;
    this.iconMinLevel = AppIcon.MIN_LEVEL;
    this.iconEquipment = AppIcon.EQUIPMENT;
    this.iconMaxLevel = AppIcon.MAX_LEVEL;
    this.iconEngagement = AppIcon.ENGAGMENT;
    this.iconApproachTime = AppIcon.APPROACH_TIME;
    this.iconApproachType = AppIcon.APPROACH_TYPE;
  }
  ngOnInit(): void {
    this.loadData();
    if (!this.siteId) {
      this.addNewSector();
    }
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
      complete: () => {
        if (this.siteId) {
          this.loadSite();
        }
      },
    });
  }

  public submit(): void {
    const site: SiteCreateDto = {
      name: this.form.controls['name'].value,
      approachTime: this.form.controls['approachTime'].value,
      minLevel: this.form.controls['minLevel'].value,
      averageRouteNumber: this.form.controls['averageRouteNumber'].value,
      averageRouteHeight: this.form.controls['averageRouteHeight'].value,
      mainParkingLat: this.coordinateP1[0],
      mainParkingLng: this.coordinateP1[1],
      secondaryParkingLat: this.coordinateP2[0],
      secondaryParkingLng: this.coordinateP2[1],
      engagement: this.form.controls['engagement'].value,
      equipment: this.form.controls['equipment'].value,
      approachType: this.form.controls['approachType'].value,
      maxLevel: this.form.controls['maxLevel'].value,
      expositions: this.form.controls['expositions'].value,
      rockType: this.form.controls['rockType'].value,
      routeProfiles: this.form.controls['routeProfiles'].value,
      department: this.form.controls['department'].value,
      region: this.form.controls['region'].value,
      water: this.form.controls['water'].value,
      wc: this.form.controls['wc'].value,
      network: this.form.controls['network'].value,
      river: this.form.controls['river'].value,
      secteurs: this.form.controls['sectorArray'].value,
    };
    if (!this.displayP2) {
      site.secondaryParkingLat = site.mainParkingLat;
      site.secondaryParkingLng = site.mainParkingLng;
    }
    if (!this.siteId) {
      this.createNewSite(site);
    } else {
      this.editSite(site);
    }
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
      this.showSecondaryParking = true;
    }
    if (parking === 2) {
      this.displayP2 = true;
    }
    this.displayMap = !this.displayMap;
  }

  public getDepartment(regionId: number): void {
    this.departmentService
      .departmentControllerFindByRegion({
        region: regionId,
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

  public addNewSector(): void {
    this.sectorArray.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }
  private addExistingSector(secteur: SecteurListDto): void {
    this.sectorArray.push(
      this.fb.group({
        id: [secteur.id],
        name: [secteur.name],
      })
    );
  }

  public initMarker(lat: number, lng: number): void {
    this.mapOptions.lat = lat;
    this.mapOptions.lng = lng;
    this.showMainParking = !this.showMainParking;
  }
  public formIsInvalid(): boolean {
    let isInvalid: boolean = true;
    if (this.coordinateP1.length > 1 && this.form.valid) {
      isInvalid = !isInvalid;
    }
    return isInvalid;
  }

  private loadSite() {
    this.siteService
      .siteControllerGetSite({
        id: this.siteId,
      })
      .subscribe({
        next: data => {
          console.log(data);
          this.form.controls['name'].setValue(data.name);
          this.form.controls['expositions'].setValue(data.expositions);
          this.form.controls['equipment'].setValue(data.equipment);
          this.form.controls['engagement'].setValue(data.engagement);
          this.form.controls['minLevel'].setValue(data.minLevel);
          this.form.controls['maxLevel'].setValue(data.maxLevel);
          this.form.controls['routeProfiles'].setValue(data.routeProfiles);
          this.form.controls['rockType'].setValue(data.rockType);
          this.form.controls['approachType'].setValue(data.approachType);
          this.form.controls['approachTime'].setValue(data.approachTime);
          this.form.controls['region'].setValue(data.region);
          this.form.controls['river'].setValue(data.river);

          this.form.controls['averageRouteHeight'].setValue(
            data.averageRouteHeight
          );
          this.form.controls['averageRouteNumber'].setValue(
            data.averageRouteNumber
          );
          this.form.controls['wc'].setValue(data.wc);
          this.form.controls['water'].setValue(data.water);
          this.form.controls['network'].setValue(data.network);
          this.getDepartment(data.region.id);
          this.form.controls['department'].setValue(data.department);
          this.initMarker(data.department.lat, data.department.lng);
          this.coordinateP1 = [data.mainParkingLat, data.mainParkingLng];
          this.displayP1 = !this.displayP1;
          this.showSecondaryParking = !this.showSecondaryParking;
          this.coordinateP2 = [
            data.secondaryParkingLat,
            data.secondaryParkingLng,
          ];
          this.displayP2 = !this.displayP2;

          data.secteurs.forEach(s => {
            this.addExistingSector(s);
          });
        },
        error: err => {
          console.log(err);
        },
      });
  }

  private createNewSite(site: SiteCreateDto) {
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

  private editSite(site: SiteCreateDto) {
    console.log(site);
    this.siteService
      .siteControllerEditSite({
        id: this.siteId,
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

  onChangeRegion($event: any) {
    this.getDepartment($event.value.id);
  }

  onChangeDepartment($event: any) {
    this.initMarker($event.value.lat, $event.value.lng);
  }
}
