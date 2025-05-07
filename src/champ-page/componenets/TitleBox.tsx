import { RiQuillPenAiFill } from "react-icons/ri";
import { saveTitle } from "../champPage.utils";
import { TitleBoxProps } from "../../utils/interfaces";

export const TitleBox: React.FC<TitleBoxProps> = ({
	titleRef,
	state,
	setState,
}) => {
	return (
		<>
			{state.currentBuild && !state.isEditing ? (
				<div className="title-box">
					<h1>{state.currentBuild.name}</h1>
					<button
						onClick={() => {
							setState((prev) => ({
								...prev,
								isEditing: true,
							}));
						}}
						className="gold-button"
					>
						<RiQuillPenAiFill />
					</button>
				</div>
			) : (
				<form
					className="title-box"
					onSubmit={(e) => {
						e.preventDefault();
						saveTitle(state, setState);
					}}
				>
					<input
						value={state.title}
						ref={titleRef}
						className="login-input"
						onChange={(e) =>
							setState((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
					/>
					<button type="submit" className="gold-button">
						<RiQuillPenAiFill />
					</button>
				</form>
			)}
		</>
	);
};
