import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ReferrerChart = () => {
  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">Top Referrers</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">google.com</p>
            <span className="text-sm font-bold">+367</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">yahoo.com</p>
            <span className="text-sm font-bold">+234</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">sigve.dev</p>
            <span className="text-sm font-bold">+123</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">bing.com</p>
            <span className="text-sm font-bold">+2</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferrerChart;
