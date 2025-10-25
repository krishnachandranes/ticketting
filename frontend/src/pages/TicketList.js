import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketsAPI } from '../services/api';
import toast from 'react-hot-toast';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketsAPI.getAll();
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketsAPI.delete(id);
        setTickets(tickets.filter(ticket => ticket.id !== id));
        toast.success('Ticket deleted successfully');
      } catch (error) {
        console.error('Error deleting ticket:', error);
        toast.error('Failed to delete ticket');
      }
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (filters.status === '' || ticket.status === filters.status) &&
      (filters.priority === '' || ticket.priority === filters.priority) &&
      (filters.assignedTo === '' || ticket.assignedTo === filters.assignedTo)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track all support tickets</p>
        </div>
        <Link
          to="/tickets/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center sm:text-left"
        >
          Create New Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
            <input
              type="text"
              value={filters.assignedTo}
              onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
              placeholder="Filter by assignee email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">
            Tickets ({filteredTickets.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTickets.length === 0 ? (
            <div className="px-4 lg:px-6 py-12 text-center">
              <p className="text-gray-500">No tickets found matching your filters.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div key={ticket.id} className="px-4 lg:px-6 py-4 hover:bg-gray-50">
                <div className="flex flex-col space-y-3">
                  {/* Mobile layout */}
                  <div className="flex flex-col space-y-2 sm:hidden">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-base font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                    >
                      {ticket.title}
                    </Link>
                    <p className="text-sm text-gray-500 line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                      {ticket.assignedTo && <div>Assigned to: {ticket.assignedTo}</div>}
                    </div>
                    <div className="flex items-center space-x-4 pt-2">
                      <Link
                        to={`/tickets/${ticket.id}/edit`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/tickets/${ticket.id}`}
                          className="text-base lg:text-lg font-medium text-gray-900 hover:text-primary-600 truncate"
                        >
                          {ticket.title}
                        </Link>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{ticket.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Link
                        to={`/tickets/${ticket.id}/edit`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketList;
