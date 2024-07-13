import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IItemProps} from '../../../types/types';
import axios from 'axios';

const useMutationUpdated = () => {
	const queryClient = useQueryClient();
	const {mutateAsync} = useMutation({
		mutationFn: (item: IItemProps) => {
			return axios.put(
				import.meta.env.VITE_REACT_API_URL + `/post/${item.id}`,
				{
					title: item.title,
					completed: !item.completed
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['list']});
		}
	});

	return {
		mutateAsync
	};
};

export {useMutationUpdated};
