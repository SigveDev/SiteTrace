import { AnalyticsOverTime } from "../types/totalAnalytics";

interface ChartdataType {
  day: string;
  views: number;
}

function FormatDataToViews(data: AnalyticsOverTime[]): ChartdataType[] {
  return data.reduce((acc: ChartdataType[], item: AnalyticsOverTime) => {
    const day = formatDate(item.datetime); // Format the date (DD-MM-YYYY)
    const existingEntry = acc.find((entry) => entry.day === day);

    if (existingEntry) {
      existingEntry.views += item.views;
    } else {
      acc.push({
        day: day,
        views: item.views,
      });
    }

    return acc;
  }, []);
}

function formatDate(date: string): string {
  const parts = date.split("T")[0].split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  return `${day}-${month}-${year}`;
}

export default FormatDataToViews;
