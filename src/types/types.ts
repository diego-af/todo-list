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
