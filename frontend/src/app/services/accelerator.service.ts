import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { Observable, of } from 'rxjs';

export interface Acceleration {
  txid: string,
  feeDelta: number,
  added: number,
  pools: string,
  status: string,
  feePaid: number,
  baseFee: number,
  vsizeFee: number,
}

@Injectable({
  providedIn: 'root'
})
export class AcceleratorService {
  private servicesApiUrl: string;

  constructor(
    private stateService: StateService,
    private httpClient: HttpClient
  ) {
    this.servicesApiUrl = this.stateService.env.MEMPOOL_SERVICES_API;
  }

  acceleratorEnabled(): boolean {
    if (this.stateService.env.ACCELERATOR === false || !this.stateService.env.MEMPOOL_SERVICES_API) {
      return false;
    }
    return true;
  }

  getLatestAcceleration$(): Observable<Acceleration[]> {
    if (this.acceleratorEnabled() === false) {
      return of([]);
    } else {
      return this.httpClient.get<Acceleration[]>(this.servicesApiUrl + '/accelerator/latest');
    }
  }
}
