import { useState } from "react";
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState("all");
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <header className="flex flex-row w-full gap-3 px-6 py-2 h-fit">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              All projects
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
              {/*Add more here with map function*/}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
              <a href="/users">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Users
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
            Created and maintained by Sigve Tomten
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
