import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Acceleration, AcceleratorService } from '../../services/accelerator.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-latest-acceleration',
  templateUrl: 'latest-acceleration.component.html',
  styleUrls: ['./latest-acceleration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestAccelerationComponent implements OnInit {
  accelerationSubscription: Observable<Acceleration[]>;

  constructor(private acceleratorService: AcceleratorService) {}

  ngOnInit() {
    this.accelerationSubscription = this.acceleratorService.getLatestAcceleration$().pipe(
      tap((latest) => {
        console.log(latest);
      })
    );
  }
}