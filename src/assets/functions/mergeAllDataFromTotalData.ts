import { TotalAnalytics } from "../types/totalAnalytics";

function mergeAllDataFromTotalData(data: TotalAnalytics[]): TotalAnalytics {
  const merged: TotalAnalytics = {
    $id: "merged",
    $tenant: "merged",
    $createdAt: "merged",
    $updatedAt: "merged",
    $permissions: [],
    $databaseId: "merged",
    $collectionId: "merged",
    url: "merged",
    views: 0,
    interactions: 0,
    topBrowser: [],
    topReferrer: [],
    topDevice: [],
    analyticsOverTime: [],
  };

  const topBrowserMap: Map<string, number> = new Map();
  const topReferrerMap: Map<string, number> = new Map();
  const topDeviceMap: Map<string, number> = new Map();
  const analyticsOverTimeMap: Map<
    string,
    { views: number; interactions: number }
  > = new Map();

  for (const item of data) {
    merged.views += item.views;
    merged.interactions += item.interactions;

    for (const browser of item.topBrowser) {
      topBrowserMap.set(
        browser.name,
        (topBrowserMap.get(browser.name) || 0) + browser.amount
      );
    }

    for (const referrer of item.topReferrer) {
      topReferrerMap.set(
        referrer.name,
        (topReferrerMap.get(referrer.name) || 0) + referrer.amount
      );
    }

    for (const device of item.topDevice) {
      topDeviceMap.set(
        device.name,
        (topDeviceMap.get(device.name) || 0) + device.amount
      );
    }

    for (const analytics of item.analyticsOverTime) {
      const dateKey = new Date(analytics.datetime).toISOString();
      if (!analyticsOverTimeMap.has(dateKey)) {
        analyticsOverTimeMap.set(dateKey, { views: 0, interactions: 0 });
      }
      const existingData = analyticsOverTimeMap.get(dateKey)!;
      existingData.views += analytics.views;
      existingData.interactions += analytics.interactions;
    }
  }

  merged.topBrowser = Array.from(topBrowserMap.entries()).map(
    ([name, amount]) => ({
      $id: "merged",
      $tenant: "merged",
      $createdAt: "merged",
      $updatedAt: "merged",
      $permissions: [],
      $databaseId: "merged",
      $collectionId: "merged",
      name,
      amount,
    })
  );
  merged.topReferrer = Array.from(topReferrerMap.entries()).map(
    ([name, amount]) => ({
      $id: "merged",
      $tenant: "merged",
      $createdAt: "merged",
      $updatedAt: "merged",
      $permissions: [],
      $databaseId: "merged",
      $collectionId: "merged",
      name,
      amount,
    })
  );
  merged.topDevice = Array.from(topDeviceMap.entries()).map(
    ([name, amount]) => ({
      $id: "merged",
      $tenant: "merged",
      $createdAt: "merged",
      $updatedAt: "merged",
      $permissions: [],
      $databaseId: "merged",
      $collectionId: "merged",
      name,
      amount,
    })
  );
  merged.analyticsOverTime = Array.from(analyticsOverTimeMap.entries()).map(
    ([datetime, { views, interactions }]) => ({
      $id: "merged",
      $tenant: "merged",
      $createdAt: "merged",
      $updatedAt: "merged",
      $permissions: [],
      $databaseId: "merged",
      $collectionId: "merged",
      datetime,
      views,
      interactions,
    })
  );

  return merged;
}

export default mergeAllDataFromTotalData;
