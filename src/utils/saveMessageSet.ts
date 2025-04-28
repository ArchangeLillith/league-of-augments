import { SetStateAction } from "react";
import { ChampPageState } from "./types";

//This governs the save message appearing and dissappearing
export const showSaveMessage = (
	message: string,
	setChampPageState?: React.Dispatch<SetStateAction<ChampPageState>> | null,
  setError?: React.Dispatch<SetStateAction<string | null>>,
  error?: boolean
) => {
  if(setChampPageState){
    setChampPageState((prev) => ({ ...prev, saveMessage: message }));
    setTimeout(
      () => setChampPageState((prev) => ({ ...prev, saveMessage: null })),
      3000
    );
  }
  if(setError){
    setError(message);
    setTimeout(
      () => setError(null),
      3000
    );
  }
};