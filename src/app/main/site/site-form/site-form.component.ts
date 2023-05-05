import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { DepartmentService } from '../../../core/api/services/department.service';
import { SiteCreateDto } from '../../../core/api/models/site-create-dto';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { SiteRoutingModule } from '../site-routing.module';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { ExpositionDto } from '../../../core/api/models/exposition-dto';
import { ApproachTypeDto } from '../../../core/api/models/approach-type-dto';
import { EngagementDto } from '../../../core/api/models/engagement-dto';
import { EquipmentDto } from '../../../core/api/models/equipment-dto';
import { LevelDto } from '../../../core/api/models/level-dto';
import { RockTypeDto } from '../../../core/api/models/rock-type-dto';
import { RouteProfileDto } from '../../../core/api/models/route-profile-dto';
import { RegionDto } from '../../../core/api/models/region-dto';
import { CommonService } from '../../../core/api/services/common.service';
import { DepartmentDataDto } from '../../../core/api/models/department-data-dto';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { RouteFootDto } from '../../../core/api/models/route-foot-dto';
import { SectorDto } from '../../../core/api/models/sector-dto';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss'],
})
export class SiteFormComponent implements OnInit {
  public form: FormGroup;
  public dialogMapHeader: string = 'Parking';
  public titleEdit: string = 'Edition du site';
  public titleCreate: string = "Ajout d'un site";
  public displayMap: boolean = false;
  // ******** DropDown & MutliSelect ********
  public expositions: ExpositionDto[] = [];
  public approachTypes: ApproachTypeDto[] = [];
  public engagements: EngagementDto[] = [];
  public equipments: EquipmentDto[] = [];
  public levels: LevelDto[] = [];
  public rockTypes: RockTypeDto[] = [];
  public routeProfiles: RouteProfileDto[] = [];
  public regions: RegionDto[] = [];
  public departments: DepartmentDataDto[] = [];
  public routeFoots: RouteFootDto[] = [];

  // ******** DropDown & MutliSelect ********
  public mapOptions: MapOptions;
  public coordinateP1: number[] = [];
  public coordinateP2: number[] = [];
  public selectedParking: number = 0;
  public displayP1: boolean = false;
  public displayP2: boolean = false;
  public isNew: boolean;
  public showMainParking: boolean = false;
  public showSecondaryParking: boolean = false;
  private readonly siteId: number;
  // **************ICONS*************************
  public readonly ICON = Icons;
  // **************ICONS*************************
  constructor(
    private readonly fb: FormBuilder,
    private readonly siteService: SiteService,
    private readonly commonService: CommonService,
    private readonly messageService: MessageService,
    private readonly departmentService: DepartmentService,
    private readonly userProfileService: UserProfileService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
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
      routeFoot: ['', Validators.required],
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
    this.isNew = !!this.siteId;
    this.form.controls['department'].disable();
  }
  public ngOnInit(): void {
    this.loadData();
    if (!this.siteId) {
      this.addNewSector();
    }
  }

  public chooseLocalisation(parking: number): void {
    this.selectedParking = parking;
    this.displayMap = !this.displayMap;
  }

