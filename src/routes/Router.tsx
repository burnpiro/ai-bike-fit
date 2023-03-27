import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
import BasicLayout from "../layouts/BasicLayout";
//
import Page404 from "../pages/404Page";
import RecordSessionPage from "../pages/RecordSession";
import FAQPage from "../pages/FAQPage";
import SessionsListPage from "../pages/Sessions";

// ----------------------------------------------------------------------

export function Router() {
    const routes = useRoutes([
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: "app", element: <SessionsListPage /> },
                { path: "record", element: <RecordSessionPage /> },
                { path: "faq", element: <FAQPage /> },
                { path: "support", element: <div /> },
            ],
        },
        {
            element: <BasicLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: "404", element: <Page404 /> },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
