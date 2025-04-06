
const Banner = () => {
    return (
        <section className="relative flex flex-col items-center justify-center h-screen text-white text-center px-6">
            <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-black dark:text-white">
                    Manage Your Tasks <span className="text-yellow-500">Effortlessly</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl ext-black dark:text-white text-black">
                    Stay on top of your work with our powerful and easy-to-use task management tool.
                    Organize your daily tasks, collaborate with your team, and track progress in real-time.
                    TaskFlow Manager helps you stay productive, efficient, and stress-free!
                </p>

                <div className="mt-6">
                    <button className="px-6 py-3 rounded-full text-lg font-semibold dark:bg-white text-gray-900 shadow-md bg-gray-300 transition duration-300 cursor-pointer">
                        {"`Get Started – It's Free!`"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
