import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icons } from '../../../../core/app/enum/Icons.enum';
import { SiteListDto } from '../../../../core/api/models/site-list-dto';
import { SiteRoutingModule } from '../../../../main/site/site-routing.module';
import { AdminSitesDto } from '../../../../core/api/models/admin-sites-dto';
import { TableSiteOptions } from '../../../../core/app/models/TableSiteOptions.model';

@Component({
  selector: 'app-table-site',
  templateUrl: './table-site.component.html',
  styleUrls: ['./table-site.component.scss'],
})
export class TableSiteComponent {
  @Input()
  set sites(sites: SiteListDto[] | AdminSitesDto[]) {
    this._sites = sites;
  }
  get sites(): SiteListDto[] | AdminSitesDto[] {
    return this._sites;
  }
  @Input() options: TableSiteOptions;

  @Output() selectedSite: EventEmitter<number> = new EventEmitter<number>();
  private _sites: SiteListDto[] | AdminSitesDto[] = [];

  public readonly ICON = Icons;
  public siteViewUrl: string;

  constructor() {
    this.siteViewUrl = SiteRoutingModule.SITE_VIEW;
  }

  public emitToSwitchStatus(id: number): void {
    this.selectedSite.emit(id);
  }
}
