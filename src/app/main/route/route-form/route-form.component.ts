import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../core/api/services/route.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteDto } from '../../../core/api/models/site-dto';
import { SiteService } from '../../../core/api/services/site.service';
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
import { SectorDto } from '../../../core/api/models/sector-dto';
import { EffortType } from '../../../core/app/enum/EffortType.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  public isNew: boolean;
  public sites: SiteDto[] = [];
  public secteurs: SectorDto[] = [];
  public expositions: ExpositionDto[] = [];
  public engagements: EngagementDto[] = [];
  public equipments: EquipmentDto[] = [];
  public levels: LevelDto[] = [];
  public routeProfiles: RouteProfileDto[] = [];
  private rockType: RockTypeDto = null;
  //******************ICONS*********************
  public readonly ICON = Icons;
  //******************************************
  public form: FormGroup;
  public showForm: boolean = false;
  private readonly routeId: string | undefined = '';
  public effortTypes = [
    {
      label: EffortType.BLOC,
    },
    {
      label: EffortType.CONTI,
    },
    {
      label: EffortType.RESI,
    },
  ];
  constructor(
    private readonly routeService: RouteService,
    private readonly siteService: SiteService,
    private readonly commonService: CommonService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userProfileService: UserProfileService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      height: [0, [Validators.required, Validators.min(1)]],
      quickdraw: [0, [Validators.required, Validators.min(1)]],
      level: [0, [Validators.required, Validators.min(1)]],
      equipment: [0, [Validators.required, Validators.min(1)]],
      engagement: [0, [Validators.required, Validators.min(1)]],
      sector: [0, [Validators.required, Validators.min(1)]],
      routeProfile: [0, [Validators.required, Validators.min(1)]],
      exposition: [0, [Validators.required, Validators.min(1)]],
      site: [0],
      commentary: [''],
      effortType: [''],
    });
    this.routeId = this.activatedRoute.snapshot.params['id'];
    this.isNew = !!this.routeId;
  }
  public ngOnInit(): void {
    if (this.isNew) {
      this.loadRoute(parseInt(this.routeId));
    }
    this.loadData();
  }

  /**
   * Charge la liste des tous les sites disponibles en bdd
   * @private
   */
  private loadData(): void {
    forkJoin([
      this.routeService.routeControllerGetSites(),
      this.commonService.commonControllerGetDataForRoute(),
    ]).subscribe({
      next: data => {
        this.sites = data[0];
        this.expositions = data[1].expositions;
        this.routeProfiles = data[1].routeProfiles;
        this.levels = data[1].levels;
        this.equipments = data[1].equipments;
        this.engagements = data[1].engagements;
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
          this.secteurs = data.sectors;
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
      sector: this.secteur,
      exposition: this.exposition,
      routeProfile: this.routeProfile,
      rockType: this.rockType,
      author: this.userProfileService.getUserProfile(),
      commentary: this.form.controls['commentary'].value,
      effortType: this.form.controls['effortType'].value,
    };

    if (!this.routeId) {
      this.createNewRoute(route);
    } else {
      this.updateRoute(route);
    }
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
          this.form.controls['site'].setValue(data.sector.site.id);
          this.onChangeSite(data.sector.site.id);
          this.form.controls['sector'].setValue(data.sector.id);
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

  private createNewRoute(route: RouteCreateDto): void {
    this.routeService
      .routeControllerCreateRoute({
        body: route,
      })
      .subscribe({
        next: data => {
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

  /**
   *
   * @param route
   * @private
   */
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
  get secteur(): SectorDto {
    return this.secteurs.find(
      sector => sector.id === this.form.controls['sector'].value
    );
  }
  get equipment(): EquipmentDto {
    return this.equipments.find(
      equipment => equipment.id === this.form.controls['equipment'].value
    );
  }
  get engagement(): EngagementDto {
    return this.engagements.find(
      engagement => engagement.id === this.form.controls['engagement'].value
    );
  }
  get level(): LevelDto {
    return this.levels.find(
      level => level.id === this.form.controls['level'].value
    );
  }
  get exposition(): ExpositionDto {
    return this.expositions.find(
      exposition => exposition.id === this.form.controls['exposition'].value
    );
  }
  get routeProfile(): RouteProfileDto {
    return this.routeProfiles.find(
      route => route.id === this.form.controls['routeProfile'].value
    );
  }
  get site(): SiteDto {
    return this.sites.find(
      site => site.id === this.form.controls['site'].value
    );
  }
}
