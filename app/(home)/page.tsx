"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Book, Code, Layers, Monitor, Apple, Hash, Container } from "lucide-react";

import { Button } from "@/components/ui/button";
import ActionSearchBar from "@/components/custom/search-bar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Custom actions for your site navigation
	const siteActions = [
		{
			id: "1",
			label: "Apple Development",
			icon: <Apple className="w-5 h-5 text-blue-600" />,
			description: "iOS, macOS, Swift",
			short: "⌘A",
			end: "Section",
		},
		{
			id: "2",
			label: "C# Development",
			icon: <Hash className="w-5 h-5 text-blue-600" />,
			description: "C# concepts & guides",
			short: "⌘C",
			end: "Section",
		},
		{
			id: "3",
			label: "Docker",
			icon: <Container className="w-5 h-5 text-blue-600" />,
			description: "Containerization",
			short: "⌘D",
			end: "Section",
		},
		{
			id: "4",
			label: "Documentation",
			icon: <Book className="w-5 h-5 text-blue-600" />,
			description: "Full documentation",
			short: "⌘F",
			end: "Page",
		},
		{
			id: "5",
			label: "Projects",
			icon: <Code className="w-5 h-5 text-blue-600" />,
			description: "My work",
			short: "",
			end: "Page",
		},
	];

	if (!mounted) return null;

	return (
		<div className="flex flex-col flex-1 mt-4">
			<main className="flex-1">
				{/* Hero Section with Personal Touch */}
				<section className="py-12 md:py-24 lg:py-32 w-full">
					<div className="px-4 md:px-6 container">
						<div className="flex flex-col justify-center items-center space-y-6 text-center">
							<div className="space-y-2">
								<h1 className="font-bold text-blue-700 dark:text-blue-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none tracking-tighter">
									Hub
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
									Welcome to my collection of projects, guides and resources I like.
								</p>
							</div>

							{/* Integrated Search Bar */}
							<div className="mt-6 w-full max-w-2xl">
								<ActionSearchBar actions={siteActions} size="large" />
								<p className="mt-2 text-gray-500 dark:text-gray-400 text-sm text-center">
									Search for topics or press <kbd className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">⌘K</kbd>{" "}
									to explore
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Documentation Categories - Cleaner Version */}
				<section className="bg-white dark:bg-background py-12 md:py-24 w-full">
					<div className="px-4 md:px-6 container">
						<div className="flex flex-col justify-center items-center space-y-4 mb-8 text-center">
							<h2 className="font-bold text-blue-700 dark:text-blue-500 text-2xl tracking-tighter"></h2>
							<p className="max-w-[600px] text-gray-600 dark:text-gray-400">Latest update: 2025-04-04</p>
						</div>
						<div className="gap-6 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-4xl">
							<Card className="hover:shadow-md border-t-4 border-t-blue-600 transition-all">
								<CardHeader>
									<Monitor className="mb-2 w-6 h-6 text-blue-600" />
									<CardTitle className="font-bold text-xl">Apple Development</CardTitle>
									<CardDescription>iOS, macOS, Swift, and SwiftUI guides.</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										Building beautiful, responsive applications for Apple platforms.
									</p>
								</CardContent>
								<CardFooter>
									<Button variant="ghost" size="sm" asChild className="gap-1">
										<Link href="/docs/documentation/apple">
											Explore <ArrowRight className="w-3 h-3" />
										</Link>
									</Button>
								</CardFooter>
							</Card>

							<Card className="hover:shadow-md border-t-4 border-t-blue-600 transition-all">
								<CardHeader>
									<Code className="mb-2 w-6 h-6 text-blue-600" />
									<CardTitle className="font-bold text-xl">C# Development</CardTitle>
									<CardDescription>From basics to advanced C# concepts.</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										.NET development, ASP.NET, Entity Framework, and more.
									</p>
								</CardContent>
								<CardFooter>
									<Button variant="ghost" size="sm" asChild className="gap-1">
										<Link href="/docs/documentation/languages/csharp">
											Explore <ArrowRight className="w-3 h-3" />
										</Link>
									</Button>
								</CardFooter>
							</Card>

							<Card className="hover:shadow-md border-t-4 border-t-blue-600 transition-all">
								<CardHeader>
									<Layers className="mb-2 w-6 h-6 text-blue-600" />
									<CardTitle className="font-bold text-xl">Docker</CardTitle>
									<CardDescription>Containerization patterns and practices.</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										Container orchestration, deployment strategies, and microservices.
									</p>
								</CardContent>
								<CardFooter>
									<Button variant="ghost" size="sm" asChild className="gap-1">
										<Link href="/docs/documentation/tools/docker">
											Explore <ArrowRight className="w-3 h-3" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				</section>
				<div className="flex justify-center items-center gap-2 mt-4">
					<Button asChild>
						<Link href="/docs">
							Browse Documentation
							<ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/projects">View Projects</Link>
					</Button>
				</div>
			</main>

			{/* Footer - Simplified */}
			<footer className="py-6 border-t w-full">
				<div className="flex md:flex-row flex-col justify-between items-center gap-4 md:h-16 container">
					<p className="text-gray-500 text-sm md:text-left text-center leading-loose">
						© {new Date().getFullYear()} DocHub. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<Link href="/docs" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
							Documentation
						</Link>
						<Link href="/projects" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
							Projects
						</Link>
						<Link href="/about" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
							About
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
