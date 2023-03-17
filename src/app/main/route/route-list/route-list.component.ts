import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../core/api/services/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  constructor(private readonly routeService: RouteService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  private loadRoutes() {
    this.routeService.routeControllerGetAllRoutes().subscribe({
      next: data => {
        console.log(data);
      },
    });
  }
}
