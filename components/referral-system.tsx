import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';

interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  rewardsEarned: number;
}

export function ReferralSystem() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralCode] = useState('TRAVEL' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [stats] = useState<ReferralStats>({
    totalReferrals: 5,
    successfulReferrals: 3,
    pendingReferrals: 2,
    rewardsEarned: 300,
  });

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral Code Copied!",
      description: "Share this code with your friends to earn rewards.",
    });
  };

  const shareReferralCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join TravelEase',
          text: `Use my referral code ${referralCode} to get a discount on your first booking!`,
          url: window.location.origin,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyReferralCode();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Refer & Earn</h3>
              <p className="text-sm text-muted-foreground">
                Share TravelEase with friends and earn rewards
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="font-mono text-center"
            />
            <Button onClick={copyReferralCode} variant="outline">
              <Icons.copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={shareReferralCode}>
              <Icons.share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Referrals</p>
            <h4 className="text-2xl font-bold mt-1">{stats.totalReferrals}</h4>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Successful</p>
            <h4 className="text-2xl font-bold mt-1 text-green-600">
              {stats.successfulReferrals}
            </h4>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <h4 className="text-2xl font-bold mt-1 text-yellow-600">
              {stats.pendingReferrals}
            </h4>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Rewards Earned</p>
            <h4 className="text-2xl font-bold mt-1 text-primary">
              ₹{stats.rewardsEarned}
            </h4>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">How it Works</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium">Share Your Code</h4>
              <p className="text-sm text-muted-foreground">
                Share your unique referral code with friends and family
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium">Friends Sign Up</h4>
              <p className="text-sm text-muted-foreground">
                They sign up using your referral code
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium">Both Get Rewards</h4>
              <p className="text-sm text-muted-foreground">
                You get ₹100 and they get ₹100 off their first booking
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 