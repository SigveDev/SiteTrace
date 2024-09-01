import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CodeBlock from "@/components/custom/code-block";

const Documentation = () => {
  return (
    <div className="w-[95%] h-fit grow mt-8 flex flex-col">
      <div className="flex items-center justify-between w-full h-fit">
        <h1 className="text-4xl font-semibold">Documentation</h1>
      </div>
      <div className="grid w-full h-full grid-cols-5 gap-2 my-4 grow">
        <div className="col-span-1 h-fit">
          <ScrollArea className="h-fit">
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-base font-semibold">Getting Started</p>
              <a
                href="#introduction"
                className="hover:underline text-muted-foreground"
              >
                Introduction
              </a>
              <a
                href="#how-to"
                className="hover:underline text-muted-foreground"
              >
                How to
              </a>
              <a
                href="#examples"
                className="hover:underline text-muted-foreground"
              >
                Examples
              </a>
              <a href="#faq" className="hover:underline text-muted-foreground">
                FAQ
              </a>
            </div>
          </ScrollArea>
        </div>
        <div className="w-full h-full col-span-4">
          <div className="flex flex-col gap-4">
            <section id="introduction">
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>Sitetrace is a tool for tracking user sessions on websites.</p>
              <p>
                It uses Appwrite for backend and data storage. Scripts are
                hosted on the same server as the frontend and can be found by
                visiting the /analytics route in the url.
              </p>
              <br />
              <p>
                The scripts are written in vanilla JavaScript and are
                responsible for tracking user sessions and sending the data to a
                custom api. User consent is required before sending any
                session-specific data to the api. That is the reason for the
                consent popup and limited data on some sessions.
              </p>
              <br />
              <h3 className="text-lg font-semibold">Scripts:</h3>
              <ul className="list-disc list-inside">
                <li>
                  <a href="/analytics/index.html">/analytics/index.html</a>
                  <p className="ml-8 text-muted-foreground">
                    This is the file for showing the consent popup
                  </p>
                </li>
                <li>
                  <a href="/analytics/script.js">/analytics/script.js</a>
                  <p className="ml-8 text-muted-foreground">
                    This is the file for tracking user sessions and sending it
                    to a custom api
                  </p>
                </li>
                <li>
                  <a href="/analytics/style.css">/analytics/style.css</a>
                  <p className="ml-8 text-muted-foreground">
                    This is the file for styling the consent popup
                  </p>
                </li>
              </ul>
            </section>
            <section id="how-to">
              <h2 className="text-2xl font-semibold">How to</h2>
              <p>
                While Sitetrace is not available for public use, you can create
                your own version by following these steps:
              </p>
              <br />
              <ol className="flex flex-col gap-3 ml-5 list-decimal list-outside">
                <li>
                  Clone the repository from{" "}
                  <a
                    href="https://github.com/SigveDev/SiteTrace"
                    className="underline text-primary"
                  >
                    GitHub Sitetrace
                  </a>
                </li>
                <li>
                  Clone the repository from{" "}
                  <a
                    href="https://github.com/SigveDev/SiteTrace-api"
                    className="underline text-primary"
                  >
                    GitHub SiteTrace-API
                  </a>
                </li>
                <li>
                  Create a new project on{" "}
                  <a
                    href="https://appwrite.io"
                    className="underline text-primary"
                  >
                    Appwrite
                  </a>
                </li>
                <li>
                  Create a new database in the project with the name of your
                  choice. I named mine "Sitetrace".
                </li>
                <li>
                  Create a new collection in the project with the following
                  fields:
                  <br />
                  <br />
                  <h5 className="text-lg font-semibold">
                    "Analytics" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "url": "String",
    "referrer": "String",
    "sessionId": "String",
    "timestamp": "Datetime",
    "userAgent": "String",
    "visitDuration": "Integer"
    "device": "String",
    "clicks": "Integer",
    "scrollDepth": "Integer",
    "screenResolution": "String",
    "viewportSize": "String",
    "loadTime": "Double",
    "focus": "Boolean",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "Browser" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "name": "String",
    "version": "String",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "Network" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "effectiveType": "String",
    "downlink": "Integer",
    "rtt": "Integer",
}`}
                    language="json"
                  />
                </li>
                <li>
                  Connect the collections with the following relationships:
                  <br />
                  <ul className="ml-5 list-disc list-outside">
                    <li>Analytics -{">"} Browser (two-way, one to one)</li>
                    <li>Analytics -{">"} Network (two-way, one to one)</li>
                  </ul>
                </li>
                <li>
                  Create a new database in the project with the name of your
                  choice. I named mine "Sitetrace-Admin".
                </li>
                <li>
                  Create a new collection in the project with the following
                  fields:
                  <br />
                  <br />
                  <h5 className="text-lg font-semibold">
                    "registeredUrls" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "url": "String",
    "owner": "String",
    "name": "String",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "totalAnalytics" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "url": "String",
    "views": "Integer",
    "interactions": "Integer",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "topBrowser" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "name": "String",
    "amount": "Integer",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "topReferrer" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "name": "String",
    "amount": "Integer",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "topDevice" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "name": "String",
    "amount": "Integer",
}`}
                    language="json"
                  />
                  <h5 className="text-lg font-semibold">
                    "analyticsOverTime" collection:
                  </h5>
                  <CodeBlock
                    code={`{
    "datetime": "Datetime",
    "views": "Integer",
    "interactions": "Integer",
}`}
                    language="json"
                  />
                </li>
                <li>
                  Connect the collections with the following relationships:
                  <br />
                  <ul className="ml-5 list-disc list-outside">
                    <li>
                      totalAnalytics -{">"} registeredUrls (two-way, one to
                      many)
                    </li>
                    <li>
                      topBrowser -{">"} registeredUrls (two-way, one to many)
                    </li>
                    <li>
                      topReferrer -{">"} registeredUrls (two-way, one to many)
                    </li>
                    <li>
                      topDevice -{">"} registeredUrls (two-way, one to many)
                    </li>
                    <li>
                      analyticsOverTime -{">"} registeredUrls (two-way, one to
                      many)
                    </li>
                  </ul>
                </li>
                <li>
                  Create a new API key in the project with the following
                  permissions:
                  <ul className="ml-5 list-disc list-outside">
                    <li>database: read</li>
                    <li>database: write</li>
                    <li>collections: read</li>
                    <li>collections: write</li>
                    <li>attributes: read</li>
                    <li>attributes: write</li>
                    <li>indexes: read</li>
                    <li>indexes: write</li>
                    <li>documents: read</li>
                    <li>documents: write</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    The API-key doesn't need all these permissions, but I just
                    selected to give it all permissions to the Database
                  </p>
                </li>
                <li>
                  Host your own version of the API and provide the API key as an
                  environment variable named API_KEY.
                  <br />
                  You will also need to provide the Appwrite project id and
                  endpoint as environment variables.
                  <br />
                  <h5 className="text-lg font-semibold">
                    Environment variables:
                  </h5>
                  <ul className="ml-5 list-disc list-outside">
                    <li>
                      API_KEY{" "}
                      <span className="text-muted-foreground">
                        (The Appwrite API key you created earlier)
                      </span>
                    </li>
                    <li>
                      PROJECT_ID{" "}
                      <span className="text-muted-foreground">
                        (The Appwrite project id)
                      </span>
                    </li>
                    <li>
                      ENDPOINT{" "}
                      <span className="text-muted-foreground">
                        (The Appwrite endpoint url)
                      </span>
                    </li>
                    <li>
                      PORT{" "}
                      <span className="text-muted-foreground">
                        (The port for the api)
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  Host your own version of the frontend and include the Appwrite
                  project id, endpoint and collections ids as environment
                  variables.
                  <br />
                  <h5 className="text-lg font-semibold">
                    Environment variables:
                  </h5>
                  <ul className="ml-5 list-disc list-outside">
                    <li>
                      ANALYTICSOVERTIME_COLLECTION_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the analyticsOverTime collection)
                      </span>
                    </li>
                    <li>
                      APPWRITE_TOTAL_COLLECTION_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the totalAnalytics collection)
                      </span>
                    </li>
                    <li>
                      APPWRITE_ANALYTICS_COLLECTION_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the analytics collection)
                      </span>
                    </li>
                    <li>
                      APPWRITE_DEFAULT_DB_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the "Sitetrace" database)
                      </span>
                    </li>
                    <li>
                      APPWRITE_REGURL_COLLECTION_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the registeredUrls collection)
                      </span>
                    </li>
                    <li>
                      APPWRITE_ADMIN_DB_ID{" "}
                      <span className="text-muted-foreground">
                        (The id for the "Sitetrace" database)
                      </span>
                    </li>
                    <li>
                      APPWRITE_PROJECT_ID{" "}
                      <span className="text-muted-foreground">
                        (The project id for the Appwrite project)
                      </span>
                    </li>
                    <li>
                      APPWRITE_ENDPOINT{" "}
                      <span className="text-muted-foreground">
                        (The endpoint url for the Appwrite project)
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    The frontend is built with Vite and typescript and therefore
                    all the environment variables are prefixed with VITE_
                  </p>
                </li>
              </ol>
            </section>
            <section id="examples">
              <h2 className="text-2xl font-semibold">Examples</h2>
              <p>
                The following are example of how to use the files and scripts
                found in the /analytics folder on a website you want to track.
              </p>
              <br />
              <h3 className="text-lg font-semibold">index.html</h3>
              <CodeBlock
                code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <script src="https://sitetrace.sigve.dev/analytics/script.js"></script>
</head>
<body>
    <!-- Your website content here -->

    <div id="confirmation-container"></div>
    <!-- Placeholder for dynamic HTML content -->

    <script>
      // Function to load HTML content
      function loadHTML() {
        fetch("https://sitetrace.sigve.dev/analytics/index.html")
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
        link.href = "https://sitetrace.sigve.dev/analytics/style.css";
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
              An example pf ho this code is used on a website can be found{" "}
              <a
                href="https://github.com/SigveDev/teams-ai/blob/main/index.html"
                className="underline text-primary"
              >
                here
              </a>
            </section>
            <section id="faq">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              <Accordion type="multiple">
                <AccordionItem value="what-is-sitetrace">
                  <AccordionTrigger>What is Sitetrace?</AccordionTrigger>
                  <AccordionContent>
                    Sitetrace is a tool for tracking user sessions on websites.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use-sitetrace">
                  <AccordionTrigger>How to use Sitetrace?</AccordionTrigger>
                  <AccordionContent>
                    Sitetrace is not available for public use, but you can
                    create your own version by following the steps in the "How
                    to" section.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="is-sitetrace-free">
                  <AccordionTrigger>Is Sitetrace free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, Sitetrace is free to use as the code is opensource and
                    free to download from github.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
