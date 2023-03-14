import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
import BasicLayout from "../layouts/BasicLayout";
//
import Page404 from "../pages/404Page";
import RecordVideoPage from "../pages/RecordVideoPage";
import SessionsPage from "../pages/SessionsPage";
import FAQPage from "../pages/FAQPage";

// ----------------------------------------------------------------------

export function Router() {
    const routes = useRoutes([
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: "app", element: <SessionsPage /> },
                { path: "record", element: <RecordVideoPage /> },
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
