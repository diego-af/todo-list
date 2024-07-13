import {useQuery} from '@tanstack/react-query';
import {getCategories} from '../../getCategories';
import {IItemProps} from '../../../types/types';

const useQueryCategories = () => {
	const {data, isLoading} = useQuery<IItemProps[], Error>({
		queryKey: ['categories'],
		queryFn: getCategories,
		refetchOnWindowFocus: true
	});
	console.log(data);
	return {data, isLoading};
};

export {useQueryCategories};
