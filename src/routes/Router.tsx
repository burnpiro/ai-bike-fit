import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
import BasicLayout from "../layouts/BasicLayout";
//
import Page404 from "../pages/404Page";
import RecordSessionPage from "../pages/RecordSession";
import FAQPage from "../pages/FAQPage";
import {SessionsListPage, SessionPage} from "../pages/Sessions";

// ----------------------------------------------------------------------

export function Router() {
    const routes = useRoutes([
        {
            path: `${import.meta.env.BASE_URL}`,
            children: [
                {
                    path: "dashboard",
                    element: <DashboardLayout />,
                    children: [
                        { element: <Navigate to={`${import.meta.env.BASE_URL
                            }/dashboard/app`} />, index: true },
                        { path: "app", element: <SessionsListPage /> },
                        { path: "session/:id", element: <SessionPage /> },
                        { path: "record", element: <RecordSessionPage /> },
                        { path: "faq", element: <FAQPage /> },
                        { path: "support", element: <div /> },
                    ],
                },
                {
                    element: <BasicLayout />,
                    children: [
                        { element: <Navigate to={`${import.meta.env.BASE_URL
                            }/dashboard/app`} />, index: true },
                        { path: "404", element: <Page404 /> },
                        { path: "*", element: <Navigate to={`/${import.meta.env.BASE
                            }/404`} /> },
                    ],
                },
            ]
        },
        {
            path: "*",
            element: <Navigate to={`${import.meta.env.BASE_URL
            }/404`} replace />,
        },
    ]);

    return routes;
}
