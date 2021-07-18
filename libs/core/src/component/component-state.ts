import { BehaviorSubject, Observable } from 'rxjs';


export type States = 'idle' | 'loading' | string;

export class ComponentState {
  private readonly state: BehaviorSubject<States>;

  constructor(state: States = 'idle') {
    this.state = new BehaviorSubject<States>(state);
    this.setState(state);
  }

  /**
   * Changes the state of the class
   */
  setState(state: States): void {
    if (state !== this.instant) {
      this.state.next(state);
    }
  }

  /**
   * A multicasting observable that emits an event every time the stored state changes
   */
  get stateChanges(): Observable<States> {
    return this.state.asObservable();
  }

  /**
   * Get the current state synchronously
   */
  get instant(): States {
    return this.state.value;
  }

  /**
   * Sync check if the current state is idle
   */
  get isIdle(): boolean {
    return this.instant === 'idle';
  }

  /**
   * Sync check if the current state is loading
   */
  get isLoading(): boolean {
    return this.instant === 'loading';
  }
}
