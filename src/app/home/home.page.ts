import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  artes: any[] = []; // Inicializa artes como um array vazio
  data: any;

  constructor(private apiService: ApiService) {
    this.getData();
  }

  getData() {
    this.apiService.getData("Object", this.page).subscribe(res => {
      this.data = res;
      this.artes = this.data.records;
      this.perPage = this.data.info.totalrecordsperquery;
      this.totalPage = this.data.info.pages;
      this.totalData = this.data.info.totalrecords;
      console.log(this.artes);
    });
  }

  doInfinite(InfiniteScroll: any) {
    setTimeout(() => {
      this.page++; // Incrementa o número da página
      if (this.page <= this.totalPage) { // Verifica se há mais páginas para buscar
        this.apiService.getData("Object", this.page).subscribe(res => {
          this.data = res; // Armazena os dados retornados
          // Adiciona os registros de dados adicionais ao array artes
          for (let i = 0; i < this.data.records.length; i++) {
            this.artes.push(this.data.records[i]);
          }
          // Notifica o InfiniteScroll que a operação foi concluída
          InfiniteScroll.target.complete();
        });
      } else {
        // Desativa a rolagem infinita se não houver mais dados
        InfiniteScroll.target.disabled = true;
      }
    }, 1000); // Configura um tempo de espera antes de buscar os dados
  }
}