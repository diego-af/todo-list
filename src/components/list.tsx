import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

import {format} from 'date-fns';
import {Loading} from './Loading';
import {IItemProps} from '../types/types';
import * as Dialog from '@radix-ui/react-dialog';
import {useState} from 'react';
import {Tag} from 'lucide-react';

const List = () => {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState<IItemProps>({} as IItemProps);
	const [load, setLoad] = useState(false);
	const [deleteTask, setDeleteTask] = useState(false);
	const queryClient = useQueryClient();
	const getTodo = async () => {
		const response = await axios.get(
			import.meta.env.VITE_REACT_API_URL + '/post'
		);

		return response.data.data;
	};
	const {data, isLoading} = useQuery({
		queryKey: ['list'],
		queryFn: getTodo,
		refetchOnWindowFocus: true
	});

	const {mutateAsync} = useMutation({
		mutationFn: (item: IItemProps) => {
			setLoad(true);

			if (!deleteTask) {
				return axios.put(
					import.meta.env.VITE_REACT_API_URL + `/post/${item.id}`,
					{
						title: item.title,
						completed: !item.completed
					}
				);
			}
			return axios.delete(
				import.meta.env.VITE_REACT_API_URL + `/post/${item.id}`
			);
		},
		onSuccess: () => {
			setOpen(false);
			setItem({} as IItemProps);
			queryClient.invalidateQueries({queryKey: ['list']});
			setLoad(false);
		}
	});

	if (isLoading) {
		return <Loading />;
	}
	if (data.length === 0) {
		return (
			<div className='w-full text-center text-zinc-300 text-2xl'>
				Nenhuma tarefa criada
			</div>
		);
	}

	return (
		<main className='w-full flex flex-col '>
			<ul className='grid grid-cols-2 md:grid-cols-3 gap-2 p-2'>
				{data?.map((item: IItemProps) => (
					<li
						className={`${
							item.completed ? 'bg-black/30' : 'bg-white'
						}  p-2 flex flex-col gap-3 rounded-lg cursor-pointer relative`}
						key={item.id}
						onClick={() => {
							setOpen(true);
							setItem(item);
						}}
					>
						<span className='text-zinc-700 text-lg tracking-wide'>
							{item.title}
						</span>

						<div className='text-zinc-500 flex  text-sm   gap-1 items-center '>
							<strong className='text-zinc-700'>Criado em: </strong>
							<span> {format(item.createdAt, 'dd/MM/yyyy')}</span>
						</div>

						<div className=' bg-blue-300 p-1 w-fit rounded-lg flex gap-2'>
							<Tag color='rgb(59 130 246)' size={18} />
							<span className='text-zinc-700 text-sm'>
								{item.category.name}
							</span>
						</div>
					</li>
				))}
			</ul>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
					<Dialog.Content className='bg-white h-fit border p-4 rounded-lg p4 w-[400px] flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
						<Dialog.Title className='text-center text-lg text-zinc-700'>
							O que deseja fazer com essa tarefa ?
						</Dialog.Title>

						<div className='w-full flex justify-between mt-4'>
							<Dialog.Close asChild>
								<button
									className='bg-transparent w-[150px] h-4 rounded-lg p-4 text-zinc-700 flex justify-center items-center border border-red-400'
									onClick={() => {
										mutateAsync(item);
										setDeleteTask(true);
									}}
								>
									Excluir
								</button>
							</Dialog.Close>

							<button
								className={`bg-blue-500 w-[170px] h-4 rounded-lg p-4 text-white flex justify-center items-center hover:bg-blue-600 ${
									load ? 'opacity-50' : ''
								}`}
								disabled={load}
								onClick={() => {
									mutateAsync(item);
									setDeleteTask(false);
								}}
							>
								{item?.completed ? 'Desmarcar' : 'Marcar como feito'}
							</button>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</main>
	);
};

export {List};
