import { Component, OnDestroy, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { MessageService } from 'primeng/api';
import { RegionService } from '../../../core/api/services/region.service';
import { SiteRoutingModule } from '../site-routing.module';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RegionDto } from '../../../core/api/models/region-dto';
import { forkJoin } from 'rxjs';
import { LanguageService } from '../../../core/app/services/language.service';
import { DefaultLangChangeEvent } from '@ngx-translate/core';
import { TableSiteOptions } from '../../../core/app/models/TableOptions.model';
import { Router } from '@angular/router';
import { MainRoutingModule } from '../../main-routing.module';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public filteredSites: SiteListDto[] = [];
  public regions: RegionDto[] = [];
  public sitesOptions: TableSiteOptions;
  public readonly ICON = Icons;

  private sites: SiteListDto[] = [];
  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly regionService: RegionService,
    private readonly languageService: LanguageService,
    private readonly router: Router
  ) {
    this.sitesOptions = {
      loading: true,
      forAdmin: false,
      fullView: true,
    };
  }
  public ngOnInit(): void {
    this.loadData();
    this.watchLanguageChange();
  }

  /**
   * Filtre les sites par rapport a leur region
   * @param id de la region
   */
  public filterWithRegion(id: string): void {
    if (String(id) !== '0') {
      this.filteredSites = this.sites.filter(
        site => String(site.region.id) === id
      );
    } else {
      this.filteredSites = this.sites;
    }
  }

  /**
   * Charge les données d'affichege des sites
   * ForkJoin sur la liste de tous les sites / la liste des regions et la traduction de l'ajout de "toute les regions"
   */
  private loadData(): void {
    forkJoin([
      this.siteService.siteControllerGetAllSites(),
      this.regionService.regionControllerGetAllRegions(),
    ]).subscribe({
      next: data => {
        this.sites = data[0];
        this.filteredSites = this.sites;
        this.regions = data[1];
        this.addGenericRegion();
        this.loading = !this.loading;
        this.sitesOptions.loading = this.loading;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_SITE
          ).summary,
          detail: err.error.message,
        });
        this.router.navigate([MainRoutingModule.HOME]);
      },
    });
  }

  /**
   * Ajoute une region generique qui permet de selectioner tous les site de toutes les regions
   */
  private addGenericRegion(): void {
    const genericRegions: RegionDto = {
      id: 0,
      name: this.languageService.siteTranslate('genericRegions'),
    };
    this.regions.push(genericRegions);
  }

  /**
   * Surveille les changement de langue et modifie le nom de la region generique
   */
  private watchLanguageChange(): void {
    this.languageService.change.subscribe((event: DefaultLangChangeEvent) => {
      this.removeGenericRegion();
      this.addGenericRegion();
    });
  }

  // Supprime la region generique actuelle (changement de langue)
  private removeGenericRegion(): void {
    const index = this.regions.findIndex(region => region.id === 0);
    this.regions.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.languageService.change.unsubscribe();
  }
}
