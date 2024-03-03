import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {List} from './components/list';
import {Header} from './components/Avatar';
import {ButtonTask} from './components/ButtonTodo';
function App() {
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<div className='w-full bg-slate-800'>
				<div className='min-h-screen w-full  max-w-3xl mx-auto  p-4 flex flex-col gap-4 '>
					<Header />
					<ButtonTask />
					<List />
				</div>
			</div>
		</QueryClientProvider>
	);
}

export default App;
