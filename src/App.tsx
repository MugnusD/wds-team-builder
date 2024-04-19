import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {Provider} from "react-redux";
import {store, persistor} from "./store.ts";
import {PersistGate} from 'redux-persist/integration/react';

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {Toaster} from "react-hot-toast";

import AppLayout from "./pages/AppLayout.tsx";
import Error from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import PageNotFount from "./pages/PageNotFount.tsx";
import TeamBuilder from "./pages/TeamBuilder.tsx";
import Detail from "./pages/Detail.tsx";
import CardDetail from "./features/detail/CardDetail.tsx";
import CustomDragLayer from "./ui/CustomDragLayer.tsx";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                index: true,
                element: <Navigate to={`team-builder`} />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'team-builder',
                element: <TeamBuilder />,
            },
            {
                path: 'detail',
                element: <Detail />,
                children: [
                    {
                        path: ':id',
                        element: <CardDetail />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <PageNotFount />,
    },
]);

function App() {
    return (
        <DndProvider backend={HTML5Backend}>

            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>

                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />

                        <CustomDragLayer />
                        <Toaster />
                        <RouterProvider router={router} />

                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </DndProvider>
    );
}

export default App;
