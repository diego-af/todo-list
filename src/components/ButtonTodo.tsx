import * as Dialog from '@radix-ui/react-dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import axios from 'axios';

const ButtonTask = () => {
	const [tasks, setTasks] = useState('');
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const {mutateAsync} = useMutation({
		mutationFn: (task: string) => {
			return axios.post(import.meta.env.VITE_REACT_API_URL + '/post', {
				title: task,
				categoryId: '65de7f37275096db89804802'
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['list']});
			setTasks('');
			setOpen(false);
		}
	});
	const getCategory = async () => {
		const response = await axios.get(
			import.meta.env.VITE_REACT_API_URL + '/categories'
		);

		return response.data.data;
	};
	const {data} = useQuery({
		queryKey: ['categories'],
		queryFn: getCategory,
		refetchOnWindowFocus: true
	});

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className='bg-blue-500 w-fit h-8 rounded-full p-6 text-white flex justify-center items-center hover:bg-blue-600'>
					Criar task
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
				<Dialog.Content className='bg-white border p-4 rounded-lg p4 w-[400px] flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit'>
					<Dialog.Title className='text-center text-lg text-zinc-700'>
						Criar task
					</Dialog.Title>

					<input
						type='text'
						value={tasks}
						className='w-full border border-slate-800 p-2 rounded-lg mt-4 outline-none'
						placeholder='Digite o nome da task'
						onChange={(e) => setTasks(e.target.value)}
					/>

					<select className='w-full border border-slate-800 p-2 rounded-lg mt-4 outline-none'>
						<option>Selecione uma categoria</option>
						{data?.map((item: any) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>

					<div className='w-full flex justify-between mt-4'>
						<Dialog.Close asChild>
							<button className='bg-trasparent w-[130px] h-4 rounded-lg p-4 text-zinc-700 flex justify-center items-center border border-slate-800'>
								Cancelar
							</button>
						</Dialog.Close>

						<button
							className='bg-blue-500 w-[130px] h-4 rounded-lg p-4 text-white flex justify-center items-center hover:bg-blue-600'
							onClick={() => mutateAsync(tasks)}
						>
							Criar
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export {ButtonTask};
