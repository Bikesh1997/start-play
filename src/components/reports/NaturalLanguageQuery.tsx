import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { leads, sales, rmPerformance, customers } from '@/data/reportsDummyData';
import { toast } from 'sonner';

interface NaturalLanguageQueryProps {
  onQueryResult: (result: any) => void;
}

export const NaturalLanguageQuery = ({ onQueryResult }: NaturalLanguageQueryProps) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processQuery = () => {
    if (!query.trim()) {
      toast.error('Please enter a query');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let result: any = null;

      // Top RMs queries
      if (lowerQuery.includes('top') && lowerQuery.includes('rm')) {
        const limit = parseInt(lowerQuery.match(/\d+/)?.[0] || '5');
        const region = lowerQuery.includes('pune') ? 'West Zone' : null;
        
        let filteredPerf = rmPerformance;
        if (region) {
          filteredPerf = rmPerformance.filter(p => p.region === region);
        }
        
        const topRMs = [...filteredPerf]
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);
        
        result = {
          type: 'performance',
          title: `Top ${limit} RMs${region ? ' in ' + region : ''}`,
          data: topRMs,
          headers: ['RM', 'Branch', 'Target', 'Achieved', 'Score (%)'],
          rows: topRMs.map(rm => ({
            rm: rm.rm,
            branch: rm.branch,
            target: rm.target,
            achieved: rm.achieved,
            score: rm.score + '%'
          }))
        };
      }
      // Sales queries
      else if (lowerQuery.includes('sales') || lowerQuery.includes('revenue')) {
        const product = lowerQuery.includes('gold') ? 'Gold Loan' : 
                       lowerQuery.includes('home') ? 'Home Loan' :
                       lowerQuery.includes('personal') ? 'Personal Loan' : null;
        
        let filteredSales = sales;
        if (product) {
          filteredSales = sales.filter(s => s.product === product);
        }
        
        const totalSales = filteredSales.reduce((sum, s) => sum + s.amount, 0);
        
        result = {
          type: 'sales',
          title: `${product || 'Total'} Sales Analysis`,
          data: filteredSales,
          summary: `Total: ₹${(totalSales / 100000).toFixed(1)}L across ${filteredSales.length} transactions`,
          headers: ['Product', 'Customer', 'Amount', 'RM', 'Status'],
          rows: filteredSales.slice(0, 10).map(s => ({
            product: s.product,
            customer: s.customer,
            amount: `₹${(s.amount / 100000).toFixed(1)}L`,
            rm: s.rm,
            status: s.status
          }))
        };
      }
      // Lead queries
      else if (lowerQuery.includes('lead') || lowerQuery.includes('conversion')) {
        const stage = lowerQuery.includes('converted') ? 'Converted' :
                     lowerQuery.includes('follow') ? 'Follow-up' :
                     lowerQuery.includes('new') ? 'New' : null;
        
        let filteredLeads = leads;
        if (stage) {
          filteredLeads = leads.filter(l => l.stage === stage);
        }
        
        result = {
          type: 'leads',
          title: `${stage || 'All'} Leads`,
          data: filteredLeads,
          summary: `${filteredLeads.length} leads found`,
          headers: ['Name', 'Product', 'Source', 'Stage', 'RM'],
          rows: filteredLeads.slice(0, 10).map(l => ({
            name: l.name,
            product: l.product,
            source: l.source,
            stage: l.stage,
            rm: l.rm
          }))
        };
      }
      // Customer queries
      else if (lowerQuery.includes('customer') || lowerQuery.includes('repeat')) {
        const repeatOnly = lowerQuery.includes('repeat');
        
        let filteredCustomers = customers;
        if (repeatOnly) {
          filteredCustomers = customers.filter(c => c.repeatCustomer);
        }
        
        result = {
          type: 'customers',
          title: `${repeatOnly ? 'Repeat' : 'All'} Customers`,
          data: filteredCustomers,
          summary: `${filteredCustomers.length} customers found`,
          headers: ['Name', 'Region', 'Products', 'Total Sales', 'Type'],
          rows: filteredCustomers.map(c => ({
            name: c.name,
            region: c.region,
            products: c.products,
            totalSales: `₹${(c.totalSales / 100000).toFixed(1)}L`,
            type: c.repeatCustomer ? 'Repeat' : 'New'
          }))
        };
      }
      else {
        toast.error('Query not understood. Try: "Show top 5 RMs in Pune" or "Show gold loan sales"');
        setIsProcessing(false);
        return;
      }

      onQueryResult(result);
      toast.success('Query processed successfully');
      setIsProcessing(false);
    }, 1000);
  };

  const exampleQueries = [
    "Show top 5 RMs in Pune this week",
    "Show gold loan sales",
    "Show converted leads",
    "Show repeat customers"
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Natural Language Query
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything... e.g., 'Show top 5 RMs in Pune'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && processQuery()}
            className="flex-1"
          />
          <Button 
            onClick={processQuery} 
            disabled={isProcessing}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            {isProcessing ? 'Processing...' : 'Search'}
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setQuery(example)}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
