import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {interval, Observable} from "rxjs";
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
  customInterval$ = new Observable((subscriber) => {
    // subscriber.error('data');
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if(timesExecuted > 3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...')
      subscriber.next({message: 'New value'});
      timesExecuted++;
    }, 1000);
  })
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

    // const subscription = this.clickCount$.subscribe({
    //   next: value => console.log(`Clicked button ${this.clickCount()} times`)
    // })
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })

    const subscription = this.customInterval$.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed'),
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onClick() {
    this.clickCount.update(value => value + 1);
  }

}
