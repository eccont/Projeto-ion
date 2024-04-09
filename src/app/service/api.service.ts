import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

//Dados para acessar a API
private url:string="https://api.harvardartmuseums.org/";
private key: string="ec3952b0-5b72-488a-8e66-207b556cd15b";


 constructor(private http: HttpClient) { }


 // Retorna os dados da API 
 getData(endpoint:string,page: number ){

return this.http.get<any>(`${this.url}${endpoint}?apikey=${this.key}&page=${page}`);


}
}