  // Charge les donnee necessaire pour les different dropdown / Mutliselect
  private loadData(): void {
    this.commonService.commonControllerGetDataForSite().subscribe({
      next: data => {
        this.levels = data.levels;
        this.rockTypes = data.rockTypes;
        this.approachTypes = data.approachTypes;
        this.expositions = data.expositions;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
        this.routeProfiles = data.routeProfiles;
        this.regions = data.regions;
        this.routeFoots = data.routeFoots;
        if (this.siteId) {
          this.loadSite();
        }
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.SITE_SUMMARY,
          detail: err.error.message,
        });
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
      department: this.department,
      region: this.form.controls['region'].value,
      water: this.form.controls['water'].value,
      wc: this.form.controls['wc'].value,
      network: this.form.controls['network'].value,
      river: this.form.controls['river'].value,
      sectors: this.form.controls['sectorArray'].value,
      author: this.userProfileService.getUserProfile(),
      routeFoot: this.routeFoot,
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

  /**
   * Ajout les coordonnees GPS choisi dans la modale
   * @param $event
   */
  public addCoordinates($event: number[]): void {
    if (this.selectedParking === 1) {
      this.coordinateP1 = $event;
    }
    if (this.selectedParking === 2) {
      this.coordinateP2 = $event;
    }
  }

  /**
   * Valide les coordonne du marker de carte
   * @param parking
   */
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
      .departmentControllerGetByRegion({
        region: regionId,
      })
      .subscribe({
        next: data => {
          this.departments = data;
          this.form.controls['department'].enable();
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.SITE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
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

  private loadSite(): void {
    this.siteService
      .siteControllerGetSite({
        id: this.siteId,
      })
      .subscribe({
        next: data => {
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
          this.form.controls['department'].setValue(data.department.id);
          this.initMarker(data.department.lat, data.department.lng);
          this.coordinateP1 = [data.mainParkingLat, data.mainParkingLng];
          this.displayP1 = !this.displayP1;
          this.showSecondaryParking = !this.showSecondaryParking;
          this.coordinateP2 = [
            data.secondaryParkingLat,
            data.secondaryParkingLng,
          ];
          this.displayP2 = !this.displayP2;
          data.sectors.forEach(s => {
            this.addExistingSector(s);
          });
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.SITE_SUMMARY,
            detail: err.error.message,
          });
          return this.router.navigate([SiteRoutingModule.SITE_NEW]);
        },
      });
  }

  private createNewSite(site: SiteCreateDto): void {
    this.siteService
      .siteControllerCreateSite({
        body: site,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: ToastConfig.TYPE_SUCCESS,
            summary: ToastConfig.SITE_SUMMARY,
            detail: ToastConfig.SITE_DETAIL_NEW + ' ' + data.name,
          });
          return this.router.navigate([SiteRoutingModule.SITE_LIST]);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.SITE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }

  private editSite(site: SiteCreateDto): void {
    this.siteService
      .siteControllerEditSite({
        id: this.siteId,
        body: site,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: ToastConfig.TYPE_SUCCESS,
            summary: ToastConfig.SITE_SUMMARY,
            detail: ToastConfig.SITE_DETAIL_EDIT + ' ' + data.name,
          });
          return this.router.navigate([SiteRoutingModule.SITE_LIST]);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.SITE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }

  // Charges les departements en fonction de la region choisie
  public onChangeRegion($event: any): void {
    this.getDepartment($event.value.id);
  }

  // Initialise le marker de carte par rapport a la prefecture du departement choisi (lat/lng renseigner en bdd)
  public onChangeDepartment(): void {
    this.initMarker(this.department.lat, this.department.lng);
  }
  /**
   * Creation du Array pour les differents secteur du site
   */
  get sectorArray(): FormArray {
    return this.form.controls['sectorArray'] as FormArray;
  }

  // Ajout d'un nouveau secteur
  public addNewSector(): void {
    this.sectorArray.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }
  // Suppression d'un secteur ( sauf le 1 obligatoire )
  public removeSector(i: number): void {
    this.sectorArray.removeAt(i);
  }

  /**
   * Quand le site est en edition, rempli le formArray avec les secteurs deja existants
   * @private
   * @param sector
   */
  private addExistingSector(sector: SectorDto): void {
    this.sectorArray.push(
      this.fb.group({
        id: [sector.id],
        name: [sector.name],
      })
    );
  }
  get department(): DepartmentDataDto {
    return this.departments.find(
      department => department.id === this.form.controls['department'].value
    );
  }
  get routeFoot(): RouteFootDto {
    return this.routeFoots.find(
      routeFoot => routeFoot.id === this.form.controls['routeFoot'].value
    );
  }
}
