import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col justify-center items-center text-center p-8">
			<header className="mb-8">
				<h1 className="text-4xl font-extrabold text-blue-700">Documentation Hub</h1>
				<p className="text-xl text-gray-600 mt-2">Your one-stop resource for a variety of technology topics.</p>
			</header>
			<section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
				<article className="p-4 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold text-blue-600">Apple Development</h2>
					<p className="text-gray-700 mt-2">Explore guides on iOS, macOS, Swift, and SwiftUI.</p>
				</article>
				<article className="p-4 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold text-blue-600">C# Development</h2>
					<p className="text-gray-700 mt-2">
						From basics to advanced concepts, master C# with our comprehensive resources.
					</p>
				</article>
				<article className="p-4 shadow-md rounded-lg">
					<h2 className="text-2xl font-bold text-blue-600">Docker</h2>
					<p className="text-gray-700 mt-2">
						Learn the most common usage patterns and best practices for containerization.
					</p>
				</article>
			</section>
			<footer>
				<p className="text-lg text-gray-800">
					Visit our{" "}
					<Link href="/docs" className="text-blue-500 font-semibold underline hover:text-blue-700">
						/docs
					</Link>{" "}
					section for full documentation.
				</p>
			</footer>
		</main>
	);
}
