import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {Provider} from "react-redux";
import store from "./store.ts";

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {Toaster} from "react-hot-toast";

import AppLayout from "./page/AppLayout.tsx";
import Error from "./page/Error.tsx";
import Home from "./page/Home.tsx";
import PageNotFount from "./page/PageNotFount.tsx";
import TeamBuilder from "./page/TeamBuilder.tsx";
import Detail from "./page/Detail.tsx";
import CardDetail from "./features/detail/CardDetail.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        }
    }
});

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                index: true,
                element: <Navigate to={`team-builder`} />
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'team-builder',
                element: <TeamBuilder />
            },
            {
                path: 'detail',
                element: <Detail />,
                children: [
                    {
                        path: ':id',
                        element: <CardDetail />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <PageNotFount />,
    }
])

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <Toaster />
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </DndProvider>
    )
}

export default App
