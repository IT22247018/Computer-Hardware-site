import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import moment from 'moment';

import '../../styles/assets/css/material-dashboard.min - table.css';
import AdminMenu from './../../components/Layout/AdminMenu';


const UpdateNotification = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/v1/appointment/allnotification-appointments');
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/v1/appointment/allnotification-appointments'); // Update the endpoint
        setAppointments(response.data.notifications || []); // Update the data extraction
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    useEffect(() => {
      fetchNotifications(); // Update the function call
    }, []);
    
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (notificationId, newStatus) => {
    try {
      // Make an API call to update the status using the notificationId
      await axios.put(`http://localhost:8085/api/v1/appointment/appointment-status/${notificationId}`, { status: newStatus });
      // Refresh the appointments after the update
      fetchAppointments();
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <Layout title={'All Appointments'}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-10">
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card my-4">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 className="text-white text-capitalize ps-3">Appointments List</h6>
                      </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">First Name</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Last Name</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Specialization</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Current Status</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Update Status</th>
                              <th className="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody>
                          {appointments.map((appointment, index) => (
                      <tr key={appointment._id}>
                                  <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{index + 1}</p>
                                   </td>
                                  <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.firstname}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.lastname}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.description}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.type}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.specialization}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.address}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.phoneNumber}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{moment(appointment.date).format('MMMM DD, YYYY')}</p>
                                   </td>
                                   <td class="align-middle text-center text-sm">
                                  <p class="text-xs font-weight-bold mb-0">{appointment.notifications[0]?.status || 'N/A'}</p>
                                   </td>
                                  <td>
                                  <select class="form-select align-middle text-center text-sm" 
                                  value={appointment.status}
                                  onChange={(e) => handleStatusUpdate(appointment.notifications[0]?._id, e.target.value)}
                                   >
                                      <option value="unread">Unread</option>
                                      <option value="approved">Approved</option>
                                      <option value="rejected">Rejected</option>
                                      <option value="pending">Pending</option>
                                      <option value="Done">Done</option>
                                    </select>
                                  </td>
                                </tr>
                              
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateNotification;
