import Hero from "@/assets/images/sitetrace-hero.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Radio, Puzzle, GitPullRequestArrow, Terminal } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-fit">
      <div className="relative w-full h-fit">
        <img src={Hero} alt="Hero" className="object-cover w-full opacity-40" />
        <div className="absolute flex flex-col gap-2 transform -translate-y-1/2 -translate-x-1/4 top-1/2 left-1/4 md:top-1/3 md:-translate-y-1/2">
          <h1 className="text-4xl font-semibold text-white">
            Welcome to Sitetrace
          </h1>
          <p className="text-muted-foreground">
            An opensource session-based tracking service made with React and
            Appwrite
          </p>
        </div>
      </div>
      <section id="features" className="mx-4 my-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-center">Features</h2>
          <p className="text-center text-muted-foreground">
            Some of the features of Sitetrace
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-4 h-fit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Live tracking</CardTitle>
              <CardDescription>
                <Radio className="w-5 h-5" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All sessions is tracked live and can be viewed in real-time from
                the dashboard
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Easy to implement</CardTitle>
              <CardDescription>
                <Puzzle className="w-5 h-5" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sitetrace is easy to implement with only a few lines of code to
                your project/website
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Opensource</CardTitle>
              <CardDescription>
                <GitPullRequestArrow className="w-5 h-5" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sitetrace is opensource and free to use. You can contribute to
                the project on{" "}
                <a
                  href="https://github.com/SigveDev/SiteTrace"
                  className="underline"
                >
                  Github
                </a>
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">New technology</CardTitle>
              <CardDescription>
                <Terminal className="w-5 h-5" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sitetrace is built with Appwrite, a new opensource backend
                service. Learn more about Appwrite{" "}
                <a href="https://appwrite.io" className="underline">
                  here
                </a>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      <h2 className="mx-auto my-12 text-lg text-destructive">
        Landing page is work in progress...
      </h2>
    </div>
  );
};

export default Home;
