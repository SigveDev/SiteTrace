import { Card, CardContent, CardHeader } from "../ui/card";

const LiveUsers = () => {
  return (
    <Card className="col-span-1 row-span-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">Live Users</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_jndsndka</span>
              <p className="text-sm text-slate-600">Last contact: 2min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_asindajs</span>
              <p className="text-sm text-slate-600">Last contact: 4min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_aosoojnda</span>
              <p className="text-sm text-slate-600">Last contact: 5min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_pasasxsx</span>
              <p className="text-sm text-slate-600">Last contact: &gt;5min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_qsuybdaa</span>
              <p className="text-sm text-slate-600">Last contact: &gt;5min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_a8syaxn</span>
              <p className="text-sm text-slate-600">Last contact: &gt;5min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_928sndq</span>
              <p className="text-sm text-slate-600">Last contact: &gt;10min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_8whqdsqs</span>
              <p className="text-sm text-slate-600">Last contact: &gt;20min</p>
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-12">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex flex-col col-span-11 gap-2">
              <span>Session: sess_98shqwqw</span>
              <p className="text-sm text-slate-600">Last contact: &gt;30min</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveUsers;
