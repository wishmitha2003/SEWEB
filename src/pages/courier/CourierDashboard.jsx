import React, { useState } from 'react';
import {
  LayoutDashboardIcon,
  TruckIcon,
  CalendarIcon,
  PackageIcon,
  CheckCircleIcon,
  ClockIcon } from
'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useAuth } from '../../context/AuthContext';
const sidebarItems = [
{
  icon: <LayoutDashboardIcon className="w-4 h-4" />,
  label: 'Dashboard',
  path: '/courier'
},
{
  icon: <TruckIcon className="w-4 h-4" />,
  label: 'Deliveries',
  path: '/courier/deliveries'
},
{
  icon: <CalendarIcon className="w-4 h-4" />,
  label: 'Schedule',
  path: '/courier/schedule'
}];

const deliveryData = [
{
  orderId: '#1234',
  student: 'Kasun Silva',
  address: '42 Galle Rd, Colombo 03',
  status: 'In Transit',
  date: 'Feb 19, 2026'
},
{
  orderId: '#1235',
  student: 'Amaya Perera',
  address: '15 Temple Rd, Kandy',
  status: 'Pending',
  date: 'Feb 19, 2026'
},
{
  orderId: '#1236',
  student: 'Dinesh Kumar',
  address: '78 Beach Rd, Galle',
  status: 'Delivered',
  date: 'Feb 18, 2026'
},
{
  orderId: '#1237',
  student: 'Sachini Fernando',
  address: '23 Lake Rd, Colombo 08',
  status: 'Pending',
  date: 'Feb 20, 2026'
},
{
  orderId: '#1238',
  student: 'Ruwan Jay',
  address: '56 Hill St, Nuwara Eliya',
  status: 'In Transit',
  date: 'Feb 19, 2026'
},
{
  orderId: '#1239',
  student: 'Nimali Dias',
  address: '90 Main St, Matara',
  status: 'Delivered',
  date: 'Feb 18, 2026'
}];

const deliveryColumns = [
{
  key: 'orderId',
  header: 'Order ID'
},
{
  key: 'student',
  header: 'Student'
},
{
  key: 'address',
  header: 'Address'
},
{
  key: 'status',
  header: 'Status',
  render: (val) => {
    const v =
    val === 'Delivered' ?
    'success' :
    val === 'In Transit' ?
    'info' :
    'warning';
    return <Badge variant={v}>{val}</Badge>;
  }
},
{
  key: 'date',
  header: 'Date'
},
{
  key: 'actions',
  header: 'Action',
  render: (_, row) =>
  row.status !== 'Delivered' ?
  <Button size="sm" variant="outline">
          Update
        </Button> :

  <span className="text-xs text-slate-400">Completed</span>

}];

export function CourierDashboard() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState('#1234');
  const [selectedStatus, setSelectedStatus] = useState('in-transit');
  const [notes, setNotes] = useState('');
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Courier Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your tute deliveries and update statuses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <PackageIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">12</p>
              <p className="text-sm text-slate-500">Pending Deliveries</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">8</p>
              <p className="text-sm text-slate-500">Completed Today</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">45</p>
              <p className="text-sm text-slate-500">Total This Week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Delivery Status Update */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-5">
          Update Delivery Status
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Select Order
              </label>
              <select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">

                <option value="#1234">#1234 - Kasun Silva</option>
                <option value="#1235">#1235 - Amaya Perera</option>
                <option value="#1237">#1237 - Sachini Fernando</option>
                <option value="#1238">#1238 - Ruwan Jay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="picked-up"
                    checked={selectedStatus === 'picked-up'}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500" />

                  <span className="text-sm text-slate-700">Picked Up</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="in-transit"
                    checked={selectedStatus === 'in-transit'}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500" />

                  <span className="text-sm text-slate-700">In Transit</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="status"
                    value="delivered"
                    checked={selectedStatus === 'delivered'}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500" />

                  <span className="text-sm text-slate-700">Delivered</span>
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Notes
              </label>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Add delivery notes..." />

            </div>
            <Button className="w-full" size="lg">
              Update Status
            </Button>
          </div>
        </div>
      </Card>

      {/* Delivery List */}
      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-5">Delivery List</h2>
        <Table columns={deliveryColumns} data={deliveryData} />
      </Card>
    </DashboardLayout>);

}