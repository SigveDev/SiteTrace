import { AnalyticsOverTime } from "../types/totalAnalytics";

interface ChartdataType {
  day: string;
  views: number;
}

interface ChartdataTypeWithDate extends ChartdataType {
  date: Date;
}

function FormatDataToViews(
  data: AnalyticsOverTime[],
  startDate: Date,
  endDate: Date
): ChartdataType[] {
  const formattedData = data.reduce(
    (acc: ChartdataTypeWithDate[], item: AnalyticsOverTime) => {
      const day = formatDate(item.datetime); // Format the date (DD-MM-YYYY)
      const existingEntry = acc.find((entry) => entry.day === day);

      if (existingEntry) {
        existingEntry.views += item.views;
      } else {
        acc.push({
          date: new Date(item.datetime),
          day: day,
          views: item.views,
        });
      }

      return acc;
    },
    []
  );

  const allDates = fillMissingDates(formattedData, startDate, endDate);

  const newFormattedData: ChartdataType[] = allDates.map((item) => {
    const { day, views } = item;
    return { day, views };
  });

  return newFormattedData;
}

function formatDate(date: string | Date): string {
  const parts =
    typeof date === "string"
      ? date.split("T")[0].split("-")
      : date.toISOString().split("T")[0].split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  return `${day}-${month}-${year}`;
}

function fillMissingDates(
  data: ChartdataTypeWithDate[],
  startDate: Date,
  endDate: Date
): ChartdataTypeWithDate[] {
  const result: ChartdataTypeWithDate[] = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const formattedDate = formatDate(currentDate);
    const existingEntry = data.find((item) => item.day === formattedDate);

    if (existingEntry) {
      result.push(existingEntry);
    } else {
      result.push({
        date: new Date(currentDate),
        day: formattedDate,
        views: 0,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

export default FormatDataToViews;
