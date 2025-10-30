import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Settings, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { ConfigureColumnsModal, ColumnConfig } from './ConfigureColumnsModal';
import { MessageDialog } from './MessageDialog';

interface ReportData {
  "RM Name": string;
  "Branch": string;
  "Product": string;
  "Target": number;
  "Achieved": number;
  "% Achieved": string;
  "KRA Type": string;
  "Date": string;
  "Conversion Rate": string;
  "Region": string;
  "Supervisor": string;
}

const DUMMY_DATA: ReportData[] = [
  { "RM Name": "Amit Desai", "Branch": "Pune Central", "Product": "Home Loan", "Target": 25, "Achieved": 22, "% Achieved": "88%", "KRA Type": "Sales", "Date": "2025-10-28", "Conversion Rate": "22%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Ravi Sharma", "Branch": "Mumbai South", "Product": "Gold Loan", "Target": 30, "Achieved": 26, "% Achieved": "87%", "KRA Type": "Sales", "Date": "2025-10-27", "Conversion Rate": "20%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Anita Mehta", "Branch": "Nagpur East", "Product": "Personal Loan", "Target": 20, "Achieved": 18, "% Achieved": "90%", "KRA Type": "Sales", "Date": "2025-10-29", "Conversion Rate": "25%", "Region": "Central Zone", "Supervisor": "Rohit Nair" },
  { "RM Name": "Priya Kulkarni", "Branch": "Baner", "Product": "Business Loan", "Target": 22, "Achieved": 19, "% Achieved": "86%", "KRA Type": "Sales", "Date": "2025-10-26", "Conversion Rate": "18%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Rahul Joshi", "Branch": "Nagpur West", "Product": "Vehicle Loan", "Target": 18, "Achieved": 15, "% Achieved": "83%", "KRA Type": "Sales", "Date": "2025-10-25", "Conversion Rate": "16%", "Region": "Central Zone", "Supervisor": "Rohit Nair" },
  { "RM Name": "Sunita Verma", "Branch": "Kolkata South", "Product": "Home Loan", "Target": 24, "Achieved": 20, "% Achieved": "83%", "KRA Type": "Sales", "Date": "2025-10-24", "Conversion Rate": "19%", "Region": "East Zone", "Supervisor": "Anjali Deshmukh" },
  { "RM Name": "Vikram Patil", "Branch": "Pune Kothrud", "Product": "Gold Loan", "Target": 20, "Achieved": 16, "% Achieved": "80%", "KRA Type": "Sales", "Date": "2025-10-23", "Conversion Rate": "17%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Neha Sharma", "Branch": "Mumbai Central", "Product": "Personal Loan", "Target": 26, "Achieved": 23, "% Achieved": "88%", "KRA Type": "Sales", "Date": "2025-10-22", "Conversion Rate": "24%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Karan Mehta", "Branch": "Pune Central", "Product": "Business Loan", "Target": 21, "Achieved": 18, "% Achieved": "86%", "KRA Type": "Sales", "Date": "2025-10-21", "Conversion Rate": "21%", "Region": "West Zone", "Supervisor": "Kiran Patil" },
  { "RM Name": "Sneha Iyer", "Branch": "Bhubaneswar", "Product": "Vehicle Loan", "Target": 19, "Achieved": 17, "% Achieved": "89%", "KRA Type": "Sales", "Date": "2025-10-20", "Conversion Rate": "23%", "Region": "East Zone", "Supervisor": "Anjali Deshmukh" }
];

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { id: "RM Name", label: "RM Name", visible: true, order: 0 },
  { id: "Branch", label: "Branch", visible: true, order: 1 },
  { id: "Product", label: "Product", visible: true, order: 2 },
  { id: "Target", label: "Target", visible: true, order: 3 },
  { id: "Achieved", label: "Achieved", visible: true, order: 4 },
  { id: "% Achieved", label: "% Achieved", visible: true, order: 5 },
  { id: "KRA Type", label: "KRA Type", visible: false, order: 6 },
  { id: "Date", label: "Date", visible: false, order: 7 },
  { id: "Conversion Rate", label: "Conversion Rate", visible: false, order: 8 },
  { id: "Region", label: "Region", visible: false, order: 9 },
  { id: "Supervisor", label: "Supervisor", visible: false, order: 10 }
];

const ITEMS_PER_PAGE = 5;

export const ConfigurableReportTable = () => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    // Load columns from localStorage or use defaults
    const savedColumns = localStorage.getItem('reportColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    } else {
      setColumns(DEFAULT_COLUMNS);
    }
  }, []);

  const handleSaveColumns = (newColumns: ColumnConfig[]) => {
    setColumns(newColumns);
    localStorage.setItem('reportColumns', JSON.stringify(newColumns));
    
    setMessageDialog({
      open: true,
      title: 'Column Preferences Updated',
      message: '✅ Your column preferences have been saved successfully. The table will now display your selected columns in the order you specified.',
      type: 'success'
    });
  };

  const handleResetColumns = () => {
    setColumns(DEFAULT_COLUMNS);
    localStorage.setItem('reportColumns', JSON.stringify(DEFAULT_COLUMNS));
    
    setMessageDialog({
      open: true,
      title: 'Columns Reset',
      message: 'Column configuration has been reset to default view.',
      type: 'info'
    });
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return DUMMY_DATA;

    return [...DUMMY_DATA].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof ReportData];
      const bVal = b[sortConfig.key as keyof ReportData];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      
      return sortConfig.direction === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  };

  const visibleColumns = columns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order);

  const sortedData = getSortedData();
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getCellValue = (row: ReportData, columnId: string) => {
    const value = row[columnId as keyof ReportData];
    
    // Add badges for specific columns
    if (columnId === '% Achieved') {
      const percentage = parseInt(value as string);
      return (
        <Badge variant={percentage >= 90 ? 'default' : percentage >= 80 ? 'secondary' : 'destructive'}>
          {value}
        </Badge>
      );
    }
    
    if (columnId === 'KRA Type') {
      return <Badge variant="outline">{value}</Badge>;
    }
    
    return value;
  };

  const handleExport = () => {
    // Create CSV with visible columns
    const headers = visibleColumns.map(col => col.label);
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row =>
        visibleColumns.map(col => {
          const value = row[col.id as keyof ReportData];
          return `"${value}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMessageDialog({
      open: true,
      title: 'Export Successful',
      message: `Report exported with ${visibleColumns.length} visible columns.`,
      type: 'success'
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance Report - Configurable View</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfigModalOpen(true)}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Configure Columns
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead
                      key={column.id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleSort(column.id)}
                    >
                      <div className="flex items-center gap-2">
                        {column.label}
                        {sortConfig?.key === column.id && (
                          <span className="text-xs">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {visibleColumns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.id}`}>
                        {getCellValue(row, column.id)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedData.length)} of {sortedData.length} records
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfigureColumnsModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        columns={columns}
        onSave={handleSaveColumns}
        onReset={handleResetColumns}
      />

      <MessageDialog
        open={messageDialog.open}
        onOpenChange={(open) => setMessageDialog({ ...messageDialog, open })}
        title={messageDialog.title}
        message={messageDialog.message}
        type={messageDialog.type}
      />
    </>
  );
};
