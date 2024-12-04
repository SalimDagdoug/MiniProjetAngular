import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stock } from '../../interfaces/stockInterface';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-stockdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stockdetails.component.html',
  styleUrls: ['./stockdetails.component.css']
})
export class StockdetailsComponent implements OnInit {

  stockId?: number;
  stockDetails: stock | null = null;
  selectedProduct: number | null = null;
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Ensure the id is treated as a number
      this.stockId = Number(params.get('id'));  // Convert the string to a number
      if (this.stockId) {
        this.getStockDetails(this.stockId); // Fetch stock details if id exists
        this.getProducts(); // Fetch products for the dropdown
      }
    });
  }

  getStockDetails(id: number): void {
    this.stockService.getStockById(id).subscribe(
      (data: stock) => {
        this.stockDetails = data;
        this.selectedProduct = data.produits?.[0]?.id || null;  // Set default selected product
        console.log('Stock details:', this.stockDetails);  // Make sure data is received
      },
      (error) => {
        console.error('Error fetching stock details:', error);
      }
    );
  }

  getProducts(): void {
    // Fetch the list of products from the StockService
    this.stockService.getProduits().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  updateStock(): void {
    if (this.stockDetails) {
      const updatedStock = {
        ...this.stockDetails,
        produitId: this.selectedProduct,
        id: this.stockId // Ensure ID is included
      };
      this.stockService.updateStock(updatedStock).subscribe(
        response => {
          console.log('Stock updated:', response);
          
          this.router.navigate(['/Home/Stock']); 
        },
        error => {
          console.error('Error updating stock:', error);
          alert('Failed to update stock.');
        }
      );
      
    }
  }
  
}
