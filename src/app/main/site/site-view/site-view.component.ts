import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  public mapOption: MapOptions;
  public mapMainParking: boolean = false;
  public mapSecondaryParking: boolean = false;
  public siteListUrl: string = '/site/list/';
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';

  constructor(
    private readonly siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private router: Router
  ) {
    this.mapOption = {
      draggable: false,
      lat: 45.151515,
      lng: 5.454545,
    };
  }
  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadData(id);
  }

  private loadData(id: number): void {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: data => {
          this.site = data;
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: this.toastSummary,
            detail: this.toastDetailLoadDataError,
          });
          return this.router.navigate([this.siteListUrl]);
        },
      });
  }

  public showMapMainParking(): void {
    this.mapOption.lng = this.site.mainParkingLng;
    this.mapOption.lat = this.site.mainParkingLat;
    setTimeout(() => {
      this.mapMainParking = !this.mapMainParking;
    }, 100);
  }
  public showMapSecondaryParking(): void {
    this.mapOption.lng = this.site.secondaryParkingLng;
    this.mapOption.lat = this.site.secondaryParkingLat;
    setTimeout(() => {
      this.mapSecondaryParking = !this.mapSecondaryParking;
    }, 100);
  }
}
