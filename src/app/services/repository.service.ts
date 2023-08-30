import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from '../models/base.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService <T extends BaseModel>  {


  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000/'


  add(element: T, endpoint: string): Observable<any> {
    let url = this.baseUrl + endpoint + '/add/'
    console.log('URL: ', url)
    return this.http.post<any>(url, element);
  }

  fetchAll(endpoint: string): Observable<T []> {
    return this.http.get<T []>(this.baseUrl + endpoint);
  }

  update(element: T, endpoint: string): Observable<any>  {
    return this.http.put<any>(this.baseUrl + endpoint + '/update', element);
  }

  delete(id: number, endpoint: string): Observable<any>  {
    return this.http.delete<any>(this.baseUrl + endpoint + '/delete/' + id);
  }
}
