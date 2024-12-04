import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ServiceService, Produit } from '../service.service';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule // Add CommonModule to use *ngIf and *ngFor
  ],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  router: any;
 

  products: Produit[] = [];

  constructor(private productService: ServiceService) {}

  ngOnInit(): void {
    this.loadProducts(); // Call to load products
  }

  loadProducts(): void {
    this.productService.getProduits().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
  updateProduct(id: number): void {
    this.router.navigate(['/Home/UpdateProduit', id]); // Navigates to the update component
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduit(id).subscribe(() => {
        alert('Product deleted successfully');
        this.loadProducts(); // Reload the product list
      });
    }
  }
}
