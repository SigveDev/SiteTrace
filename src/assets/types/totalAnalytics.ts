export interface TotalAnalytics {
  url: string;
  views: number;
  interactions: number;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  topBrowser: TopBrowser[];
  topReferrer: TopReferrer[];
  topDevice: TopDevice[];
  analyticsOverTime: AnalyticsOverTime[];
  $databaseId: string;
  $collectionId: string;
}

export interface TopBrowser {
  name: string;
  amount: number;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface TopReferrer {
  name: string;
  amount: number;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface TopDevice {
  name: string;
  amount: number;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface AnalyticsOverTime {
  datetime: string;
  views: number;
  interactions: number;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
