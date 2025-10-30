import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePermissions } from '@/hooks/usePermissions';
import PermissionGate from '@/components/rbac/PermissionGate';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportKPIs } from '@/components/reports/ReportKPIs';
import { ReportCharts } from '@/components/reports/ReportCharts';
import { ReportTable } from '@/components/reports/ReportTable';
import { ExportActions } from '@/components/reports/ExportActions';
import { MessageDialog } from '@/components/reports/MessageDialog';
import { ScheduleEmailModal, ScheduleData } from '@/components/reports/ScheduleEmailModal';
import { NaturalLanguageQuery } from '@/components/reports/NaturalLanguageQuery';
import { DrillDownModal } from '@/components/reports/DrillDownModal';
import { ThresholdAlerts, generateThresholdAlerts } from '@/components/reports/ThresholdAlerts';
import { ConfigurableReportTable } from '@/components/reports/ConfigurableReportTable';
import { exportToPDF, exportToExcel } from '@/utils/reportExport';
import { 
  leads, sales, rmPerformance, customers, campaigns, systemUsage,
  filterDataByRole, generateAIInsights, userHierarchy, geography
} from '@/data/reportsDummyData';
import { TrendingUp, Users } from 'lucide-react';

const SmartReports = () => {
  const { user, role, canAccess } = usePermissions();
  
  // Simulated role and user selection for demo
  const [selectedRole, setSelectedRole] = useState<'rm' | 'supervisor' | 'zonal' | 'ho'>('rm');
  const [selectedUser, setSelectedUser] = useState('Amit Desai');
  
  const [filters, setFilters] = useState({
    dateRange: 'month',
    department: 'all',
    category: 'all',
    region: 'all',
    branch: 'all',
    product: 'all'
  });
  
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });
  
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [drillDownData, setDrillDownData] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<any>(null);

  // Filter data based on role
  const filteredLeads = filterDataByRole(selectedRole, selectedUser, leads);
  const filteredSales = filterDataByRole(selectedRole, selectedUser, sales);
  const filteredPerformance = filterDataByRole(selectedRole, selectedUser, rmPerformance);
  const filteredCustomers = filterDataByRole(selectedRole, selectedUser, customers);
  const filteredSystemUsage = filterDataByRole(selectedRole, selectedUser, systemUsage);
  
  // Generate AI insights
  const aiInsights = generateAIInsights(filteredSales, filteredPerformance, filteredLeads);
  
  // Generate threshold alerts
  const thresholdAlerts = generateThresholdAlerts(filteredPerformance, filteredLeads, filteredSystemUsage);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  const handleQueryResult = (result: any) => {
    setQueryResult(result);
    setDrillDownData(result);
  };

  const getReportData = () => {
    const totalSales = filteredSales.reduce((sum, s) => sum + s.amount, 0);
    const avgScore = filteredPerformance.reduce((sum, p) => sum + p.score, 0) / filteredPerformance.length;
    const conversionRate = filteredLeads.length > 0 
      ? (filteredLeads.filter(l => l.stage === 'Converted').length / filteredLeads.length) * 100 
      : 0;
    
    return {
      title: `Smart Report - ${filters.category} (${filters.dateRange})`,
      period: filters.dateRange,
      kpis: [
        { title: 'Total Sales', value: `₹${(totalSales / 100000).toFixed(1)}L`, change: '+12%' },
        { title: 'Avg Performance', value: `${avgScore.toFixed(1)}%`, change: '+5%' },
        { title: 'Active Leads', value: filteredLeads.length.toString(), change: '+8' },
        { title: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, change: '+3%' }
      ],
      tableHeaders: ['Activity', 'Date', 'Amount', 'Status', 'RM'],
      tableData: filteredSales.slice(0, 10).map(s => ({
        activity: s.product,
        date: s.date,
        amount: `₹${(s.amount / 100000).toFixed(1)}L`,
        status: s.status,
        rm: s.rm
      }))
    };
  };

  const handleExport = async (format: 'pdf' | 'excel') => {
    try {
      const reportData = getReportData();
      
      if (format === 'pdf') {
        await exportToPDF(reportData);
      } else {
        await exportToExcel(reportData);
      }
      
      setMessageDialog({
        open: true,
        title: 'Export Successful',
        message: `Your report has been exported as ${format.toUpperCase()}`,
        type: 'success'
      });
    } catch (error) {
      setMessageDialog({
        open: true,
        title: 'Export Failed',
        message: 'There was an error exporting your report. Please try again.',
        type: 'error'
      });
    }
  };

  const handleScheduleEmail = (scheduleData: ScheduleData) => {
    console.log('Scheduling email report:', scheduleData);
    setScheduleModalOpen(false);
    setMessageDialog({
      open: true,
      title: 'Email Report Scheduled Successfully',
      message: `Your ${scheduleData.reportType} report will be sent to ${scheduleData.email} ${scheduleData.frequency} at ${scheduleData.time}. You will receive the first report within 24 hours.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Reports & Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Role-based insights and analytics with AI-powered recommendations
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          {/* Role Selector for Demo */}
          <Select value={selectedRole} onValueChange={(val: any) => setSelectedRole(val)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rm">RM</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="zonal">Zonal</SelectItem>
              <SelectItem value="ho">HO</SelectItem>
            </SelectContent>
          </Select>
          
          {/* User Selector for Demo */}
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectedRole === 'rm' && userHierarchy.rm.map(rm => (
                <SelectItem key={rm} value={rm}>{rm}</SelectItem>
              ))}
              {selectedRole === 'supervisor' && userHierarchy.supervisor.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
              {selectedRole === 'zonal' && userHierarchy.zonal.map(z => (
                <SelectItem key={z} value={z}>{z}</SelectItem>
              ))}
              {selectedRole === 'ho' && userHierarchy.ho.map(h => (
                <SelectItem key={h} value={h}>{h}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <ExportActions 
            onExport={handleExport} 
            onScheduleEmail={() => setScheduleModalOpen(true)}
          />
        </div>
      </div>

      {/* Natural Language Query */}
      <NaturalLanguageQuery onQueryResult={handleQueryResult} />
      
      {/* Threshold Alerts */}
      <ThresholdAlerts alerts={thresholdAlerts} />
      
      {/* Filters */}
      <ReportFilters filters={filters} onFilterChange={handleFilterChange} userRole={role} />

      {/* KPIs Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Key Metrics - {selectedUser} ({selectedRole.toUpperCase()})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Sales"
              value={`₹${(filteredSales.reduce((sum, s) => sum + s.amount, 0) / 100000).toFixed(1)}L`}
              change="+12%"
              trend="up"
            />
            <MetricCard
              title="Active Leads"
              value={filteredLeads.length.toString()}
              change="+8"
              trend="up"
            />
            <MetricCard
              title="Avg Performance"
              value={`${(filteredPerformance.reduce((sum, p) => sum + p.score, 0) / filteredPerformance.length || 0).toFixed(1)}%`}
              change="+5%"
              trend="up"
            />
            <MetricCard
              title="Customers"
              value={filteredCustomers.length.toString()}
              change="+3"
              trend="up"
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurable Report Table */}
      <ConfigurableReportTable />
      
      {/* Tabs for Different Report Views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          
          <PermissionGate permission="report_generate">
            <TabsTrigger value="team">Team Analytics</TabsTrigger>
          </PermissionGate>
          
          <PermissionGate resource="users" action="manage">
            <TabsTrigger value="system">System Reports</TabsTrigger>
          </PermissionGate>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="overview" />
          <ReportTable filters={filters} userRole={role} type="overview" />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <ReportCharts filters={filters} userRole={role} type="performance" />
          <ReportTable filters={filters} userRole={role} type="performance" />
        </TabsContent>

        <PermissionGate permission="report_generate">
          <TabsContent value="team" className="space-y-6">
            <ReportCharts filters={filters} userRole={role} type="team" />
            <ReportTable filters={filters} userRole={role} type="team" />
          </TabsContent>
        </PermissionGate>

        <PermissionGate resource="users" action="manage">
          <TabsContent value="system" className="space-y-6">
            <ReportCharts filters={filters} userRole={role} type="system" />
            <ReportTable filters={filters} userRole={role} type="system" />
          </TabsContent>
        </PermissionGate>
      </Tabs>

      {/* AI Insights Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <InsightCard 
                key={idx}
                title={insight.title}
                description={insight.description}
                type={insight.type}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <MessageDialog
        open={messageDialog.open}
        onOpenChange={(open) => setMessageDialog({ ...messageDialog, open })}
        title={messageDialog.title}
        message={messageDialog.message}
        type={messageDialog.type}
      />

      {/* Schedule Email Modal */}
      <ScheduleEmailModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleScheduleEmail}
      />
      
      {/* Drill Down Modal */}
      <DrillDownModal
        open={!!drillDownData}
        onOpenChange={(open) => !open && setDrillDownData(null)}
        data={drillDownData}
      />
    </div>
  );
};

const MetricCard = ({ title, value, change, trend }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}) => (
  <div className="p-4 bg-card border border-primary/20 rounded-lg">
    <p className="text-sm text-muted-foreground mb-1">{title}</p>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className={`text-xs mt-1 ${
      trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
    }`}>
      {change}
    </p>
  </div>
);

const InsightCard = ({ title, description, type }: {
  title: string; 
  description: string; 
  type: 'positive' | 'negative' | 'neutral' 
}) => (
  <div className={`p-4 rounded-lg border transition-colors ${
    type === 'positive' 
      ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' 
      : type === 'negative' 
      ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900' 
      : 'bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30'
  }`}>
    <h4 className="font-semibold text-sm mb-1 text-foreground">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default SmartReports;
