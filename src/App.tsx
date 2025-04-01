import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import ChampPage from "./champ-page/ChampPage";
import Login from "./login-page/Login";

// Lazy-loaded components
const HomePage = React.lazy(() => import("./home-page/HomePage"));

// Route paths as constants
export const ROUTE_PATHS = {
	LOGIN: "/",
	HOME: "/home",
	CHAMP_PAGE: `/:champName`,
};

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: ROUTE_PATHS.LOGIN, element: <Login /> },
		{ path: ROUTE_PATHS.HOME, element: <HomePage /> },
		{ path: ROUTE_PATHS.CHAMP_PAGE, element: <ChampPage /> },
	]);

	return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default AppRoutes;
