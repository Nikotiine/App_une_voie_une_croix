import { Component, Input } from '@angular/core';
import { Icons } from '../../../../core/app/enum/Icons.enum';
import { SiteListDto } from '../../../../core/api/models/site-list-dto';
import { SiteRoutingModule } from '../../../../main/site/site-routing.module';

@Component({
  selector: 'app-table-site',
  templateUrl: './table-site.component.html',
  styleUrls: ['./table-site.component.scss'],
})
export class TableSiteComponent {
  @Input()
  set sites(sites: SiteListDto[]) {
    this._sites = sites;
  }
  get sites(): SiteListDto[] {
    return this._sites;
  }
  @Input() loading: boolean;
  @Input() paginator: boolean;

  private _sites: SiteListDto[] = [];

  public readonly ICON = Icons;
  public siteViewUrl: string;

  constructor() {
    this.siteViewUrl = SiteRoutingModule.SITE_VIEW;
  }
}
