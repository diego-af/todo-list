export type IItemProps = {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string;
	upadatedAt: string;
	category: {
		id: string;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
};
export interface EditState {
	editing: boolean;
	value: string;
}

export interface EditStates {
	[key: string]: EditState;
}
