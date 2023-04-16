import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../core/api/services/route.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { RockTypeDto } from '../../../core/api/models/rock-type-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { RouteRoutingModule } from '../route-routing.module';
import { UserProfileService } from '../../../core/app/services/user-profile.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  public title: string = '';
  public sites: SiteDto[] = [];
  public secteurs: SecteurDto[] = [];
  public expositions: ExpositionDto[] = [];
  public engagements: EngagementDto[] = [];
  public equipments: EquipmentDto[] = [];
  public levels: LevelDto[] = [];
  public routeProfiles: RouteProfileDto[] = [];
  private rockType: RockTypeDto = null;
  public iconRoute: string = Icons.ROUTE;
  public iconExposition: string = Icons.EXPOSITION;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconEquipment: string = Icons.EQUIPMENT;
  public iconEngagement: string = Icons.ENGAGMENT;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconQuickdraw: string = Icons.QUICK_DRAW;
  public form: FormGroup;
  public showForm: boolean = false;
  private routeId: string | undefined = '';
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
    private readonly commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private readonly userProfileService: UserProfileService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      height: [0, [Validators.required, Validators.min(1)]],
      quickdraw: [0, [Validators.required, Validators.min(1)]],
      level: [0, [Validators.required, Validators.min(1)]],
      equipment: [0, [Validators.required, Validators.min(1)]],
      engagement: [0, [Validators.required, Validators.min(1)]],
      secteur: [0, [Validators.required, Validators.min(1)]],
      routeProfile: [0, [Validators.required, Validators.min(1)]],
      exposition: [0, [Validators.required, Validators.min(1)]],
      site: [0],
    });
  }
  ngOnInit(): void {
    this.routeId = this.activatedRoute.snapshot.params['id'];
    if (this.routeId) {
      this.loadRoute(parseInt(this.routeId));
      this.title = "Edition d'une voie";
    } else {
      this.title = 'Ajout d\'une voie';
    }
    this.loadSites();
    this.loadData();
  }

  /**
   * Charge la liste des tous les sites disponibles en bdd
   * @private
   */
  private loadSites(): void {
    this.routeService.routeControllerGetSites().subscribe({
      next: data => {
        this.sites = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.ROUTE_SUMMARY,
          detail: err.error.message,
        });
      },
    });
  }

  /**
   * Charges les secteurs du site selectioner ainsi que ses informations
   * @param id du site
   */
  public onChangeSite(id: number): void {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: data => {
          this.secteurs = data.secteurs;
          this.rockType = data.rockType;
          //Si on est en edition , ne defini pas les dropdown
          if (!this.routeId) {
            this.form.controls['exposition'].setValue(data.expositions[0].id);
            this.form.controls['routeProfile'].setValue(
              data.routeProfiles[0].id
            );
            this.form.controls['level'].setValue(data.minLevel.id);
            this.form.controls['equipment'].setValue(data.equipment.id);
            this.form.controls['engagement'].setValue(data.engagement.id);
            this.form.controls['height'].setValue(data.averageRouteHeight);
          }
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: err.error.message,
          });
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
      exposition: this.exposition,
      routeProfile: this.routeProfile,
      rockType: this.rockType,
      author: this.userProfileService.getUserProfile(),
    };

    if (!this.routeId) {
      this.createNewRoute(route);
    } else {
      this.updateRoute(route);
    }
  }

  /**
   * Charge les differentes donnee a inclure dans la voie
   * @private
   */
  private loadData(): void {
    this.commonService.commonControllerGetDataForRoute().subscribe({
      next: data => {
        this.expositions = data.expositions;
        this.routeProfiles = data.routeProfiles;
        this.levels = data.levels;
        this.equipments = data.equipments;
        this.engagements = data.engagements;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.ROUTE_SUMMARY,
          detail: err.error.message,
        });
      },
    });
  }

  /**
   * Si on edite la voie ,charge ses parametre avec son id
   * @param id de la voie
   * @private
   */
  private loadRoute(id: number): void {
    this.routeService
      .routeControllerGetRoute({
        id: id,
      })
      .subscribe({
        next: data => {
          this.form.controls['site'].setValue(data.secteur.site.id);
          this.onChangeSite(data.secteur.site.id);
          this.form.controls['secteur'].setValue(data.secteur.id);
          this.form.controls['name'].setValue(data.name);
          this.form.controls['height'].setValue(data.height);
          this.form.controls['quickdraw'].setValue(data.quickdraw);
          this.form.controls['exposition'].setValue(data.exposition.id);
          this.form.controls['routeProfile'].setValue(data.routeProfile.id);
          this.form.controls['level'].setValue(data.level.id);
          this.form.controls['equipment'].setValue(data.equipment.id);
          this.form.controls['engagement'].setValue(data.engagement.id);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }

  private createNewRoute(route: RouteCreateDto) {
    this.routeService
      .routeControllerCreateRoute({
        body: route,
      })
      .subscribe({
        next: data => {
          console.log(data);
          this.messageService.add({
            severity: ToastConfig.TYPE_SUCCESS,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: ToastConfig.ROUTE_DETAIL_NEW + ' ' + this.site.name,
          });
          return this.router.navigate([RouteRoutingModule.ROUTE_LIST]);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }

  private updateRoute(route: RouteCreateDto) {
    this.routeService
      .routeControllerEditRoute({
        id: parseInt(this.routeId),
        body: route,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: ToastConfig.TYPE_SUCCESS,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: ToastConfig.ROUTE_DETAIL_EDIT + ' ' + this.site.name,
          });
          return this.router.navigate([RouteRoutingModule.ROUTE_LIST]);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ROUTE_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
  //*********************GETTERS******************************
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
  get exposition(): ExpositionDto {
    return this.expositions.find(
      e => e.id === this.form.controls['exposition'].value
    );
  }
  get routeProfile(): RouteProfileDto {
    return this.routeProfiles.find(
      r => r.id === this.form.controls['routeProfile'].value
    );
  }
  get site(): SiteDto {
    return this.sites.find(s => s.id === this.form.controls['site'].value);
  }
}
