import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { getRegisteredUrls } from "@/lib/appwrite";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState(() => {
    const url = new URL(window.location.href);
    return url.searchParams.get("project") || "all";
  });
  const {
    isLoading: projectLoading,
    data: projects,
    isError: projectError,
  } = useQuery({
    queryKey: ["selectedProject"],
    queryFn: () => getRegisteredUrls(),
  });

  useEffect(() => {
    if (!projects) return;

    if (!projects.find((project: any) => project.url === selectedProject)) {
      setSelectedProject("all");

      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.pushState({}, "", url.toString());
      window.dispatchEvent(new Event("popstate"));
    } else {
      const url = new URL(window.location.href);
      url.searchParams.set("project", selectedProject);
      window.history.pushState({}, "", url.toString());
      window.dispatchEvent(new Event("popstate"));
    }
  }, [selectedProject]);

  return (
    <div className="flex flex-col w-full min-h-dvh">
      <header className="flex flex-row w-full gap-3 px-6 py-2 h-fit">
        <div className="min-w-36 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row items-center justify-between w-full"
              >
                {selectedProject === "all"
                  ? "All projects"
                  : projects?.find(
                      (project: any) => project.url === selectedProject
                    )?.name}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-36 w-fit">
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                <DropdownMenuRadioItem value="all">
                  All projects
                </DropdownMenuRadioItem>
                <Separator />
                {projectLoading ? (
                  <Skeleton className="w-full h-8" />
                ) : projectError ? (
                  <p className="text-red-500">Error loading projects</p>
                ) : (
                  projects?.map((project: any) => (
                    <DropdownMenuRadioItem
                      key={project.$id}
                      value={project.url}
                    >
                      {project.name}
                    </DropdownMenuRadioItem>
                  ))
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <a href="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Overview
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/sessions">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sessions
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <span className="grow"></span>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/56192288?v=4"
            alt="Avatar"
          />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </header>
      <Separator />
      <div className="flex flex-col items-center justify-start w-full grow">
        {children}
      </div>
      <Separator />
      <footer className="w-full h-32">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <p className="text-sm text-gray-500">
            Created and maintained by Sigve Tomten / SigveDev
          </p>
          <div className="flex flex-row gap-4 w-fit">
            <a
              href="https://github.com/SigveDev"
              className="text-sm text-gray-500 hover:underline"
            >
              Github
            </a>
            <Separator orientation="vertical" />
            <a
              href="https://www.linkedin.com/in/sigve-tomten-44754424b/"
              className="text-sm text-gray-500 hover:underline"
            >
              LinkedIn
            </a>
            <Separator orientation="vertical" />
            <a
              href="https://sigve.dev"
              className="text-sm text-gray-500 hover:underline"
            >
              Sigve.dev
            </a>
          </div>
          <p className="text-sm font-semibold text-gray-500">
            © 2024, All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
