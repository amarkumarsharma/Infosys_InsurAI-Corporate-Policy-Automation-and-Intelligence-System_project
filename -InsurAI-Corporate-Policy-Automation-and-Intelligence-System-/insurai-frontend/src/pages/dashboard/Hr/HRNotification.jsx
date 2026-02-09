// src/components/hr/HRNotification.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function HRNotification({ currentHrId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  useEffect(() => {
    if (!currentHrId) {
      setError("HR ID is not provided");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://insurai-backend-production.up.railway.app/notifications/user/${currentHrId}`,
          {
            params: { role: "HR" },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNotifications(response.data || []);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError("Access denied. You are not authorized to view these notifications.");
        } else {
          setError("Failed to fetch notifications");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentHrId]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please login.");
        return;
      }

      const response = await axios.put(
        `https://insurai-backend-production.up.railway.app/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, readStatus: response.data.readStatus } : n
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to mark notification as read.");
    }
  };

  const markMultipleAsRead = async () => {
    if (selectedNotifications.size === 0) return;

    try {
      const token = localStorage.getItem("token");
      const promises = Array.from(selectedNotifications).map(id =>
        axios.put(
          `https://insurai-backend-production.up.railway.app/notifications/${id}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );

      await Promise.all(promises);
      setNotifications(prev =>
        prev.map(n =>
          selectedNotifications.has(n.id) ? { ...n, readStatus: true } : n
        )
      );
      setSelectedNotifications(new Set());
    } catch (err) {
      console.error(err);
      alert("Failed to mark notifications as read.");
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.readStatus);
    if (unreadNotifications.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      const promises = unreadNotifications.map(notification =>
        axios.put(
          `https://insurai-backend-production.up.railway.app/notifications/${notification.id}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );

      await Promise.all(promises);
      setNotifications(prev =>
        prev.map(n => ({ ...n, readStatus: true }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to mark all notifications as read.");
    }
  };

  const toggleNotificationSelection = (id) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter(n => !n.readStatus);
    if (filter === "read") return notifications.filter(n => n.readStatus);
    return notifications;
  }, [notifications, filter]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.readStatus).length, [notifications]);
  const readCount = useMemo(() => notifications.filter(n => n.readStatus).length, [notifications]);

  if (loading) {
    return (
      <div className="container mt-4 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-1">
        <div>
          <h2 className="fw-bold text-dark mb-2">
            <i className="bi bi-bell-fill me-2"></i>
            HR Notifications
          </h2>
          <p className="text-muted mb-0">View important updates, alerts, and reminders</p>
        </div>
        {unreadCount > 0 && (
          <span className="badge bg-danger fs-6 px-3 py-2 shadow-sm">
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {unreadCount} Unread
          </span>
        )}
      </div>

      {/* Filter & Actions */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <div className="btn-group" role="group">
            <input type="radio" className="btn-check" name="filter" id="filter-all" checked={filter === "all"} onChange={() => setFilter("all")} />
            <label className="btn btn-outline-primary" htmlFor="filter-all">All ({notifications.length})</label>

            <input type="radio" className="btn-check" name="filter" id="filter-unread" checked={filter === "unread"} onChange={() => setFilter("unread")} />
            <label className="btn btn-outline-warning" htmlFor="filter-unread">Unread ({unreadCount})</label>

            <input type="radio" className="btn-check" name="filter" id="filter-read" checked={filter === "read"} onChange={() => setFilter("read")} />
            <label className="btn btn-outline-success" htmlFor="filter-read">Read ({readCount})</label>
          </div>
        </div>

        <div className="col-md-4 text-end">
          <div className="d-flex gap-2 justify-content-end">
            {selectedNotifications.size > 0 && (
              <button className="btn btn-success btn-sm" onClick={markMultipleAsRead}>
                <i className="bi bi-check2-all me-1"></i>Mark Selected
              </button>
            )}
            {unreadCount > 0 && (
              <button className="btn btn-outline-success btn-sm" onClick={markAllAsRead}>
                <i className="bi bi-check2-all me-1"></i>Mark All Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Cards */}
      <div className="row g-3">
        {filteredNotifications.length === 0 ? (
          <div className="col-12 text-center py-5">
            <i className="bi bi-bell-slash display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">No notifications found</h5>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div key={n.id} className="col-md-6 col-lg-4">
              <div
                className={`card border-0 shadow-sm rounded-3 p-3 transition-all ${!n.readStatus ? "border-warning border-2" : ""} ${selectedNotifications.has(n.id) ? "border-primary border-2" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => !n.readStatus && markAsRead(n.id)}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedNotifications.has(n.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleNotificationSelection(n.id);
                      }}
                    />
                  </div>
                  {!n.readStatus && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(n.id);
                      }}
                      title="Mark as Read"
                    >
                      <i className="bi bi-check-circle"></i>
                    </button>
                  )}
                </div>
                <h6 className="fw-semibold text-dark">{n.title}</h6>
                <p className="text-muted mb-3 small">{n.message}</p>
                <div className="d-flex justify-content-between align-items-center border-top pt-2">
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                  <span className={`badge ${n.readStatus ? "bg-secondary" : "bg-primary"}`}>
                    {n.readStatus ? "Read" : "Unread"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Selection Bar */}
      {selectedNotifications.size > 0 && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3">
          <div className="bg-primary text-white rounded-pill px-4 py-2 shadow-lg">
            <div className="d-flex align-items-center gap-3">
              <span>
                <i className="bi bi-check2-circle me-2"></i>
                {selectedNotifications.size} selected
              </span>
              <button className="btn btn-light btn-sm" onClick={markMultipleAsRead}>
                Mark as Read
              </button>
              <button className="btn btn-outline-light btn-sm" onClick={() => setSelectedNotifications(new Set())}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
<style>{`
/* =====================================================
   🌌 HRNotification.jsx - Full Dark Glass Theme
   Matches HRDashboard, HRClaims, HREmployees & HRFraud
===================================================== */

/* ----------------------------
   Container text default
----------------------------- */
.container-fluid {
  color: #e5e7eb !important;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ----------------------------
   Page headers
----------------------------- */
h1, h2, h3, h4, h5, h6, strong {
  color: #f8fafc !important;
  font-weight: 600;
}

p, span, small, ul, li {
  color: #c7d2fe !important;
}

/* ----------------------------
   Notification Cards
----------------------------- */
.card {
  background: rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(20px) !important;
  border-radius: 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: #e5e7eb !important;
}

.card h6 {
  color: #f8fafc !important;
}

.card p, .card small {
  color: #c7d2fe !important;
}

/* Hover and selection effects */
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important;
}

.border-warning { border-color: rgba(255,193,7,.5) !important; }
.border-primary { border-color: rgba(13,110,253,.5) !important; }

/* ----------------------------
   Badges
----------------------------- */
.badge,
.badge.bg-primary,
.badge.bg-secondary,
.badge.bg-success,
.badge.bg-warning,
.badge.bg-danger {
  background: rgba(255,255,255,.15) !important;
  color: #fff !important;
  border-radius: 12px;
}

.badge.bg-primary { background-color: rgba(13,110,253,.2) !important; color: #0d6efd !important; }
.badge.bg-secondary { background-color: rgba(108,117,125,.2) !important; color: #6c757d !important; }
.badge.bg-success { background-color: rgba(25,135,84,.2) !important; color: #198754 !important; }
.badge.bg-warning { background-color: rgba(255,193,7,.2) !important; color: #ffc107 !important; }
.badge.bg-danger { background-color: rgba(220,53,69,.2) !important; color: #dc3545 !important; }

/* ----------------------------
   Form Inputs (Checkboxes, Radio Buttons)
----------------------------- */
.form-check-input {
  background-color: rgba(255,255,255,.08) !important;
  border: 1px solid rgba(255,255,255,.12) !important;
}

/* ----------------------------
   Buttons
----------------------------- */
.btn-primary,
.btn-success,
.btn-warning,
.btn-outline-primary,
.btn-outline-success,
.btn-outline-warning,
.btn-outline-light,
.btn-light {
  border-radius: 14px;
}

/* Floating selection bar */
.position-fixed {
  background: rgba(13,110,253,.1) !important;
  backdrop-filter: blur(15px);
  border-radius: 50px;
  color: #f8fafc !important;
}

.position-fixed button.btn-light {
  color: #0d6efd !important;
  background: rgba(255,255,255,.1) !important;
  border: 1px solid rgba(255,255,255,.12);
}

/* ----------------------------
   Misc
----------------------------- */
.transition-all { transition: all 0.2s ease-in-out; }
.cursor-pointer { cursor: pointer; }
// .hr update.
`}</style>

    </div>
  );
}
