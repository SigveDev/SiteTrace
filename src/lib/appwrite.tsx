import { Client, Databases, Query } from "appwrite";
import { addDays } from "date-fns";

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
      import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
      import.meta.env.VITE_APPWRITE_TOTAL_COLLECTION_ID || "",
      [Query.contains("url", [url])]
    );
    return response.documents;
  } else {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
      import.meta.env.VITE_APPWRITE_TOTAL_COLLECTION_ID || ""
    );
    return response.documents;
  }
};

export const getDataFromUrlAndDate = async (
  url: string,
  startDate: Date,
  endDate: Date
) => {
  const dayAfterEndDate = addDays(endDate, 1);
  if (url !== "") {
    const totalResponse = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
      import.meta.env.VITE_APPWRITE_TOTAL_COLLECTION_ID || "",
      [Query.contains("url", [url])]
    );
    if (totalResponse.documents.length === 0) {
      return [];
    }
    let overTimeDataTotal: any[] = [];
    const overTimeResponse = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
      import.meta.env.VITE_ANALYTICSOVERTIME_COLLECTION_ID || "",
      [
        Query.equal("analytics", [totalResponse.documents[0].$id]),
        Query.greaterThan("datetime", startDate.toDateString()),
        Query.lessThan("datetime", dayAfterEndDate.toDateString()),
      ]
    );
    overTimeDataTotal = overTimeResponse.documents;
    if (overTimeResponse.total > overTimeResponse.documents.length) {
      for (let i = 25; i < overTimeResponse.total; i += 25) {
        const overTimeResponse = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
          import.meta.env.VITE_ANALYTICSOVERTIME_COLLECTION_ID || "",
          [
            Query.equal("analytics", [totalResponse.documents[0].$id]),
            Query.greaterThan("datetime", startDate.toDateString()),
            Query.lessThan("datetime", dayAfterEndDate.toDateString()),
            Query.limit(25),
            Query.offset(i),
          ]
        );
        overTimeDataTotal = overTimeDataTotal.concat(
          overTimeResponse.documents
        );
      }
    }
    return overTimeDataTotal;
  } else {
    let overTimeDataTotal: any[] = [];
    const overTimeResponse = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
      import.meta.env.VITE_ANALYTICSOVERTIME_COLLECTION_ID || "",
      [
        Query.greaterThan("datetime", startDate.toDateString()),
        Query.lessThan("datetime", dayAfterEndDate.toDateString()),
        Query.limit(25),
      ]
    );
    overTimeDataTotal = overTimeResponse.documents;
    if (overTimeResponse.total > overTimeResponse.documents.length) {
      for (let i = 25; i < overTimeResponse.total; i += 25) {
        const overTimeResponse = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_ADMIN_DB_ID || "",
          import.meta.env.VITE_ANALYTICSOVERTIME_COLLECTION_ID || "",
          [
            Query.greaterThan("datetime", startDate.toDateString()),
            Query.lessThan("datetime", dayAfterEndDate.toDateString()),
            Query.limit(25),
            Query.offset(i),
          ]
        );
        overTimeDataTotal = overTimeDataTotal.concat(
          overTimeResponse.documents
        );
      }
    }
    return overTimeDataTotal;
  }
};

export const getLiveAnalyticsDataFromUrl = async (url: string | null) => {
  if (url) {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
      import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
      [
        Query.contains("url", [url]),
        Query.orderDesc("timestamp"),
        Query.limit(16),
      ]
    );
    return response.documents;
  } else {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
      import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
      [Query.orderDesc("timestamp"), Query.limit(16)]
    );
    return response.documents;
  }
};

export const getSessionDataFromId = async (id: string) => {
  const response = await database.getDocument(
    import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
    import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
    id
  );
  return response;
};

export const getSessionsDataWithOptions = async (
  page: number,
  pageSize: number,
  sortId: string,
  sort: "asc" | "desc",
  url: string | null
) => {
  if (sort === "asc") {
    if (url) {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
        import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
        [
          Query.contains("url", [url]),
          Query.limit(pageSize),
          Query.offset(page * pageSize),
          Query.orderAsc(sortId),
        ]
      );
      return response;
    } else {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
        import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
        [
          Query.limit(pageSize),
          Query.offset(page * pageSize),
          Query.orderAsc(sortId),
        ]
      );
      return response;
    }
  } else {
    if (url) {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
        import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
        [
          Query.contains("url", [url]),
          Query.limit(pageSize),
          Query.offset(page * pageSize),
          Query.orderDesc(sortId),
        ]
      );
      return response;
    } else {
      const response = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DEFAULT_DB_ID || "",
        import.meta.env.VITE_APPWRITE_ANALYTICS_COLLECTION_ID || "",
        [
          Query.limit(pageSize),
          Query.offset(page * pageSize),
          Query.orderDesc(sortId),
        ]
      );
      return response;
    }
  }
};
