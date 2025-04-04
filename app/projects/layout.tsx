import type { ReactNode } from "react";

import { source } from "@/lib/source";

import { baseOptions } from "@/app/layout.config";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout tree={source.pageTree} {...baseOptions}>
			{children}
		</DocsLayout>
	);
}
