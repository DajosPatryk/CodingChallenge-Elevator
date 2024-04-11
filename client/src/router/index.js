import {createRouter, createWebHistory} from "vue-router";
import ShoppingListView from "../views/ShoppingListView.vue";

const routes = [
    {
        path: "/",
        name: "shopping-list",
        component: ShoppingListView
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'not-found',
        component: () => import(/* webpackChunkName: "error" */ '../views/ErrorView.vue'),
        props: {
            code: 404,
            message: "We could not find this page."
        }
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;
