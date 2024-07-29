import { Analytics } from "../types/analytics";

function FormatDataToViews(dataObjects: Analytics[]) {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  const viewsByDay: { [key: string]: number } = {};

  dataObjects.forEach((obj) => {
    const date = new Date(obj.timestamp);
    const formattedDate = formatDate(date);

    if (viewsByDay[formattedDate]) {
      viewsByDay[formattedDate]++;
    } else {
      viewsByDay[formattedDate] = 1;
    }
  });

  const chartData = Object.keys(viewsByDay).map((day) => ({
    day: day,
    views: viewsByDay[day],
  }));

  return chartData;
}

export default FormatDataToViews;
