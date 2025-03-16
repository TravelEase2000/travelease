import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserBookings } from '@/lib/firebase';
import { format } from 'date-fns';

interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  amount: number;
  status: string;
}

export function UserProfile() {
  const { user, isStudent } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      if (user) {
        const result = await getUserBookings(user.uid);
        if (result.success) {
          setBookings(result.bookings);
        }
        setLoading(false);
      }
    }
    fetchBookings();
  }, [user]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icons.user className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.displayName || 'User'}</h2>
            <p className="text-sm text-muted-foreground">
              {user?.email}
              {isStudent && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  Student
                </span>
              )}
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Booking History</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-lg skeleton" />
              ))}
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card key={booking.id} className="p-4 hover-card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Icons.train className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {booking.from} → {booking.to}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(booking.date), 'PPP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">₹{booking.amount}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {booking.status}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center text-muted-foreground">
              No bookings found
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Travel Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Preferred Class</span>
                <Button variant="outline" size="sm">
                  AC First Class
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Seat Preference</span>
                <Button variant="outline" size="sm">
                  Window
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Meal Preference</span>
                <Button variant="outline" size="sm">
                  Vegetarian
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icons.billing className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">•••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/24</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full">
                <Icons.add className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 