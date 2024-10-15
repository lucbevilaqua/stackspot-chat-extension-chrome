import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Execution {
  execution_id: string;
  quick_command_slug: string;
  conversation_id: string;
  progress: {
    start: string;
    end: string;
    duration: number;
    execution_percentage: number;
    status: string;
  };
  steps: Array<{
    step_name: string;
    execution_order: number;
    type: string;
    step_result: {
      status_code: number;
      headers: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
      };
      data: string;
      json_data: any;
    };
  }>;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class StackspotService {
  private http = inject(HttpClient);
  private token: string = '';

  getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('client_id', environment.clientId)
      .set('grant_type', 'client_credentials')
      .set('client_secret', environment.clientKey);

    return this.http.post(`https://idm.stackspot.com/${environment.realm}/oidc/oauth/token`, body, { headers }).pipe(tap((response: any) => this.token = response.access_token));
  }

  createExecution(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      input_data: {
        selected_code: prompt
      }
    }

    return this.http.post<string>(`${environment.genaiUrl}/create-execution/prompt-remote`, body, { headers });
  }

  getExecution(executionId: string): Observable<Execution> {
    return this.http.get<Execution>(`${environment.genaiUrl}/callback/${executionId}`)
  }
}
