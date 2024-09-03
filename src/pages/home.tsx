import Hero from "@/assets/images/sitetrace-hero.jpg";
import CodeBlock from "@/components/custom/code-block";
import { Button } from "@/components/ui/button";
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
          <Button className="mt-4 w-fit" asChild>
            <a href="/docs">Get started</a>
          </Button>
        </div>
      </div>
      <section
        id="features"
        className="flex flex-col justify-center mx-4 my-8 min-h-96"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-center">Features</h2>
          <p className="text-center text-muted-foreground">
            Some of the benefits of using Sitetrace
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
      <section
        id="get-started"
        className="flex flex-col justify-center mx-4 my-8 min-h-96"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-center text-primary">
            Get started
          </h2>
          <p className="w-4/5 text-center text-muted-foreground">
            Using Sitetrace requires you to set up an Appwrite project,
            downloading the source files and configuring the databases in
            Appwrite
          </p>
          <Button className="mt-4" asChild>
            <a href="/docs">Get started with Sitetrace</a>
          </Button>
        </div>
      </section>
      <section id="about" className="mx-4 my-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-center">About</h2>
          <p className="text-center text-muted-foreground">
            Learn more about Sitetrace
          </p>
        </div>
        <div className="flex flex-col w-4/5 gap-3 mx-auto mt-4 text-center h-fit">
          <p>
            Sitetrace is an opensource session-based tracking service made with
            React and Appwrite. The project is made to be easy to implement and
            use, and is free to use and contribute to.
          </p>
          <p>
            Sitetrace is built with Appwrite, a new opensource backend service.
            Appwrite is a self-hosted solution that provides features like
            authentication, database, storage, and more.
          </p>
          <p>
            Sitetrace has 3 main components, the frontend, a custom API and the
            Appwrite backend. The frontend is built with React and Typescript,
            the API is built with Express and Node.js.
          </p>
          <p>
            The React frontend is buildt on Vite and uses many modern libraries
            like Tanstack Query, Tanstack Tabe, Lucide Icons, Shadcn/ui and
            TailwindCSS.
          </p>
          <p>
            The API is built with Express and Node.js and uses the Appwrite SDK
            to interact with the Appwrite backend. The demo/example frontend and
            API is hosted on Vercel and uses Appwrite Cloud.
          </p>
        </div>
      </section>
      <section
        id="learn-how"
        className="flex flex-col justify-center mx-4 my-8 min-h-96"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-semibold text-center">Learn how</h2>
          <p className="text-center text-muted-foreground">
            Learn how to implement Sitetrace
          </p>
        </div>
        <div className="flex flex-col w-4/5 mx-auto mt-4 text-center h-fit">
          <p>
            To implement Sitetrace in your project, you need to add the tracking
            script to your project. The script will be easily available from the
            dashboard when you create a new project.
          </p>
          <br />
          <h3 className="mb-0 text-xl font-semibold">Example html file:</h3>
          <CodeBlock
            code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <script src="https://sitetrace.dev/analytics/script.js"></script>
</head>
<body>
    <!-- Your website content here -->

    <div id="confirmation-container"></div>
    <!-- Placeholder for dynamic HTML content -->

    <script>
      // Function to load HTML content
      function loadHTML() {
        fetch("https://sitetrace.dev/analytics/index.html")
          .then((response) => response.text())
          .then((html) => {
            document.getElementById("confirmation-container").innerHTML = html;
          })
          .catch((error) => {
            console.error("Error loading HTML:", error);
          });
      }

      // Function to load CSS dynamically
      function loadCSS() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://sitetrace.dev/analytics/style.css";
        document.head.appendChild(link);
      }

      // Call functions to load HTML and CSS
      loadHTML();
      loadCSS();
    </script>
</body>
</html>`}
            language="html"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
