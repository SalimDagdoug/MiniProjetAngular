  import { Component, numberAttribute, OnInit } from '@angular/core';
  import { produit, stock } from '../interfaces/stockInterface';
  import { ServiceService } from '../service.service';
  import { StockService } from '../services/stock.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-stock',
    standalone: true,
    imports: [CommonModule,FormsModule,RouterModule],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.css'
  })
  export class StockComponent implements OnInit {

    stocks: stock[] = [];
    products: produit[]=[];
    selectedProduct: number | null = null;
    stock = {
      id: null ,
      produits: [] as produit[],
      qte: null,
      action: true,
    };
    

    

    constructor(private stockService:StockService) {}

    ngOnInit(): void {
      this.stockService.getStocks().subscribe(
        (data) => {
          this.stocks = data;
          console.log('Stocks data:', this.stocks);  // Verify data
        },
        (error) => {
          console.error('Error fetching stocks:', error);  // Handle error
        }
      );
      this.getProducts();
    }

// delete from stock
    deleteStock(id: number | undefined) {
      if (id === undefined) {
        console.error('Invalid stock ID');
        return;
      }
      this.stockService.deleteStock(id).subscribe(
        (response) => {
          console.log('Stock deleted successfully:', response);
          // Remove the deleted stock from the local array
          this.stocks = this.stocks.filter(stock => stock.id !== id);
        },
        (error) => {
          console.error('Error deleting stock:', error);
          alert('Error deleting stock. Please try again.');
        }
      );
    }
    getProducts(){
      this.stockService.getProduits().subscribe(
        (data) => {
          this.products = data;
          console.log('Stocks data:', this.stocks);  // Verify data
        },
        (error) => {
          console.error('Error fetching stocks:', error);  // Handle error
        }
      );
    }

    addStock() {
  if (this.selectedProduct === null) {
    console.error('No product selected');
    return;
  }
//----------------------- add stock----------------------------
  const stockData = {
    produits: [{ id: this.selectedProduct }],
    qte: this.stock.qte,
    action: this.stock.action,
  };

  console.log('Prepared stock data:', stockData);  // Log the prepared data to the console

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  this.stockService.createStock(stockData, { headers }).subscribe(
    (response) => {
      console.log('Stock added successfully', response);
      this.ngOnInit();
      window.location.reload();

    },
    (error) => {
      console.error('Error adding stock', error);
      
      // Check if the error contains a specific message from the backend
      if (error.error && error.error.message) {
        console.log('Backend error details:', error.error.message);
        alert(error.error.message);  // Display error message in an alert box
      } else {
        alert('An unexpected error occurred');  // Fallback message
      }
    }
  );
}


  }
