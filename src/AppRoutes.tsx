import { useRoutes } from "react-router-dom";
import ChampPage from "./champ-page/ChampPage";
import Login from "./login-page/Login";
import HomePage from "./home-page/HomePage";
import ItemPage from "./items/items";
import AugmentAlchemy from "./augment-alchemy-page/AugmentAlchemy";
import NotFoundPage from "./not-found-page/NotFoundPage";

export const ROUTE_PATHS = {
	LOGIN: "/",
	HOME: "/home",
	CHAMP_PAGE: "/champ/:champName",
	ITEMS: "/items",
	AUGMENT_ALCHEMY: "/augment-alchemy",
};

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: ROUTE_PATHS.LOGIN, element: <Login /> },
		{ path: ROUTE_PATHS.HOME, element: <HomePage /> },
		{ path: ROUTE_PATHS.CHAMP_PAGE, element: <ChampPage /> },
		{ path: ROUTE_PATHS.ITEMS, element: <ItemPage /> },
		{ path: ROUTE_PATHS.AUGMENT_ALCHEMY, element: <AugmentAlchemy /> },
		{ path: "*", element: <NotFoundPage /> },
	]);

	return routes;
};

export default AppRoutes;
