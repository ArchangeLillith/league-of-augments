// App.tsx
import AppRoutes from "./AppRoutes";
import { ModalProvider } from "./modalContext/ModalContext";

const App = () => {
	return (
		<ModalProvider>
			<AppRoutes />
		</ModalProvider>
	);
};

export default App;
