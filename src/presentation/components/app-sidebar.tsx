import * as React from "react";
import {
  Book,
  BookOpen,
  Briefcase,
  GalleryVerticalEnd,
  Settings2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/presentation/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    avatar: "",
  });

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.name) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
        avatar: storedUser.profil || "",
      });
    }
  }, []);

  const data = {
    user: userData,
    teams: [
      {
        name: "Millearnia",
        logo: GalleryVerticalEnd,
        plan: "web app",
      },
    ],
    navMain: [
      {
        title: "Orientations",
        url: "#",
        icon: Briefcase,
        isActive: true,
        items: [
          {
            title: "Professions",
            url: "/professions",
          },
          {
            title: "Video",
            url: "/videos",
          },
          {
            title: "Comments",
            url: "/comments",
          },
          {
            title: "Categories",
            url: "/categories",
          },
        ],
      },
      {
        title: "Courses",
        url: "#",
        icon: Book,
        items: [
          {
            title: "List",
            url: "/courses",
          },
          {
            title: "Categories",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Users",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "List",
            url: "/users",
          },
          {
            title: "More",
            url: "#",
          },
          // {
          //   title: "General",
          //   url: "#",
          // },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
