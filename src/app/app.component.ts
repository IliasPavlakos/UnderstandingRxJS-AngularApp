import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {interval} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  // interval = signal(0);q
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });
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

    const subscription = this.clickCount$.subscribe({
      next: value => console.log(`Clicked button ${this.clickCount()} times`)
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onClick() {
    this.clickCount.update(value => value + 1);
  }

}
