"use client";

import type React from "react";
import { useState, useEffect } from "react";

import { Search, Send, Command } from "lucide-react";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { motion, AnimatePresence } from "framer-motion";

interface Action {
	id: string;
	label: string;
	icon: React.ReactNode;
	description?: string;
	short?: string;
	end?: string;
}

interface SearchResult {
	actions: Action[];
}

interface ActionSearchBarProps {
	actions?: Action[];
	onFocusChange?: (focused: boolean) => void;
	size?: "default" | "large";
}

function ActionSearchBar({ actions = [], onFocusChange, size = "default" }: ActionSearchBarProps) {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState<SearchResult | null>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [selectedAction, setSelectedAction] = useState<Action | null>(null);
	const debouncedQuery = useDebounce(query, 200);

	useEffect(() => {
		if (!isFocused) {
			setResult(null);
			return;
		}

		if (!debouncedQuery) {
			setResult({ actions });
			return;
		}

		const normalizedQuery = debouncedQuery.toLowerCase().trim();
		const filteredActions = actions.filter((action) => {
			const searchableText = action.label.toLowerCase();
			return searchableText.includes(normalizedQuery);
		});

		setResult({ actions: filteredActions });
	}, [debouncedQuery, isFocused, actions]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setIsTyping(true);
	};

	const container = {
		hidden: { opacity: 0, height: 0 },
		show: {
			opacity: 1,
			height: "auto",
			transition: {
				height: {
					duration: 0.4,
				},
				staggerChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				height: {
					duration: 0.3,
				},
				opacity: {
					duration: 0.2,
				},
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: 0.2,
			},
		},
	};

	// Reset selectedAction when focusing the input
	const handleFocus = () => {
		setSelectedAction(null);
		setIsFocused(true);
		if (onFocusChange) onFocusChange(true);
	};

	const handleBlur = () => {
		setTimeout(() => {
			setIsFocused(false);
			if (onFocusChange) onFocusChange(false);
		}, 200);
	};

	// Determine sizes based on the size prop
	const inputHeight = size === "large" ? "h-14" : "h-9";
	const inputFontSize = size === "large" ? "text-base" : "text-sm";
	const inputPadding = size === "large" ? "px-5 py-3" : "px-3 py-1.5";
	const iconSize = size === "large" ? "h-5 w-5" : "h-4 w-4";
	const labelSize = size === "large" ? "text-sm" : "text-xs";
	const resultWidth = size === "large" ? "max-w-2xl" : "max-w-sm";

	return (
		<div className="mx-auto w-full">
			<div className="relative flex flex-col justify-start items-center">
				{/* Search Bar */}
				<div className={`w-full ${size === "large" ? "max-w-2xl" : "max-w-sm"} sticky top-0 bg-background z-10`}>
					<div className="top-1/2 left-4 absolute -translate-y-1/2">
						<Search className={`${iconSize} text-gray-400 dark:text-gray-500`} />
					</div>

					<Input
						type="text"
						placeholder={size === "large" ? "Search for documentation, guides, or topics..." : "Search..."}
						value={query}
						onChange={handleInputChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className={`${inputHeight} ${inputFontSize} ${inputPadding} pl-12 pr-12 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border-gray-200 dark:border-gray-700 shadow-sm`}
					/>

					<div className="top-1/2 right-4 absolute -translate-y-1/2">
						<AnimatePresence mode="popLayout">
							{query.length > 0 ? (
								<motion.div
									key="send"
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 20, opacity: 0 }}
									transition={{ duration: 0.2 }}>
									<Send className={`${iconSize} text-blue-500`} />
								</motion.div>
							) : (
								<motion.div
									key="command"
									initial={{ y: -20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 20, opacity: 0 }}
									transition={{ duration: 0.2 }}>
									<Command className={`${iconSize} text-gray-400 dark:text-gray-500`} />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				<div className={`w-full ${resultWidth}`}>
					<AnimatePresence>
						{isFocused && result && !selectedAction && (
							<motion.div
								className="bg-white dark:bg-gray-800 shadow-md mt-2 border dark:border-gray-700 rounded-lg w-full overflow-hidden"
								variants={container}
								initial="hidden"
								animate="show"
								exit="exit">
								<motion.ul className="py-2">
									{result.actions.map((action) => (
										<motion.li
											key={action.id}
											className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 cursor-pointer"
											variants={item}
											layout
											onClick={() => setSelectedAction(action)}>
											<div className="flex items-center gap-x-4">
												<div className="flex-shrink-0">{action.icon}</div>
												<div>
													<span
														className={`${
															size === "large" ? "text-base" : "text-sm"
														} font-medium flex items-start justify-start`}>
														{action.label}
													</span>
													{action.description && (
														<p className="flex justify-start items-start mt-0.5 text-gray-500 dark:text-gray-400 text-xs">
															{action.description}
														</p>
													)}
												</div>
											</div>
											<div className="flex items-center gap-3">
												{action.short && (
													<span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400 text-xs">
														{action.short}
													</span>
												)}
												{action.end && (
													<span
														className={`text-xs px-2 py-1 rounded ${
															action.end === "Section"
																? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
																: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
														}`}>
														{action.end}
													</span>
												)}
											</div>
										</motion.li>
									))}
								</motion.ul>
								<div className="bg-gray-50 dark:bg-gray-800/80 px-4 py-3 border-gray-200 dark:border-gray-700 border-t">
									<div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs">
										<span>
											Press <kbd className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">⌘K</kbd> to open commands
										</span>
										<span>
											Press <kbd className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">ESC</kbd> to cancel
										</span>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default ActionSearchBar;
