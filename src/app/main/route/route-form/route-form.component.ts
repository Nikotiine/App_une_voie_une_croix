import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../core/api/services/route.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { SiteDto } from '../../../core/api/models/site-dto';
import { SiteService } from '../../../core/api/services/site.service';
import { SecteurDto } from '../../../core/api/models/secteur-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { CommonService } from '../../../core/api/services/common.service';
import { ExpositionDto } from '../../../core/api/models/exposition-dto';
import { EngagementDto } from '../../../core/api/models/engagement-dto';
import { EquipmentDto } from '../../../core/api/models/equipment-dto';
import { LevelDto } from '../../../core/api/models/level-dto';
import { RouteProfileDto } from '../../../core/api/models/route-profile-dto';
import { RouteCreateDto } from '../../../core/api/models/route-create-dto';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  public title: string = 'Nouvelle voie';
  public sites: SiteDto[] = [];
  public secteurs: SecteurDto[] = [];
  public expositions: ExpositionDto[] = [];
  public engagements: EngagementDto[] = [];
  public equipments: EquipmentDto[] = [];
  public levels: LevelDto[] = [];
  public routeProfiles: RouteProfileDto[] = [];
  public iconRoute: string = Icons.ROUTE;
  public iconExposition: string = Icons.EXPOSITION;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconEquipment: string = Icons.EQUIPMENT;
  public iconEngagement: string = Icons.ENGAGMENT;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public form: FormGroup;
  public showForm: boolean = false;
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
    private readonly commonService: CommonService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      height: [0],
      quickdraw: [0],
      level: [0],
      equipment: [0],
      engagement: [0],
      secteur: [0],
      routeProfile: [0],
      exposition: [0],
    });
  }
  ngOnInit(): void {
    this.loadSites();
    this.loadData();
  }

  private loadSites() {
    this.routeService.routeControllerGetSites().subscribe({
      next: data => {
        console.log(data);
        this.sites = data;
      },
    });
  }

  public onChangeSite($event: any) {
    this.siteService
      .siteControllerGetSite({
        id: parseInt($event.value),
      })
      .subscribe({
        next: data => {
          console.log(data);
          this.secteurs = data.secteurs;
          this.form.controls['exposition'].setValue(data.expositions[0].id);
          this.form.controls['routeProfile'].setValue(data.routeProfiles[0].id);
          this.form.controls['level'].setValue(data.minLevel.id);
          this.form.controls['equipment'].setValue(data.equipment.id);
          this.form.controls['engagement'].setValue(data.engagement.id);
          this.form.controls['height'].setValue(data.averageRouteHeight);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.showForm = !this.showForm;
        },
      });
  }

  public submit(): void {
    const route: RouteCreateDto = {
      name: this.form.controls['name'].value,
      height: this.form.controls['height'].value,
      quickdraw: this.form.controls['quickdraw'].value,
      equipment: this.equipment,
      engagement: this.engagement,
      level: this.level,
      secteur: this.secteur,
    };
    console.log(route);
    this.routeService
      .routeControllerCreateRoute({
        body: route,
      })
      .subscribe({
        next: data => {
          console.log(data);
        },
      });
  }

  private loadData(): void {
    this.commonService.commonControllerGetDataForRoute().subscribe({
      next: data => {
        console.log(data);
        this.expositions = data.expositions;
        this.routeProfiles = data.routeProfiles;
        this.levels = data.levels;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
      },
    });
  }
  get secteur(): SecteurDto {
    return this.secteurs.find(
      s => s.id === this.form.controls['secteur'].value
    );
  }
  get equipment(): EquipmentDto {
    return this.equipments.find(
      e => e.id === this.form.controls['equipment'].value
    );
  }
  get engagement(): EngagementDto {
    return this.engagements.find(
      e => e.id === this.form.controls['engagement'].value
    );
  }
  get level(): LevelDto {
    return this.levels.find(l => l.id === this.form.controls['level'].value);
  }
}
