// Comprehensive dummy data for Smart Reports & Analysis

export interface Lead {
  id: number;
  name: string;
  source: string;
  stage: string;
  createdOn: string;
  phone: string;
  product: string;
  rm: string;
  region: string;
  branch: string;
}

export interface Customer {
  id: number;
  name: string;
  region: string;
  branch: string;
  totalSales: number;
  repeatCustomer: boolean;
  products: number;
  lastPurchase: string;
  rm: string;
}

export interface Sale {
  id: number;
  product: string;
  amount: number;
  rm: string;
  date: string;
  customer: string;
  region: string;
  branch: string;
  status: string;
}

export interface RMPerformance {
  rm: string;
  supervisor: string;
  zonal: string;
  ho: string;
  target: number;
  achieved: number;
  score: number;
  region: string;
  branch: string;
  date: string;
}

export interface Campaign {
  id: number;
  name: string;
  reach: number;
  responses: number;
  roi: string;
  startDate: string;
  endDate: string;
  region: string;
}

export interface SystemUsage {
  rm: string;
  logins: number;
  lastActive: string;
  offlineSync: boolean;
  region: string;
  branch: string;
}

export interface Product {
  id: string;
  name: string;
  limit: string;
  commission: string;
}

// User Hierarchy
export const userHierarchy = {
  rm: ["Amit Desai", "Priya Kulkarni", "Rahul Joshi", "Sunita Verma", "Vikram Patil", "Neha Sharma", "Karan Mehta", "Sneha Iyer"],
  supervisor: ["Kiran Patil", "Rohit Nair", "Anjali Deshmukh"],
  zonal: ["West Zone", "Central Zone", "East Zone"],
  ho: ["Mumbai HO"]
};

// Geography
export const geography = {
  regions: ["West Zone", "Central Zone", "East Zone"],
  branches: {
    "West Zone": ["Pune Central", "Baner", "Kothrud", "Mumbai Central"],
    "Central Zone": ["Nagpur East", "Nagpur West", "Nashik"],
    "East Zone": ["Kolkata South", "Kolkata North", "Bhubaneswar"]
  },
  territories: {
    "Pune Central": ["Kothrud", "Shivajinagar", "Camp"],
    "Baner": ["Baner", "Aundh", "Pashan"],
    "Mumbai Central": ["Dadar", "Bandra", "Andheri"]
  }
};

// Products
export const products: Product[] = [
  { id: "P01", name: "Personal Loan", limit: "10L", commission: "2%" },
  { id: "P02", name: "Gold Loan", limit: "5L", commission: "1.5%" },
  { id: "P03", name: "Home Loan", limit: "50L", commission: "1.8%" },
  { id: "P04", name: "Business Loan", limit: "25L", commission: "2.2%" },
  { id: "P05", name: "Vehicle Loan", limit: "15L", commission: "1.7%" }
];

// Leads
export const leads: Lead[] = [
  { id: 101, name: "Ravi Sharma", source: "Google Ads", stage: "Follow-up", createdOn: "2025-09-10", phone: "9876543210", product: "Personal Loan", rm: "Amit Desai", region: "West Zone", branch: "Pune Central" },
  { id: 102, name: "Priya Nair", source: "Facebook Ads", stage: "New", createdOn: "2025-09-15", phone: "9876543211", product: "Home Loan", rm: "Priya Kulkarni", region: "West Zone", branch: "Baner" },
  { id: 103, name: "Suresh Kumar", source: "Referral", stage: "Converted", createdOn: "2025-08-20", phone: "9876543212", product: "Gold Loan", rm: "Amit Desai", region: "West Zone", branch: "Pune Central" },
  { id: 104, name: "Anjali Patil", source: "Walk-in", stage: "Follow-up", createdOn: "2025-09-18", phone: "9876543213", product: "Personal Loan", rm: "Rahul Joshi", region: "Central Zone", branch: "Nagpur East" },
  { id: 105, name: "Vikram Singh", source: "Google Ads", stage: "Lost", createdOn: "2025-08-05", phone: "9876543214", product: "Business Loan", rm: "Sunita Verma", region: "Central Zone", branch: "Nagpur West" },
  { id: 106, name: "Meera Desai", source: "WhatsApp Campaign", stage: "New", createdOn: "2025-09-20", phone: "9876543215", product: "Vehicle Loan", rm: "Vikram Patil", region: "East Zone", branch: "Kolkata South" },
  { id: 107, name: "Rajesh Yadav", source: "Email Campaign", stage: "Follow-up", createdOn: "2025-09-12", phone: "9876543216", product: "Personal Loan", rm: "Neha Sharma", region: "West Zone", branch: "Mumbai Central" },
  { id: 108, name: "Kavita Joshi", source: "Google Ads", stage: "Converted", createdOn: "2025-09-05", phone: "9876543217", product: "Home Loan", rm: "Karan Mehta", region: "West Zone", branch: "Pune Central" },
  { id: 109, name: "Anil Kulkarni", source: "Referral", stage: "Follow-up", createdOn: "2025-09-22", phone: "9876543218", product: "Gold Loan", rm: "Amit Desai", region: "West Zone", branch: "Kothrud" },
  { id: 110, name: "Pooja Reddy", source: "Facebook Ads", stage: "New", createdOn: "2025-09-25", phone: "9876543219", product: "Personal Loan", rm: "Sneha Iyer", region: "East Zone", branch: "Bhubaneswar" }
];

