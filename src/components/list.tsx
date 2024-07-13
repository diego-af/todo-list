import {Loading} from './Loading';
import {useQueryGetTodo} from '../functions/hooks/querys/useQueryGetTodo';
import {WithoutTask} from './WithoutTask';
import ItemList from './ItemList';

const List = () => {
	const {data, isLoading} = useQueryGetTodo();

	if (isLoading) {
		return <Loading />;
	}
	if (data?.length === 0) {
		return <WithoutTask />;
	}

	return (
		<main className='w-full flex flex-col '>
			<ItemList data={data} />
		</main>
	);
};

export {List};
