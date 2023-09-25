import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit{
  public currencyKeys: string[] = [];
  public fromCurrency = "";
  public toCurrency = "";
  public showChart = false
  public lineChartData: any[] = [
    {
      data: [],
      label: ``
    }
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
 

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const keys = localStorage.getItem('Key');
    if(keys !== null){
      this.currencyKeys = keys.split(",");
    }
    else{
      const apiUrl = environment.apiBaseUrl + "currency";
      this.httpClient.get<any>(apiUrl).subscribe((data) => {
        if(data.status == "Success"){
        console.log(data);
        this.currencyKeys = data.data.symbols
        localStorage.setItem('Key', data.data);
        }
        else{
          throw new Error("Something went wrong"); 
        }
      },
      (error) => {
        console.error('API Error:', error);
      });
    }
  }


  fetchHistoricData(){
    const apiUrl = environment.apiBaseUrl + "historical-data";
    let queryParams = new HttpParams()
      .append('currency1', this.fromCurrency)
      .append('currency2', this.toCurrency)
  
    this.httpClient.get<any>(apiUrl, {params: queryParams}).subscribe((data) => {
      if(data.status == "Success"){

        this.lineChartLabels = [...data.data.dates];
        this.lineChartData[0].data = data.data.prices;
        this.lineChartData[0].label = `${this.fromCurrency} - ${this.toCurrency} `;
        this.showChart = true
        // console.log(this.lineChartData)
      }
      else{
        throw new Error("Something went wrong"); 
      }
    },
    (error) => {
      console.error('API Error:', error);
    });
    
  }
  }

