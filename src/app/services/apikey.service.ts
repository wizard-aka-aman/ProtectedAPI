import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CreateApiDto {
  name: string;
  allowedIps: string[];
}

@Injectable({ providedIn: 'root' })
export class ApikeyService {
  private base = 'https://romigas369.bsite.net/api/apikeys';
  // private base = 'https://localhost:7232/api/apikeys';

  constructor(private http: HttpClient) {}

  create(dto: CreateApiDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdWJqZWN0IiwianRpIjoiMWUwMTI1MDQtNjc3Zi00MGU3LTljMTItOGNmZGZjZGRlNTg3IiwiVXNlck5hbWUiOiJhbWFuXyIsIkVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJGdWxsTmFtZSI6IkFtYW4gVmVybWEiLCJleHAiOjE3NjI0OTI0ODQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDYvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0Ni8ifQ.jatgHOx1qmhRc22ZiwC1E_oizrR5wZuFEhx_Vx0Z9ug'
    });
    return this.http.post(this.base, dto, {headers});
  }

  list(): Observable<any> {
    return this.http.get(this.base);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.base}/${id}`);
  }
  verify(id: string ){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdWJqZWN0IiwianRpIjoiMWUwMTI1MDQtNjc3Zi00MGU3LTljMTItOGNmZGZjZGRlNTg3IiwiVXNlck5hbWUiOiJhbWFuXyIsIkVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJGdWxsTmFtZSI6IkFtYW4gVmVybWEiLCJleHAiOjE3NjI0OTI0ODQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDYvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0Ni8ifQ.jatgHOx1qmhRc22ZiwC1E_oizrR5wZuFEhx_Vx0Z9ug'
    });
    return this.http.get(`https://romigas369.bsite.net/public/verify/${id}`,{headers: header});
    // return this.http.get(`https://localhost:7232/public/verify/${id}`,{headers: header});
  }
  getHello(token:string){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // return this.http.get('https://localhost:7232/protected/hello' ,{headers: header});
    return this.http.get('https://romigas369.bsite.net/protected/hello' ,{headers: header});
  }
}
