import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Intake} from '../models/intake';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public getIntakeList(): Observable<Intake[]> {
    return this.http.get<Intake[]>(`${this.baseUrl}/intakes`);
  }
}
