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
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

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
  const location = useLocation();
  const currentSearchParams = location.search;

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
      <header className="flex flex-row w-full gap-3 px-6 py-2 h-14">
        {location.pathname !== "/" && location.pathname !== "/docs" ? (
          <>
            <div className="flex-row hidden w-fit h-fit sm:flex">
              <h2 className="my-auto mr-6 text-2xl font-bold">
                <a href="/">Sitetrace</a>
              </h2>
              <div className="mr-2 min-w-36 w-fit">
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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <a href={`/overview${currentSearchParams}`}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Overview
                      </NavigationMenuLink>
                    </a>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a href={`/sessions${currentSearchParams}`}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Sessions
                      </NavigationMenuLink>
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <span className="hidden grow sm:block"></span>
            </div>
            <div className="flex flex-row w-full h-10 sm:hidden">
              <div className="w-12">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-start h-full cursor-pointer aspect-square">
                      <Menu className="w-7 h-7" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="px-2 py-3 w-dvw">
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
                                  (project: any) =>
                                    project.url === selectedProject
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
                              <p className="text-red-500">
                                Error loading projects
                              </p>
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
                    <DropdownMenuSeparator className="mt-4" />
                    <DropdownMenuLabel className="mb-2">
                      Pages
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <a href={`/${currentSearchParams}`}>Overview</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <a href={`/sessions${currentSearchParams}`}>Sessions</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h2 className="my-auto text-2xl font-bold">
                <a href="/">Sitetrace</a>
              </h2>
              <div className="grow"></div>
            </div>
          </>
        ) : (
          <>
            <h2 className="my-auto text-2xl font-bold">
              <a href="/">Sitetrace</a>
            </h2>
            <div className="grow"></div>
            <div className="flex flex-row">
              <Button
                variant="link"
                className="hidden p-0 my-auto mr-4 h-fit sm:block"
                asChild
              >
                <a href="/docs">Documentation</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/overview">Live Demo</a>
              </Button>
            </div>
          </>
        )}
      </header>
      <Separator />
      <div className="flex flex-col items-center justify-start w-full grow">
        {children}
      </div>
      <Separator />
      <footer className="w-full h-48">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="flex flex-col items-center w-fit h-fit">
            <h2 className="text-xl font-bold text-gray-500">Sitetrace v0.5</h2>
            <div className="flex flex-row gap-4 w-fit">
              <a
                href="/docs"
                className="text-base font-semibold text-gray-500 underline"
              >
                Documentation
              </a>
            </div>
          </div>
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
