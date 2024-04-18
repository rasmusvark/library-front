import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddBookView from '../views/AddBookView.vue';
import BorrowView from '../views/BorrowView.vue';
import ReturnView from '../views/ReturnView.vue';
import CatalogView from '../views/CatalogView.vue';
import DeleteView from '../views/DeleteView.vue';

const router = createRouter({
    history: createWebHistory(), 
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/add-book',
            name: 'AddBook',
            component: AddBookView
        },
        {
            path: '/borrow',
            name: 'Borrow',
            component: BorrowView
        },
        {
            path: '/return',
            name: 'Return',
            component: ReturnView
        },
        {
            path: '/catalog',
            name: 'Catalog',
            component: CatalogView
        },
        {
            path: '/delete',
            name: 'DeleteBook',
            component: DeleteView
        }
    ]
});

export default router;
