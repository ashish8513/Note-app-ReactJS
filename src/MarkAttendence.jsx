import React, { useState } from 'react';
import Layout from '../Layout/Layout';

const AttendanceManagement = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: 'Mar 20, 2024', clockIn: '09:00 AM', clockOut: '05:00 PM', status: 'Present', note: '' },
    { date: 'Mar 20, 2024', clockIn: '09:30 AM', clockOut: '05:30 PM', status: 'Late', note: 'Traffic delay' },
  ]);

  const stats = {
    present: 15,
    late: 3,
    earlyLeave: 2,
    absent: 1,
  };

  return (
    <Layout>

    <div className="min-h-screen w-full  flex flex-col items-center md:mt-96">
      <div className="w-full  rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between  mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src="/user.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Ashish Prabhakar</h2>
              <p className="text-sm text-gray-500">Senior Developer - Engineering</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
               Present 
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
               Absent
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 rounded-xl gap-4 mb-6">
          <div className="bg-green-100 text-green-600 text-center p-6 rounded">
            <h3 className="text-2xl font-bold">{stats.present}</h3>
            <p>Present</p>
          </div>
          <div className="bg-yellow-100 text-yellow-600 text-center p-4 rounded">
            <h3 className="text-2xl font-bold">{stats.late}</h3>
            <p>Late</p>
          </div>
          <div className="bg-blue-100 text-blue-600 text-center p-4 rounded">
            <h3 className="text-2xl font-bold">{stats.earlyLeave}</h3>
            <p>Early Leave</p>
          </div>
          <div className="bg-red-100 text-red-600 text-center p-4 rounded">
            <h3 className="text-2xl font-bold">{stats.absent}</h3>
            <p>Absent</p>
          </div>
        </div>

        {/* Attendance History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendance History</h3>
          <div className="overflow-auto">
            <table className="min-w-full table-auto bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Clock In</th>
                  <th className="px-4 py-2 text-left">Clock Out</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="px-4 py-2">{record.date}</td>
                    <td className="px-4 py-2">{record.clockIn}</td>
                    <td className="px-4 py-2">{record.clockOut}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          record.status === 'Present'
                            ? 'bg-green-200 text-green-600'
                            : 'bg-yellow-200 text-yellow-600'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{record.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AttendanceManagement;
