import * as Avatar from '@radix-ui/react-avatar';

const Header = () => {
	return (
		<header className='w-full flex justify-between text-2xl text-zinc-300 '>
			{' '}
			Minha todo list
			<Avatar.Root className=''>
				<Avatar.Image
					className='w-10 h-10 rounded-full'
					src='https://github.com/diego-af.png'
					alt='Profile'
				/>
				<Avatar.Fallback className='AvatarFallback' delayMs={600}>
					CT
				</Avatar.Fallback>
			</Avatar.Root>
		</header>
	);
};

export {Header};
