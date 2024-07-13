import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IItemProps} from '../../../types/types';
import axios from 'axios';

const useMutationDelete = () => {
	const queryClient = useQueryClient();
	const {mutateAsync} = useMutation({
		mutationFn: (item: IItemProps) => {
			return axios.delete(
				import.meta.env.VITE_REACT_API_URL + `/post/${item.id}`
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['list']});
		}
	});

	return {
		deleteTaskAsync: mutateAsync
	};
};

export {useMutationDelete};
