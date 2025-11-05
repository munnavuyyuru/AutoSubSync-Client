import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold">12</div>
          <p className="text-sm text-gray-600">Videos Processed</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold">8</div>
          <p className="text-sm text-gray-600">Languages Supported</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold">2.5h</div>
          <p className="text-sm text-gray-600">Total Processing Time</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
