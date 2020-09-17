import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// mock constants
import { MARKERS } from './mock-markers';
// interfaces
import { IMarker } from '../../../types/classes/IMarker';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    public get markers(): Observable<IMarker[]> {
      return of(MARKERS);
    }
}
