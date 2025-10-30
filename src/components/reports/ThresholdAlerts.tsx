import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingDown, UserX, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
}

interface ThresholdAlertsProps {
  alerts: Alert[];
}

export const ThresholdAlerts = ({ alerts }: ThresholdAlertsProps) => {
  if (alerts.length === 0) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Threshold Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No active alerts. All metrics within threshold.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Threshold Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Alert
              key={alert.id}
              className={`${
                alert.type === 'critical'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : alert.type === 'warning'
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                  : 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'critical'
                    ? 'text-red-600'
                    : alert.type === 'warning'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <Badge variant={alert.type === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                      {alert.type.toUpperCase()}
                    </Badge>
                  </div>
                  <AlertDescription className="text-xs">
                    {alert.description}
                  </AlertDescription>
                  <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
};

// Generate threshold alerts based on data
export const generateThresholdAlerts = (
  performance: any[],
  leads: any[],
  systemUsage: any[]
): Alert[] => {
  const alerts: Alert[] = [];

  // Check conversion rate drops
  const convertedCount = leads.filter(l => l.stage === 'Converted').length;
  const conversionRate = leads.length > 0 ? (convertedCount / leads.length) * 100 : 0;
  
  if (conversionRate < 15) {
    alerts.push({
      id: 'conv-1',
      type: 'critical',
      title: 'Conversion Rate Drop > 20%',
      description: `Current conversion rate is ${conversionRate.toFixed(1)}%, below the 20% threshold. Immediate action required.`,
      timestamp: 'Detected 2 hours ago',
      icon: TrendingDown
    });
  }

  // Check for inactive RMs
  const inactiveRMs = systemUsage.filter(u => {
    const lastActive = new Date(u.lastActive);
    const daysSince = Math.floor((Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince >= 3;
  });

  if (inactiveRMs.length > 0) {
    alerts.push({
      id: 'inactive-1',
      type: 'warning',
      title: `${inactiveRMs.length} Inactive RM(s) for 3+ days`,
      description: `${inactiveRMs.map(rm => rm.rm).join(', ')} have not logged in for 3+ days. Follow up required.`,
      timestamp: 'Detected 1 hour ago',
      icon: UserX
    });
  }

  // Check low performers
  const lowPerformers = performance.filter(p => p.score < 75);
  
  if (lowPerformers.length > 0) {
    alerts.push({
      id: 'perf-1',
      type: 'warning',
      title: 'Low Performance Alert',
      description: `${lowPerformers.length} RM(s) scoring below 75%. Consider training or support: ${lowPerformers[0].rm}`,
      timestamp: 'Detected 30 minutes ago',
      icon: AlertTriangle
    });
  }

  // Check lead aging
  const agingLeads = leads.filter(l => {
    const created = new Date(l.createdOn);
    const daysSince = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince > 10 && l.stage === 'Follow-up';
  });

  if (agingLeads.length > 0) {
    alerts.push({
      id: 'aging-1',
      type: 'info',
      title: 'Lead Aging Alert',
      description: `${agingLeads.length} leads in follow-up stage for 10+ days. Consider re-engagement campaign.`,
      timestamp: 'Detected 15 minutes ago',
      icon: Clock
    });
  }

  return alerts;
};
