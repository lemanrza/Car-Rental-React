import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, House } from "lucide-react"
import { useTheme } from "../common/theme-provider"
import { SidebarTrigger } from "../ui/sidebar"
import { Button } from "../ui/button"
import { Link } from "react-router"

const AdminHeader = () => {
    const { setTheme } = useTheme()
    return (
        <>

            <header className="flex justify-between w-full items-center p-4 bg-[#1C398E]">
                <SidebarTrigger className="text-white" />
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to={"/"}>
                        <Button variant={"outline"}>
                            <House />
                            View Site
                        </Button>
                    </Link>
                </div>

            </header>
        </>
    )
}

export default AdminHeader
