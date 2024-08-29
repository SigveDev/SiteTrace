export interface AnalyticsRequest {
  documents: Analytics[];
  total: number;
}

export interface Analytics {
  url: string;
  referrer: string;
  sessionId: string;
  timestamp: string;
  userAgent: string;
  visitDuration: number;
  device: string;
  clicks: number;
  scrollDepth: number;
  screenResolution: string;
  viewportSize: string;
  loadTime: any;
  focus: boolean;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  browser: Browser;
  network: Network;
  $databaseId: string;
  $collectionId: string;
}

export interface Browser {
  name: string;
  version: string;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface Network {
  effectiveType: string;
  downlink: any;
  rtt: any;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
