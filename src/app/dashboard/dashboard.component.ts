import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ServiceService } from '../service.service';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  produits: any = [];
  totalProduits: number = 0;
  totalStock: number = 0;
  stockData: any = [];

  constructor(private apiservice: ServiceService, private stockService: StockService) { }

  ngOnInit(): void {
    this.getAllProduits();
    this.getAllStocks();
    // Enregistrer tous les composants nécessaires de Chart.js
    Chart.register(...registerables);
  }

  getAllProduits(): void {
    this.apiservice.getProduits().subscribe(
      (data) => {
        this.produits = data;
        this.totalProduits = this.produits.length; // Compter le nombre de produits
        console.log('Produits:', this.produits);
        
        // Créer les graphiques après avoir récupéré les produits
        this.createBarChart();
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  getAllStocks(): void {
    this.stockService.getStocks().subscribe(
      (data) => {
        this.stockData = data;
        this.totalStock = this.stockData.reduce((total: number, stock: any) => total + stock.qte, 0); // Calculer le total du stock global
        console.log('Données de stock:', this.stockData);

        // Créer le graphique circulaire pour le stock
        this.createPieChart();
      },
      (error) => {
        console.error('Erreur lors de la récupération des stocks:', error);
      }
    );
  }

  createBarChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.produits.map((produit: any) => produit.libelle),  // Libellé des produits comme labels
          datasets: [{
            label: 'Quantité en Stock',
            data: this.produits.map((produit: any) => produit.qteStock),  // Quantité en stock des produits
            backgroundColor: 'rgba(0, 123, 255, 0.5)',  // Couleur bleu transparente
            borderColor: 'rgba(0, 123, 255, 1)',  // Bordure bleue
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white',
              }
            },
            x: {
              ticks: {
                color: 'white',
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              }
            },
            tooltip: {
              callbacks: {
                title: (tooltipItem) => tooltipItem[0].label,
                label: (tooltipItem) => `Stock: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    }
  }

  createPieChart(): void {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
  
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.stockData.map((stock: any) => stock.produits[0].libelle),  // Utilisation du libellé du produit
          datasets: [{
            label: 'Quantité en Stock',
            data: this.stockData.map((stock: any) => stock.qte),  // Quantité en stock de chaque entrée
            backgroundColor: this.stockData.map((_: any, index: number) => {
              // Créer une couleur différente pour chaque segment
              const colors = [
                'rgba(255, 99, 132, 0.5)', 
                'rgba(255, 206, 86, 0.5)',   // Jaune 
                'rgba(255, 159, 64, 0.5)',    // Orange                // Rouge
                'rgba(54, 162, 235, 0.5)',   // Bleu
                'rgba(255, 206, 86, 0.5)',   // Jaune
                'rgba(75, 192, 192, 0.5)',   // Vert
                'rgba(153, 102, 255, 0.5)',  // Violet
              ];
              return colors[index % colors.length];  // Cycle les couleurs si plus de 6 segments
            }),
            borderColor: this.stockData.map(() => 'rgba(0, 0, 0, 1)'),  // Bordure noire
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'white',
              }
            },
            tooltip: {
              callbacks: {
                title: (tooltipItem) => tooltipItem[0].label,
                label: (tooltipItem) => `Stock: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    }
  }
  
}