// Customers
export const customers: Customer[] = [
  { id: 5001, name: "Anita Mehta", region: "West Zone", branch: "Pune Central", totalSales: 850000, repeatCustomer: true, products: 2, lastPurchase: "2025-08-15", rm: "Amit Desai" },
  { id: 5002, name: "Ravi Kulkarni", region: "West Zone", branch: "Baner", totalSales: 1750000, repeatCustomer: true, products: 3, lastPurchase: "2025-09-10", rm: "Priya Kulkarni" },
  { id: 5003, name: "Sanjay Pawar", region: "Central Zone", branch: "Nagpur East", totalSales: 500000, repeatCustomer: false, products: 1, lastPurchase: "2025-09-20", rm: "Rahul Joshi" },
  { id: 5004, name: "Deepa Sharma", region: "West Zone", branch: "Mumbai Central", totalSales: 3200000, repeatCustomer: true, products: 4, lastPurchase: "2025-09-18", rm: "Neha Sharma" },
  { id: 5005, name: "Mahesh Gupta", region: "East Zone", branch: "Kolkata South", totalSales: 1200000, repeatCustomer: false, products: 2, lastPurchase: "2025-09-05", rm: "Vikram Patil" }
];

// Sales
export const sales: Sale[] = [
  { id: 7001, product: "Home Loan", amount: 2500000, rm: "Amit Desai", date: "2025-09-15", customer: "Anita Mehta", region: "West Zone", branch: "Pune Central", status: "Disbursed" },
  { id: 7002, product: "Personal Loan", amount: 750000, rm: "Priya Kulkarni", date: "2025-09-18", customer: "Ravi Kulkarni", region: "West Zone", branch: "Baner", status: "Approved" },
  { id: 7003, product: "Gold Loan", amount: 350000, rm: "Amit Desai", date: "2025-09-10", customer: "Suresh Kumar", region: "West Zone", branch: "Pune Central", status: "Disbursed" },
  { id: 7004, product: "Business Loan", amount: 1500000, rm: "Rahul Joshi", date: "2025-09-20", customer: "Sanjay Pawar", region: "Central Zone", branch: "Nagpur East", status: "Processing" },
  { id: 7005, product: "Vehicle Loan", amount: 900000, rm: "Sunita Verma", date: "2025-09-12", customer: "Vikram Singh", region: "Central Zone", branch: "Nagpur West", status: "Disbursed" },
  { id: 7006, product: "Home Loan", amount: 3200000, rm: "Neha Sharma", date: "2025-09-22", customer: "Deepa Sharma", region: "West Zone", branch: "Mumbai Central", status: "Approved" },
  { id: 7007, product: "Personal Loan", amount: 650000, rm: "Vikram Patil", date: "2025-09-08", customer: "Mahesh Gupta", region: "East Zone", branch: "Kolkata South", status: "Disbursed" },
  { id: 7008, product: "Gold Loan", amount: 280000, rm: "Karan Mehta", date: "2025-09-25", customer: "Kavita Joshi", region: "West Zone", branch: "Pune Central", status: "Processing" }
];

// RM Performance
export const rmPerformance: RMPerformance[] = [
  { rm: "Amit Desai", supervisor: "Kiran Patil", zonal: "West Zone", ho: "Mumbai HO", target: 25, achieved: 22, score: 88, region: "West Zone", branch: "Pune Central", date: "2025-09-30" },
  { rm: "Priya Kulkarni", supervisor: "Kiran Patil", zonal: "West Zone", ho: "Mumbai HO", target: 20, achieved: 19, score: 95, region: "West Zone", branch: "Baner", date: "2025-09-30" },
  { rm: "Rahul Joshi", supervisor: "Rohit Nair", zonal: "Central Zone", ho: "Mumbai HO", target: 18, achieved: 15, score: 83, region: "Central Zone", branch: "Nagpur East", date: "2025-09-30" },
  { rm: "Sunita Verma", supervisor: "Rohit Nair", zonal: "Central Zone", ho: "Mumbai HO", target: 22, achieved: 20, score: 91, region: "Central Zone", branch: "Nagpur West", date: "2025-09-30" },
  { rm: "Vikram Patil", supervisor: "Anjali Deshmukh", zonal: "East Zone", ho: "Mumbai HO", target: 20, achieved: 16, score: 80, region: "East Zone", branch: "Kolkata South", date: "2025-09-30" },
  { rm: "Neha Sharma", supervisor: "Kiran Patil", zonal: "West Zone", ho: "Mumbai HO", target: 24, achieved: 23, score: 96, region: "West Zone", branch: "Mumbai Central", date: "2025-09-30" },
  { rm: "Karan Mehta", supervisor: "Kiran Patil", zonal: "West Zone", ho: "Mumbai HO", target: 21, achieved: 18, score: 86, region: "West Zone", branch: "Pune Central", date: "2025-09-30" },
  { rm: "Sneha Iyer", supervisor: "Anjali Deshmukh", zonal: "East Zone", ho: "Mumbai HO", target: 19, achieved: 17, score: 89, region: "East Zone", branch: "Bhubaneswar", date: "2025-09-30" }
];

