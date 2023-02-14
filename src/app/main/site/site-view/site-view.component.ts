import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  constructor(
    private readonly siteService: SiteService,
    private activatedRoute: ActivatedRoute
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
          console.log(data);
          this.site = data;
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
