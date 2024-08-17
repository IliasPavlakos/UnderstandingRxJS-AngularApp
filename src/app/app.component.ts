import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update(value => value + 1);
    // }, 1000);

    // const subscription = interval(1000).pipe(
    //   map((value) => value * 2)
    // ).subscribe({
    //   next: (value) => console.log(value)
    // });
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })
  }

  onClick(){
    this.clickCount.update(value => value + 1);
  }

}
