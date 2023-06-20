import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AcceleratorService } from '../../services/accelerator.service';
import { Observable, catchError, map, of, repeat } from 'rxjs';

interface AccelerationFrontend {
  txid: string,
  feeDelta: number,
  added: number,
  pools: string[],
  status: string,
  feePaid: number,
  baseFee: number,
  vsizeFee: number,
  totalFee: number,
}

@Component({
  selector: 'app-latest-acceleration',
  templateUrl: 'latest-acceleration.component.html',
  styleUrls: ['./latest-acceleration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestAccelerationComponent implements OnInit {
  widget = false;
  isLoading = false;
  skeletonLines: number[] = [];

  accelerationSubscription: Observable<AccelerationFrontend[]>;

  constructor(private acceleratorService: AcceleratorService) {}

  ngOnInit() {
    this.skeletonLines = this.widget === true ? [...Array(6).keys()] : [...Array(15).keys()]; 
    this.isLoading = true;

    this.accelerationSubscription = this.acceleratorService.getLatestAcceleration$().pipe(
      map((latest) => {
        this.isLoading = false;
        return latest.map(a => {
          return Object.assign(a, {
            added: a.added * 1000,
            pools: a.pools.split('|').filter(pool => pool.length),
            totalFee: a.feePaid + a.baseFee + a.vsizeFee,
          });
        });
      }),
      catchError(() => of([])),
      repeat({delay: 10000})
    );
  }

  trackByFn(index: number) {
    return index;
  }
}