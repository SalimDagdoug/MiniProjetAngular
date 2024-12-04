import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockApiUrl = 'http://localhost:8080/api/stocks' // Replace with your backend API endpoint
  private produitApiUrl = 'http://localhost:8080/api/produits' // Endpoint for produit

  constructor(private http: HttpClient) {}

  // Stock API Methods
  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.stockApiUrl);
  }

  getStockById(id: number): Observable<any> {
    return this.http.get<any>(`${this.stockApiUrl}/${id}`);
  }

  createStock(stockData: any, options: { headers: HttpHeaders }): Observable<any> {
    return this.http.post<any>(this.stockApiUrl, stockData,options);
  }

  updateStock( stockData: any): Observable<any> {
    return this.http.put<any>(`${this.stockApiUrl}/${stockData.id}`, stockData);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.stockApiUrl}/${id}`);
  }

  // Produit API Methods
  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.produitApiUrl);
  }

  getProduitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.produitApiUrl}/${id}`);
  }

  createProduit(produitData: any): Observable<any> {
    return this.http.post<any>(this.produitApiUrl, produitData);
  }

  updateProduit(id: number, produitData: any): Observable<any> {
    return this.http.put<any>(`${this.produitApiUrl}/${id}`, produitData);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.produitApiUrl}/${id}`);
  }
}
