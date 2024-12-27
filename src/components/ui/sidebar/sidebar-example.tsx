import { SidebarProvider } from "@/components/ui/sidebar/Sidebar";

const SidebarExample = () => {
	return (
		<SidebarProvider>
			<SidebarProvider.Sidebar>
				<h2>sidebar</h2>
			</SidebarProvider.Sidebar>
			<SidebarProvider.Content>
				<h1>content</h1>
			</SidebarProvider.Content>
		</SidebarProvider>
	);
};

export { SidebarExample };
