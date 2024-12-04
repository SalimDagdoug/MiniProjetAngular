export interface stock{

    id?:number;
    produits: produit[];
    action : boolean ;
    qte : number;
    createdAt : Date;
    updateddAt :Date
}

export interface produit{

    id?:number;
    libelle: string;
    prix : number ;
    qteStock : number
    stock : stock
}