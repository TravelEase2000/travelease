import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { format } from 'date-fns';

interface DigitalTicketProps {
  ticketId: string;
  bookingDetails: {
    from: string;
    to: string;
    date: Date;
    trainNumber: string;
    seatNumber: string;
    passengerName: string;
    class: string;
  };
  isStudent: boolean;
}

export function DigitalTicket({ ticketId, bookingDetails, isStudent }: DigitalTicketProps) {
  const ticketData = JSON.stringify({
    id: ticketId,
    ...bookingDetails,
  });

  return (
    <Card className="p-6 max-w-md mx-auto hover-card glass">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Train Ticket</h3>
            <p className="text-sm text-muted-foreground">
              {format(bookingDetails.date, 'PPP')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icons.train className="h-6 w-6 text-primary" />
            {isStudent && <span className="text-primary text-sm font-medium">Student</span>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">{bookingDetails.from}</p>
            </div>
            <Icons.arrowRight className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium">{bookingDetails.to}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Train Number</p>
              <p className="font-medium">{bookingDetails.trainNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seat</p>
              <p className="font-medium">{bookingDetails.seatNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Passenger</p>
              <p className="font-medium">{bookingDetails.passengerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-medium">{bookingDetails.class}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG
              value={ticketData}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Ticket ID: {ticketId}</p>
          <p className="mt-1">Scan QR code for verification</p>
        </div>
      </div>
    </Card>
  );
} 