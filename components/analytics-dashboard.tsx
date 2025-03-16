import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const bookingData = [
  { name: 'Jan', bookings: 65 },
  { name: 'Feb', bookings: 85 },
  { name: 'Mar', bookings: 73 },
  { name: 'Apr', bookings: 92 },
  { name: 'May', bookings: 110 },
  { name: 'Jun', bookings: 120 },
];

const userTypeData = [
  { name: 'Students', value: 60 },
  { name: 'Regular', value: 40 },
];

const COLORS = ['#10B981', '#6366F1'];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.user className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">2,543</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.train className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <h3 className="text-2xl font-bold">12,345</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.billing className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">₹8.2L</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Booking Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">User Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {userTypeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Popular Routes</h3>
        <div className="space-y-4">
          {[
            { from: 'Mumbai', to: 'Delhi', count: 1234 },
            { from: 'Bangalore', to: 'Chennai', count: 987 },
            { from: 'Kolkata', to: 'Delhi', count: 876 },
            { from: 'Hyderabad', to: 'Mumbai', count: 765 },
          ].map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="flex items-center justify-between p-3 border rounded-lg hover-card"
            >
              <div className="flex items-center gap-2">
                <Icons.train className="h-4 w-4 text-primary" />
                <span>
                  {route.from} → {route.to}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {route.count} bookings
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 