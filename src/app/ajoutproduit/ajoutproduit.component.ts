import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Router } from '@angular/router'; // Import Router
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ajoutproduit',
  standalone: true,
  imports: [FormsModule],  // Include FormsModule
  templateUrl: './ajoutproduit.component.html',
  styleUrls: ['./ajoutproduit.component.css']
})
export class AjoutproduitComponent implements OnInit {
  produit = {
    libelle: '',
    prix: null,
    qteStock: 0
  };

  constructor(private apiservice: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.produit.libelle && this.produit.prix !== null && this.produit.qteStock >= 0) {
      this.apiservice.ajoutproduit(this.produit).subscribe({
        next: (response) => {
          console.log('Produit ajouté avec succès', response);
          alert('Produit ajouté avec succès!');
          this.resetForm();

          // Redirect to /Home/Produit after success
          this.router.navigate(['/Home/Produit']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
          alert('Erreur lors de l\'ajout du produit.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  resetForm() {
    this.produit = {
      libelle: '',
      prix: null,
      qteStock: 0
    };
  }
}
