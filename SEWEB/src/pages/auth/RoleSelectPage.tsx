import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, GraduationCapIcon, UsersIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
export function RoleSelectPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2.5 mb-12">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <BookOpenIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Ezy English
        </span>
      </Link>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3 text-center">
        Choose Your Role
      </h1>
      <p className="text-slate-500 mb-10 text-center max-w-md">
        Select how you'd like to use Ezy English. You can always change this
        later.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl w-full">
        <Card hover className="text-center group">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600 transition-colors duration-300">
            <BookOpenIcon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Student</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Access classes, track progress, earn XP, and download learning
            materials.
          </p>
          <Link to="/register">
            <Button variant="primary" className="w-full">
              Select Student
            </Button>
          </Link>
        </Card>

        <Card hover className="text-center group">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-600 transition-colors duration-300">
            <GraduationCapIcon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Teacher</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Manage classes, upload assignments, track student performance and
            attendance.
          </p>
          <Link to="/register">
            <Button
              variant="primary"
              className="w-full bg-emerald-600 hover:bg-emerald-700">

              Select Teacher
            </Button>
          </Link>
        </Card>

        <Card hover className="text-center group">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-600 transition-colors duration-300">
            <UsersIcon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Parent</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Monitor your child's progress, view grades, manage payments and
            schedules.
          </p>
          <Link to="/register">
            <Button
              variant="primary"
              className="w-full bg-purple-600 hover:bg-purple-700">

              Select Parent
            </Button>
          </Link>
        </Card>
      </div>

      <p className="text-sm text-slate-400 mt-10">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">

          Sign in
        </Link>
      </p>
    </div>);

}