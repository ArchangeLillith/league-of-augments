// context/ModalContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
	showModal: (content: ReactNode) => void;
	hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error("useModal must be used within ModalProvider");
	return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	const showModal = (content: ReactNode) => setModalContent(content);
	const hideModal = () => setModalContent(null);

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{modalContent && (
				<div className="modal-backdrop">
					<div className="modal-content">{modalContent}</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};
