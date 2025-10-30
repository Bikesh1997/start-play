import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface DrillDownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  onBack?: () => void;
}

export const DrillDownModal = ({ open, onOpenChange, data, onBack }: DrillDownModalProps) => {
  if (!data) return null;

  const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
      return <Badge variant={value ? "default" : "secondary"}>{value ? 'Yes' : 'No'}</Badge>;
    }
    if (typeof value === 'number' && value > 1000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              {data.title || 'Detailed View'}
            </DialogTitle>
          </div>
        </DialogHeader>

        {data.summary && (
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <p className="text-sm font-medium">{data.summary}</p>
          </div>
        )}

        {data.rows && data.rows.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {data.headers.map((header: string, idx: number) => (
                    <TableHead key={idx}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((row: any, rowIdx: number) => (
                  <TableRow key={rowIdx}>
                    {Object.values(row).map((cell: any, cellIdx: number) => (
                      <TableCell key={cellIdx}>
                        {renderValue(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {data.insights && data.insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Insights</h4>
            {data.insights.map((insight: any, idx: number) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg border ${
                  insight.type === 'positive' 
                    ? 'bg-green-50 border-green-200 dark:bg-green-950/20' 
                    : insight.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20'
                    : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-start gap-2">
                  {insight.type === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                  ) : insight.type === 'warning' ? (
                    <TrendingDown className="w-4 h-4 text-yellow-600 mt-1" />
                  ) : null}
                  <div>
                    <p className="font-medium text-sm">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
