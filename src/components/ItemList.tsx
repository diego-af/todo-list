import {useState} from 'react';
import {EditStates, IItemProps} from '../types/types';
import {motion} from 'framer-motion';
import {format} from 'date-fns';
import {Check, CheckSquare, Pen, Squircle, Tag, Trash} from 'lucide-react';
import {useMutationUpdated} from '../functions/hooks/mutations/useMutationUpdated';
import {useMutationUpdatedEdit} from '../functions/hooks/mutations/useMutationUpdatedEdit';
import {useMutationDelete} from '../functions/hooks/mutations/useMutationDelete';

const ItemList = ({data}: {data: IItemProps[] | undefined}) => {
	const [edit, setEdit] = useState(false);
	const [editStates, setEditStates] = useState<EditStates | undefined>({});
	const {mutateAsync} = useMutationUpdated();
	const {mutateUpdatedEdit} = useMutationUpdatedEdit();
	const {deleteTaskAsync} = useMutationDelete();

	const handleEditStart = (id: string) => {
		setEdit(true);
		setEditStates((prev) => ({
			...prev,
			[id]: {editing: true, value: data?.find((item) => item?.id === id).title}
		}));
	};
	const handleTitleChange = (
		id: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setEditStates((prev) => ({
			...prev,
			[id]: {...prev[id], value: e.target.value}
		}));
	};
	return (
		<ul className='grid grid-cols-2 md:grid-cols-3 gap-4 p-2'>
			{data?.map((item: IItemProps) => (
				<motion.li
					initial={{opacity: 0}}
					animate={{x: 0, opacity: 1}}
					whileHover={{scale: 1.05}}
					className={`${
						item.completed ? 'opacity-1 bg-white/70' : 'bg-white'
					}  p-2 flex flex-col gap-3 rounded-lg cursor-pointer relative`}
					key={item.id}
				>
					{editStates[item.id]?.editing && edit ? (
						<input
							className='w-full border border-slate-800 p-2 rounded-lg mt-5 outline-none'
							placeholder='Edite sua tarefa'
							value={editStates[item.id]?.value || ''}
							onChange={(e) => handleTitleChange(item.id, e)}
						/>
					) : (
						<span className='text-zinc-700 text-lg tracking-wide'>
							{item.title}
						</span>
					)}

					<div className='text-zinc-500 flex  text-sm   gap-1 items-center '>
						<strong className='text-zinc-700'>Criado em: </strong>
						<span> {format(item?.createdAt, 'dd/MM/yyyy')}</span>
					</div>

					<div className=' bg-blue-300 p-1 w-fit rounded-lg flex gap-2'>
						<Tag color='rgb(59 130 246)' size={18} />
						<span className='text-zinc-700 text-sm'>{item?.category.name}</span>
					</div>

					{edit ? (
						<Check
							className='absolute top-2 right-2'
							size={18}
							color='green'
							onClick={() => {
								const itemEdit = {
									id: item.id,
									title: editStates[item.id]?.value || item.title,
									completed: item.completed,
									createdAt: item.createdAt,
									upadatedAt: item.upadatedAt,
									category: item.category
								};

								mutateUpdatedEdit(itemEdit);
								setEdit(false);
							}}
						/>
					) : (
						<Pen
							className='absolute top-2 right-2'
							size={18}
							onClick={() => handleEditStart(item.id)}
						/>
					)}
					<Trash
						className='absolute  bottom-4 right-2'
						size={18}
						color='red'
						onClick={() => {
							deleteTaskAsync(item);
						}}
					/>

					{item.completed ? (
						<CheckSquare
							size={18}
							className='absolute  bottom-12 right-2'
							color='green'
							onClick={() => {
								mutateAsync(item);
							}}
						/>
					) : (
						<Squircle
							className='absolute  bottom-12 right-2'
							size={18}
							color='green'
							onClick={() => {
								mutateAsync(item);
							}}
						/>
					)}
				</motion.li>
			))}
		</ul>
	);
};

export default ItemList;
