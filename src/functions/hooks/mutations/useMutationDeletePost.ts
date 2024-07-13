import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
interface IProps {
	category: string;
	setTasks: React.Dispatch<React.SetStateAction<string>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMutationDeletePost = ({category, setTasks, setOpen}: IProps) => {
	const queryClient = useQueryClient();

	const {mutateAsync} = useMutation({
		mutationFn: (task: string) => {
			return axios.post(import.meta.env.VITE_REACT_API_URL + '/post', {
				title: task,
				categoryId: category
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['list']});
			setTasks('');
			setOpen(false);
		}
	});

	return {mutateAsync};
};

export {useMutationDeletePost};
