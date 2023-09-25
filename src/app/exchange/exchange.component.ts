import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  public fromCurrency: string = "";
  public toCurrency: string = "";
  public value = 0;
  public exchangeValue = 0;
  public currencyKeys: string[] = []

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
        // this.value = this.value * this.exchangeValue;
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


  fetchPrice(){  
    const apiUrl = environment.apiBaseUrl + "convert";
    let queryParams = new HttpParams()
      .append('currency1', this.fromCurrency)
      .append('currency2', this.toCurrency)
      .append('value', this.value);
  
    this.httpClient.get<any>(apiUrl, {params: queryParams}).subscribe((data) => {
      if(data.status == "Success"){
      this.exchangeValue = data.data.result
      // this.value = this.value * this.exchangeValue;
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
