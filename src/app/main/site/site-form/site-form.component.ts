import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Marker } from 'leaflet';
import { ExpositionsDto } from '../../../core/api/models/expositions-dto';
import { ExpositionService } from '../../../core/api/services/exposition.service';
import { ApproachTypeService } from '../../../core/api/services/approach-type.service';
import { ApproachTypeDto } from '../../../core/api/models/approach-type-dto';
import { EngagmentService } from '../../../core/api/services/engagment.service';
import { EngagementDto } from '../../../core/api/models/engagement-dto';
import { EquipmentService } from '../../../core/api/services/equipment.service';
import { EquipmentDto } from '../../../core/api/models/equipment-dto';
import { LevelsDto } from '../../../core/api/models/levels-dto';
import { LevelService } from '../../../core/api/services/level.service';
import { RockTypeDto } from '../../../core/api/models/rock-type-dto';
import { RockTypeService } from '../../../core/api/services/rock-type.service';
import { RouteProfileDto } from '../../../core/api/models/route-profile-dto';
import { RouteProfileService } from '../../../core/api/services/route-profile.service';
import { CreateSiteDto } from '../../../core/api/models/create-site-dto';
import { SiteService } from '../../../core/api/services/site.service';

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
  public coordinateP2: number[] = [];
  private selectedParking: number = 0;

  constructor(
    private fb: FormBuilder,
    private readonly expositionService: ExpositionService,
    private readonly approachTypeService: ApproachTypeService,
    private readonly engagementService: EngagmentService,
    private readonly equipmentService: EquipmentService,
    private readonly levelService: LevelService,
    private readonly rockTypeService: RockTypeService,
    private readonly routeProfileService: RouteProfileService,
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
    this.loadExposition();
    this.loadApproachTypes();
    this.loadEngagements();
    this.loadEquipments();
    this.loadLevels();
    this.loadRockTypes();
    this.loadRouteProfiles();
  }

  public submit(): void {
    const site: CreateSiteDto = {
      name: this.form.controls['name'].value,
      approachTime: this.form.controls['approachTime'].value,
      minLevel: this.form.controls['minLevel'].value,
      averageRouteNumber: this.form.controls['averageRouteNumber'].value,
      averageRouteHeight: this.form.controls['averageRouteHeight'].value,
      mainParkingLat: '4.454545',
      mainParkingLng: '5.454545',
      secondaryParkingLat: '6.454545',
      secondaryParkingLng: '7.45454545',
      engagement: this.form.controls['engagement'].value,
      equipment: this.form.controls['equipment'].value,
      approachType: this.form.controls['approachType'].value,
      maxLevel: this.form.controls['maxLevel'].value,
    };
    console.log(this.form.controls['expositions'].value);
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

  private loadExposition() {
    this.expositionService.expositionControllerGetAllExpositions().subscribe({
      next: data => {
        this.expositions = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private loadApproachTypes() {
    this.approachTypeService
      .approachTypeControllerGetAllApproachTypes()
      .subscribe({
        next: data => {
          this.approachTypes = data;
        },
        error: err => {
          console.log(err);
        },
      });
  }

  private loadEngagements() {
    this.engagementService.engagementControllerGetAllEngagements().subscribe({
      next: data => {
        this.engagements = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private loadEquipments() {
    this.equipmentService.equipmentControllerGetAllEquipments().subscribe({
      next: data => {
        this.equipments = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private loadLevels() {
    this.levelService.levelControllerGetAllLevels().subscribe({
      next: data => {
        this.levels = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private loadRockTypes() {
    this.rockTypeService.rockTypeControllerGetAllRockTypes().subscribe({
      next: data => {
        this.rockTypes = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  private loadRouteProfiles() {
    this.routeProfileService
      .routeProfileControllerGetAllRouteProfile()
      .subscribe({
        next: data => {
          this.routeProfiles = data;
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
