import {useQuery} from '@tanstack/react-query';

import {IItemProps} from '../../../types/types';
import {getPost} from '../../getPosts';

const useQueryGetTodo = () => {
	const {data, isLoading} = useQuery<IItemProps[], Error>({
		queryKey: ['list'],
		queryFn: getPost,
		refetchOnWindowFocus: true
	});

	return {data, isLoading};
};

export {useQueryGetTodo};
