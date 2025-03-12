import ThemeToggle from './toggle-theme';

export function Navbar() {
  return (
    <>
      {/* Modern browser header */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 p-3 flex items-center space-x-3 text-white shadow-md' />

      {/* App header */}
      <div className='bg-white/80 backdrop-blur-md border-b border-indigo-100 py-3 px-6 flex justify-between items-center dark:bg-gray-800'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-purple-300'>
          Compare Rick and Morty Characters
        </h1>

        <div className='flex space-x-2'>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
