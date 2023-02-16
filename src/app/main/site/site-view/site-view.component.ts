import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';
import { ApiAddressService } from '../../../core/app/services/api-address.service';
import { Region } from '../../../core/app/models/Region';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  private regions: Region[] = [];
  constructor(
    private readonly siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private apiAddressService: ApiAddressService
  ) {}
  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadData(id);
  }

  private loadData(id: number) {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: data => {
          console.log(data.minLevel);
          this.site = data;
        },
        error: err => {
          console.log(err);
        },
      });
    this.apiAddressService.getRegions().subscribe({
      next: data => {
        this.regions = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }

  public getRegionName(code: string): string {
    let regionName: string = '';
    let region: Region | undefined = this.regions.find(r => r.code === code);
    if (region) {
      regionName = region.nom;
    }
    return regionName;
  }
}
