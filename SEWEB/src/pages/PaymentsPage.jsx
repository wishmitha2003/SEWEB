import React from 'react';
import {
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table } from '../components/ui/Table';
import { studentSidebarItems } from '../config/studentSidebarItems.jsx';

const paymentHistory = [
  {
    invoice: '#INV-2026-03',
    period: 'March 2026',
    amount: 'LKR 5,000',
    status: 'pending',
    dueDate: 'Mar 1, 2026',
    paidOn: '-',
    method: '—',
  },
  {
    invoice: '#INV-2026-02',
    period: 'February 2026',
    amount: 'LKR 5,000',
    status: 'paid',
    dueDate: 'Feb 1, 2026',
    paidOn: 'Jan 30, 2026',
    method: 'Card',
  },
  {
    invoice: '#INV-2026-01',
    period: 'January 2026',
    amount: 'LKR 5,000',
    status: 'paid',
    dueDate: 'Jan 1, 2026',
    paidOn: 'Dec 30, 2025',
    method: 'Bank Transfer',
  },
];

const paymentColumns = [
  { key: 'invoice', header: 'Invoice #', className: 'whitespace-nowrap' },
  { key: 'period', header: 'Period', className: 'whitespace-nowrap' },
  { key: 'amount', header: 'Amount', className: 'whitespace-nowrap' },
  {
    key: 'status',
    header: 'Status',
    render: (val) => (
      <Badge variant={val === 'paid' ? 'success' : 'warning'}>
        {val === 'paid' ? 'Paid' : 'Pending'}
      </Badge>
    ),
  },
  { key: 'dueDate', header: 'Due Date', className: 'whitespace-nowrap' },
  { key: 'paidOn', header: 'Paid On', className: 'whitespace-nowrap' },
  { key: 'method', header: 'Method', className: 'whitespace-nowrap' },
];

export function PaymentsPage() {
  const nextPayment = paymentHistory[0];

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Payments & Billing
            </h1>
            <p className="text-slate-500 mt-1">
              View your upcoming payments, history, and billing status.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Next Payment Card */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Next Payment
                </h2>
                <p className="text-sm text-slate-500">
                  Monthly fee for {nextPayment.period}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1">Amount</p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {nextPayment.amount}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Due Date</p>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CalendarIcon className="w-4 h-4" />
                  {nextPayment.dueDate}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <Badge variant="warning">Due in 5 days</Badge>
              </div>
            </div>

            <ProgressBar
              value={75}
              label="Current billing cycle"
              showPercentage
              size="sm"
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="sm:flex-1" size="md">
                Pay Now
              </Button>
              <Button variant="outline" size="md" className="sm:flex-1">
                Download Latest Invoice
              </Button>
            </div>
          </Card>

          {/* Billing Overview */}
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Billing Overview
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Summary of your recent payments.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Last payment
                    </p>
                    <p className="text-xs text-slate-500">Feb 2026 • LKR 5,000</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Upcoming due
                    </p>
                    <p className="text-xs text-slate-500">Mar 1, 2026 • LKR 5,000</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Payment History
              </h2>
              <p className="text-sm text-slate-500">
                All recent invoices and payment records.
              </p>
            </div>
          </div>
          <Table columns={paymentColumns} data={paymentHistory} />
        </Card>
      </div>
    </DashboardLayout>
  );
}
