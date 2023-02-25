import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';
import { LevelsDto } from '../../../core/api/models/levels-dto';
import { ExpositionsDto } from '../../../core/api/models/expositions-dto';
import { ApproachTypeDto } from '../../../core/api/models/approach-type-dto';
import { EngagementDto } from '../../../core/api/models/engagement-dto';
import { EquipmentDto } from '../../../core/api/models/equipment-dto';
import { RockTypeDto } from '../../../core/api/models/rock-type-dto';
import { RouteProfileDto } from '../../../core/api/models/route-profile-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { RegionDto } from '../../../core/api/models/region-dto';
import { DepartmentService } from '../../../core/api/services/department.service';
import { DepartmentDto } from '../../../core/api/models/department-dto';
import { SiteCreateDto } from '../../../core/api/models/site-create-dto';
import { SecteurDto } from '../../../core/api/models/secteur-dto';

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
  public title: string;
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';
  private toastDetailSuccess: string = 'Nouveau site enregistrer :';
  private siteListUrl: string = '/site/list';
  public showMainParking: boolean = false;
  public showSecondaryParking: boolean = false;
  private siteId: number;

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
  private addExistingSector(secteur: SecteurDto): void {
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
