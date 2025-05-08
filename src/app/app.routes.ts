import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MainComponent } from './pages/main/main.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: 'products/:id', component: ProductDetailsComponent},
    { path: 'catalog', component: CatalogComponent},
    { path: '', component: MainComponent },
    { path: 'about', component: AboutComponent },
];
