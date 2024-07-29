import { Client, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(
    import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || "");

const database = new Databases(client);

export const getRegisteredUrls = async () => {
  const response = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
    import.meta.env.VITE_APPWRITE_REGURL_COLLECTION_ID || ""
  );
  return response.documents;
};

export const getDataFromUrl = async (url: string) => {
  if (url !== "") {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
      import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
      [Query.contains("url", [url])]
    );
    return response.documents;
  } else {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
      import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || ""
    );
    return response.documents;
  }
};
