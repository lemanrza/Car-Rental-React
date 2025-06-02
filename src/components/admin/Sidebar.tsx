import { Home, Calendar, Users, LogOut,  MessageSquare, Car } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const items = [
  {
    title: "DashBoard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Cars",
    url: "/admin/cars",
    icon: Car,
  },
  {
    title: "Rentals",
    url: "/admin/rentals",
    icon: Calendar,
  },
  {
    title: "Contacts",
    url: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
]
const logOut = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
}

export function AppSidebar() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl mb-3 text-[#1C398E] font-bold">RentGo Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="absolute ml-1 bottom-5">
          <Separator />
          <div className="flex mt-3 items-center gap-3">
            <Avatar className="w-13 h-12">
              <AvatarImage />
              <AvatarFallback>{user?.username.split("")[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex w-35 flex-col">
              <h4 className="text-lg font-semibold">@{user?.username}</h4>
              <p className="text-sm">{user?.email}</p>
            </div>
            <LogOut onClick={logOut} className="cursor-pointer hover:bg-gray-200 transition" size={20} />
          </div>
        </div>

      </SidebarContent>
    </Sidebar>
  )
}
