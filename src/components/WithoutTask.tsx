import {Calendar} from 'lucide-react';

const WithoutTask = () => {
	return (
		<div className='w-full flex justify-center items-center xl gap-2'>
			<span className='text-center text-zinc-300 text-2xl'>
				{' '}
				Nenhuma tarefa criada
			</span>
			<Calendar color='#fff' size={20} />
		</div>
	);
};

export {WithoutTask};
