export default function Body({ children }) {
    return <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-90 bg-opacity-60 grid grid-cols-9 shadow sm:rounded-b-lg h-full">
        {children}
    </div>
}