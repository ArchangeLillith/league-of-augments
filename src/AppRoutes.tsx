import { useRoutes } from "react-router-dom";
import ChampPage from "./champ-page/ChampPage";
import Login from "./login-page/Login";
import HomePage from "./home-page/HomePage";

export const ROUTE_PATHS = {
	LOGIN: "/",
	HOME: "/home",
	CHAMP_PAGE: "/champ/:champName",
};

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: ROUTE_PATHS.LOGIN, element: <Login /> },
		{ path: ROUTE_PATHS.HOME, element: <HomePage /> },
		{ path: ROUTE_PATHS.CHAMP_PAGE, element: <ChampPage /> },
	]);

	return routes;
};

export default AppRoutes;
