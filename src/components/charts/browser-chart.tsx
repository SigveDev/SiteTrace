import { Card, CardHeader, CardContent } from "@/components/ui/card";

const BrowserChart = () => {
  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader>
        <h2 className="text-lg font-semibold">Top Browsers</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">Google</p>
            <span className="text-sm font-bold">+432</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">Safari</p>
            <span className="text-sm font-bold">+125</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">Firefox</p>
            <span className="text-sm font-bold">+32</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">Edge</p>
            <span className="text-sm font-bold">+12</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base font-semibold">Arc</p>
            <span className="text-sm font-bold">+8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserChart;
