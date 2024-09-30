import {
  HomeIcon,
  ScrollTextIcon,
  UsersIcon,
  WrenchIcon,
  DollarSignIcon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useState } from "react";

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <HomeIcon className="h-6 w-6" />
          <span>HOA Management</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/residents">Residents</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/maintenance">Maintenance</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/financials">Financials</Link>
          </Button>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}

function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 transform border-r bg-muted/40 p-4 transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/announcements">
            <ScrollTextIcon className="mr-2 h-4 w-4" />
            Announcements
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/residents">
            <UsersIcon className="mr-2 h-4 w-4" />
            Residents Directory
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/maintenance-requests">
            <WrenchIcon className="mr-2 h-4 w-4" />
            Maintenance Requests
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/financials">
            <DollarSignIcon className="mr-2 h-4 w-4" />
            Financial Reports
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/events">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Community Events
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/documents">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Documents
          </Link>
        </Button>
      </nav>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="border-t py-4 text-center text-sm text-muted-foreground">
      <p>&copy; 2024 HOA Management System. All rights reserved.</p>
    </footer>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@username" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Layout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={cn(
            "flex-1 p-6 transition-all duration-200 ease-in-out",
            isSidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