// Campaigns
export const campaigns: Campaign[] = [
  { id: 1, name: "Festive Loan Drive", reach: 5000, responses: 1200, roi: "15%", startDate: "2025-08-01", endDate: "2025-08-31", region: "West Zone" },
  { id: 2, name: "Diwali Offer", reach: 4000, responses: 950, roi: "12%", startDate: "2025-09-01", endDate: "2025-09-30", region: "All" },
  { id: 3, name: "Gold Loan Special", reach: 3000, responses: 800, roi: "18%", startDate: "2025-09-10", endDate: "2025-09-25", region: "Central Zone" },
  { id: 4, name: "Home Loan Festival", reach: 6000, responses: 1500, roi: "20%", startDate: "2025-08-15", endDate: "2025-09-15", region: "West Zone" }
];

// System Usage
export const systemUsage: SystemUsage[] = [
  { rm: "Amit Desai", logins: 22, lastActive: "2025-09-28", offlineSync: true, region: "West Zone", branch: "Pune Central" },
  { rm: "Priya Kulkarni", logins: 20, lastActive: "2025-09-28", offlineSync: true, region: "West Zone", branch: "Baner" },
  { rm: "Rahul Joshi", logins: 15, lastActive: "2025-09-27", offlineSync: false, region: "Central Zone", branch: "Nagpur East" },
  { rm: "Sunita Verma", logins: 18, lastActive: "2025-09-28", offlineSync: true, region: "Central Zone", branch: "Nagpur West" },
  { rm: "Vikram Patil", logins: 12, lastActive: "2025-09-23", offlineSync: false, region: "East Zone", branch: "Kolkata South" },
  { rm: "Neha Sharma", logins: 25, lastActive: "2025-09-28", offlineSync: true, region: "West Zone", branch: "Mumbai Central" },
  { rm: "Karan Mehta", logins: 16, lastActive: "2025-09-28", offlineSync: true, region: "West Zone", branch: "Pune Central" },
  { rm: "Sneha Iyer", logins: 19, lastActive: "2025-09-27", offlineSync: true, region: "East Zone", branch: "Bhubaneswar" }
];

// Helper functions to filter data based on role
export const filterDataByRole = (userRole: string, userName: string, data: any[]) => {
  if (userRole === 'ho') return data;
  
  if (userRole === 'zonal') {
    const zonalName = userName; // e.g., "West Zone"
    return data.filter(item => item.region === zonalName || item.zonal === zonalName);
  }
  
  if (userRole === 'supervisor') {
    const supervisorName = userName; // e.g., "Kiran Patil"
    return data.filter(item => item.supervisor === supervisorName);
  }
  
  if (userRole === 'rm') {
    const rmName = userName; // e.g., "Amit Desai"
    return data.filter(item => item.rm === rmName);
  }
  
  return data;
};

// AI Insights generation
export const generateAIInsights = (filteredSales: Sale[], filteredPerformance: RMPerformance[], filteredLeads: Lead[]) => {
  const insights = [];
  
  // Sales trend insight
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
  const avgSalesPerRM = totalSales / new Set(filteredSales.map(s => s.rm)).size;
  
  if (avgSalesPerRM > 1000000) {
    insights.push({
      type: 'positive',
      title: 'Strong Sales Performance',
      description: `Average sales per RM reached ₹${(avgSalesPerRM / 100000).toFixed(1)}L, exceeding targets by 12%.`
    });
  }
  
  // Performance anomaly
  const lowPerformers = filteredPerformance.filter(p => p.score < 85);
  if (lowPerformers.length > 0) {
    insights.push({
      type: 'warning',
      title: 'Performance Alert',
      description: `${lowPerformers.length} RM(s) below 85% score. Consider training support for ${lowPerformers[0]?.rm}.`
    });
  }
  
  // Lead conversion
  const convertedLeads = filteredLeads.filter(l => l.stage === 'Converted').length;
  const totalLeads = filteredLeads.length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  
  if (conversionRate > 20) {
    insights.push({
      type: 'positive',
      title: 'Excellent Conversion Rate',
      description: `Lead conversion at ${conversionRate.toFixed(1)}%, driven by strong follow-ups.`
    });
  } else if (conversionRate < 15) {
    insights.push({
      type: 'warning',
      title: 'Low Conversion Rate',
      description: `Conversion rate at ${conversionRate.toFixed(1)}%. Focus on lead quality and follow-up timing.`
    });
  }
  
  // Product trend
  const productSales = filteredSales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];
  if (topProduct) {
    insights.push({
      type: 'neutral',
      title: 'Top Product',
      description: `${topProduct[0]} leads with ₹${(topProduct[1] / 100000).toFixed(1)}L in sales this period.`
    });
  }
  
  return insights;
};
