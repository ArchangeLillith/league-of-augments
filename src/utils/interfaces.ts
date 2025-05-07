import { SetStateAction } from "react";
import { PageDataType, ChampPageState, Augment, ItemType } from "./types";

export interface AugmentPanelProps {
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	childKey: keyof PageDataType["selectedAugments"];
}

export interface AugSearchBarProps {
	pageData: PageDataType;
	setPageData: React.Dispatch<SetStateAction<PageDataType>>;
	childKey: keyof PageDataType["selectedAugments"];
}

export interface SelectedAugmentPanelProps {
	state: ChampPageState;
	setState: React.Dispatch<SetStateAction<ChampPageState>>;
}

export interface TitleBoxProps {
	titleRef: React.RefObject<HTMLInputElement | null>;
	state: ChampPageState;
	setState: React.Dispatch<SetStateAction<ChampPageState>>;
}

export interface AugmentTileProps {
	aug: Augment;
	state: ChampPageState | null;
	setState: React.Dispatch<SetStateAction<ChampPageState>> | null;
}

export interface ItemIconProps {
	item: ItemType;
	augment: Augment | null;
	itemPage: boolean;
}

export interface SaveMessageProps {
	saveMessage: string | null;
	error?: boolean;
}

export interface TooltipWrapperProps {
	children: React.ReactNode;
	tooltipText: string;
	gem?: boolean;
	item?: boolean;
	itemObj?: ItemType | null;
}

export interface WrapperProps {
	children: React.ReactNode;
}

export interface ItemCardProps {
	item: ItemType;
}
