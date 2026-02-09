// src/components/hr/HRClaims.jsx
import React, { useState, useMemo } from "react";

export default function HRClaims({
  pendingClaims,
  statusFilter,
  setStatusFilter,
  displayedClaims,
  mappedClaims,
  setMappedClaims,
  viewingClaim,
  openViewModal,
  closeViewModal,
  approveClaim,
  rejectClaim,
  downloadCSV,
  downloadPDF,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedClaims, setSelectedClaims] = useState(new Set());

  // Enhanced statistics
  const claimsStats = useMemo(() => {
    const total = pendingClaims.length;
    const pending = pendingClaims.filter(c => c.status === "Pending").length;
    const approved = pendingClaims.filter(c => c.status === "Approved").length;
    const rejected = pendingClaims.filter(c => c.status === "Rejected").length;
    const totalAmount = pendingClaims.reduce((sum, claim) => sum + (parseFloat(claim.amount) || 0), 0);
    const pendingAmount = pendingClaims
      .filter(c => c.status === "Pending")
      .reduce((sum, claim) => sum + (parseFloat(claim.amount) || 0), 0);

    return { total, pending, approved, rejected, totalAmount, pendingAmount };
  }, [pendingClaims]);

  // Filtered and sorted claims
  const enhancedClaims = useMemo(() => {
    let filtered = displayedClaims.filter(claim => {
      const matchesSearch = 
        claim.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.employeeIdDisplay?.toString().includes(searchTerm) ||
        claim.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policyName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'amount') {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else if (sortConfig.key === 'claimDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [displayedClaims, searchTerm, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Select/deselect all claims
  const toggleSelectAll = () => {
    if (selectedClaims.size === enhancedClaims.length) {
      setSelectedClaims(new Set());
    } else {
      setSelectedClaims(new Set(enhancedClaims.map(claim => claim.id)));
    }
  };

  // Toggle single claim selection
  const toggleClaimSelection = (claimId) => {
    setSelectedClaims(prev => {
      const newSet = new Set(prev);
      if (newSet.has(claimId)) {
        newSet.delete(claimId);
      } else {
        newSet.add(claimId);
      }
      return newSet;
    });
  };

  // Bulk actions
  const handleBulkApprove = () => {
    selectedClaims.forEach(claimId => {
      const claim = mappedClaims.find(c => c.id === claimId);
      if (claim && claim.status === "Pending") {
        approveClaim(claimId, claim.remarks || "");
      }
    });
    setSelectedClaims(new Set());
  };

  const handleBulkReject = () => {
    selectedClaims.forEach(claimId => {
      const claim = mappedClaims.find(c => c.id === claimId);
      if (claim && claim.status === "Pending") {
        rejectClaim(claimId, claim.remarks || "");
      }
    });
    setSelectedClaims(new Set());
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Sort indicator component
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    return sortConfig.direction === 'asc' ? 
      <i className="bi bi-arrow-up text-primary ms-1"></i> : 
      <i className="bi bi-arrow-down text-primary ms-1"></i>;
  };

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold text-dark mb-2">Claim Approval Management</h2>
              <p className="text-muted mb-0">Review and manage employee insurance claims</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success shadow-sm" onClick={downloadCSV}>
                <i className="bi bi-file-earmark-spreadsheet me-2"></i> Export CSV
              </button>
              <button className="btn btn-danger shadow-sm" onClick={downloadPDF}>
                <i className="bi bi-file-earmark-pdf me-2"></i> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="row mb-4">
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-primary bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-wallet2 text-primary fs-4 mb-2"></i>
              <h5 className="text-primary mb-1">{claimsStats.total}</h5>
              <small className="text-muted">Total Claims</small>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-warning bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-clock text-warning fs-4 mb-2"></i>
              <h5 className="text-warning mb-1">{claimsStats.pending}</h5>
              <small className="text-muted">Pending</small>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-success bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-check-circle text-success fs-4 mb-2"></i>
              <h5 className="text-success mb-1">{claimsStats.approved}</h5>
              <small className="text-muted">Approved</small>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-danger bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-x-circle text-danger fs-4 mb-2"></i>
              <h5 className="text-danger mb-1">{claimsStats.rejected}</h5>
              <small className="text-muted">Rejected</small>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-info bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-currency-rupee text-info fs-4 mb-2"></i>
              <h5 className="text-info mb-1">{formatCurrency(claimsStats.totalAmount)}</h5>
              <small className="text-muted">Total Amount</small>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-4 col-6 mb-3">
          <div className="card bg-secondary bg-opacity-10 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-hourglass-split text-secondary fs-4 mb-2"></i>
              <h5 className="text-secondary mb-1">{formatCurrency(claimsStats.pendingAmount)}</h5>
              <small className="text-muted">Pending Amount</small>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search claims..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Claims</option>
                <option value="Pending">Pending Only</option>
                <option value="Approved">Approved Only</option>
                <option value="Rejected">Rejected Only</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="col-md-3">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  disabled={selectedClaims.size === 0}
                  onClick={handleBulkApprove}
                >
                  <i className="bi bi-check-lg me-1"></i> Approve Selected
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={selectedClaims.size === 0}
                  onClick={handleBulkReject}
                >
                  <i className="bi bi-x-lg me-1"></i> Reject Selected
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100 btn-sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setSelectedClaims(new Set());
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

{/* Claims Table */}
<div className="card shadow-sm border-0">
  <div className="card-header bg-gradient-primary text-white border-0">
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="mb-0">
        <i className="bi bi-list-check me-2"></i>
        Claims Overview
      </h5>
      <span className="badge bg-light text-dark fs-6">
        {enhancedClaims.length} of {pendingClaims.length} claims
      </span>
    </div>
  </div>
  <div className="card-body p-0">
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: "40px" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={
                    selectedClaims.size === enhancedClaims.length &&
                    enhancedClaims.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </div>
            </th>
            <th
              onClick={() => handleSort("employeeName")}
              className="cursor-pointer"
            >
              Employee <SortIndicator columnKey="employeeName" />
            </th>
            <th
              onClick={() => handleSort("title")}
              className="cursor-pointer"
            >
              Claim Type <SortIndicator columnKey="title" />
            </th>
            <th
              onClick={() => handleSort("amount")}
              className="cursor-pointer text-end"
            >
              Amount <SortIndicator columnKey="amount" />
            </th>
            <th
              onClick={() => handleSort("claimDate")}
              className="cursor-pointer"
            >
              Date <SortIndicator columnKey="claimDate" />
            </th>
            <th>Status</th>
            <th>Policy</th>
            <th style={{ width: "100px" }}>Documents</th>
            <th style={{ width: "150px" }}>Remarks</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enhancedClaims.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center py-5">
                <i className="bi bi-inbox display-4 text-muted"></i>
                <p className="text-muted mt-3">
                  No claims found matching your criteria
                </p>
              </td>
            </tr>
          ) : (
            enhancedClaims.map((claim) => (
              <tr
                key={claim.id}
                className={
                  selectedClaims.has(claim.id) ? "table-active" : ""
                }
              >
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedClaims.has(claim.id)}
                      onChange={() => toggleClaimSelection(claim.id)}
                      disabled={claim.status !== "Pending"}
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <div className="fw-semibold">{claim.employeeName}</div>
                    <small className="text-muted">
                      ID: {claim.employeeIdDisplay}
                    </small>
                  </div>
                </td>
                <td>
                  <span className="badge bg-light text-dark">
                    {claim.title}
                  </span>
                </td>
                <td className="text-end fw-bold text-success">
                  {formatCurrency(claim.amount)}
                </td>
                <td>
                  <small className="text-muted">
                    {claim.claimDate?.split("T")[0]}
                  </small>
                </td>
                <td>
                  <span
                    className={`badge ${
                      claim.status === "Pending"
                        ? "bg-warning"
                        : claim.status === "Approved"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {claim.status}
                  </span>
                </td>
                <td>
                  <small
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "120px" }}
                    title={claim.policyName}
                  >
                    {claim.policyName}
                  </small>
                </td>
                <td>
                  {claim.documents?.length > 0 ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-paperclip"></i>{" "}
                        {claim.documents.length}
                      </button>
                      <ul className="dropdown-menu">
                        {claim.documents.map((doc, idx) => (
                          <li key={idx}>
                            <a
                              className="dropdown-item"
                              href={`https://insurai-backend-production.up.railway.app${doc}`}
                              target="_blank"
                            >
                              <i className="bi bi-download me-2"></i>{" "}
                              Document {idx + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td>
                  {claim.status === "Pending" && claim.canModify ? (
                    <>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Add remarks..."
                        value={claim.remarks || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMappedClaims((prev) =>
                            prev.map((c) =>
                              c.id === claim.id
                                ? { ...c, remarks: value }
                                : c
                            )
                          );
                        }}
                      />
                      {/* Validation message */}
                      {(!claim.remarks || claim.remarks.trim() === "") && (
                        <small className="text-danger">
                        </small>
                      )}
                    </>
                  ) : (
                    <span
                      className="small text-muted"
                      title={claim.remarks}
                    >
                      {claim.remarks || "-"}
                    </span>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openViewModal(claim)}
                      title="View details"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    {claim.status === "Pending" && claim.canModify && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => {
                            const latestRemarks =
                              mappedClaims.find(
                                (c) => c.id === claim.id
                              )?.remarks || "";
                            if (!latestRemarks.trim()) {
                              alert(
                                "Please enter a remark before approving."
                              );
                              return;
                            }
                            approveClaim(claim.id, latestRemarks);
                          }}
                          title="Approve claim"
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            const latestRemarks =
                              mappedClaims.find(
                                (c) => c.id === claim.id
                              )?.remarks || "";
                            if (!latestRemarks.trim()) {
                              alert(
                                "Please enter a remark before rejecting."
                              );
                              return;
                            }
                            rejectClaim(claim.id, latestRemarks);
                          }}
                          title="Reject claim"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


      {/* Enhanced View Claim Modal */}
      {viewingClaim && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-gradient-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-wallet2 me-2"></i>
                  Claim Details #{viewingClaim.id}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Employee Information</label>
                      <p className="mb-1">{viewingClaim.employeeName}</p>
                      <small className="text-muted">ID: {viewingClaim.employeeIdDisplay}</small>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Claim Type</label>
                      <p className="mb-0">{viewingClaim.title}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Amount</label>
                      <p className="mb-0 text-success fw-bold">{formatCurrency(viewingClaim.amount)}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Policy</label>
                      <p className="mb-0">{viewingClaim.policyName}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Status</label>
                      <p className="mb-0">
                        <span className={`badge ${
                          viewingClaim.status === "Pending" ? "bg-warning" :
                          viewingClaim.status === "Approved" ? "bg-success" : "bg-danger"
                        }`}>
                          {viewingClaim.status}
                        </span>
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold text-muted">Submitted Date</label>
                      <p className="mb-0">{viewingClaim.claimDate?.split("T")[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-semibold text-muted">Description</label>
                  <div className="border rounded p-3 bg-light">
                    <p className="mb-0" style={{whiteSpace: 'pre-wrap'}}>{viewingClaim.description}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-semibold text-muted">Remarks</label>
                  <p className="mb-0">{viewingClaim.remarks || <span className="text-muted">No remarks</span>}</p>
                </div>

                <div>
                  <label className="fw-semibold text-muted">Supporting Documents</label>
                  {viewingClaim.documents?.length > 0 ? (
                    <div className="list-group">
                      {viewingClaim.documents.map((doc, idx) => (
                        <a key={idx} href={`https://insurai-backend-production.up.railway.app${doc}`} target="_blank" 
                           className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                          <span>
                            <i className="bi bi-file-earmark me-2"></i>
                            Document {idx + 1}
                          </span>
                          <i className="bi bi-download text-primary"></i>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">No documents uploaded</p>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeViewModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{<style>{`
/* =====================================================
   🌌 HRClaims.jsx - Full Dark Glass Theme
   Matches HRDashboard glassmorphic style
===================================================== */

/* ----------------------------
   Container text default
----------------------------- */
.hr-dashboard, .container-fluid {
  color: #e5e7eb !important;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ----------------------------
   Headers & Titles
----------------------------- */
.hr-dashboard h1, .hr-dashboard h2, .hr-dashboard h3,
.hr-dashboard h4, .hr-dashboard h5, .hr-dashboard h6,
.hr-dashboard strong {
  color: #f8fafc !important;
  font-weight: 600;
}

/* Paragraphs and small text */
.hr-dashboard p, .hr-dashboard span, .hr-dashboard small {
  color: #c7d2fe !important;
}

/* ----------------------------
   Glass Cards (KPI, Tables, Controls)
----------------------------- */
.hr-dashboard .card {
  background: rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(20px) !important;
  border-radius: 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: #e5e7eb !important;
}

/* Card headers */
.hr-dashboard .card .card-header {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #f8fafc !important;
}

/* Card body */
.hr-dashboard .card .card-body {
  background: transparent !important;
  color: #c7d2fe !important;
}

/* ----------------------------
   KPI Cards (top statistics)
----------------------------- */
.hr-dashboard .card.bg-primary, 
.hr-dashboard .card.bg-success,
.hr-dashboard .card.bg-warning,
.hr-dashboard .card.bg-danger,
.hr-dashboard .card.bg-info,
.hr-dashboard .card.bg-secondary {
  background: linear-gradient(
    135deg,
    rgba(99,102,241,.25),
    rgba(34,211,238,.18)
  ) !important;
  color: #f8fafc !important;
  box-shadow: 0 20px 55px rgba(0,0,0,.5);
}

/* KPI icons & numbers */
.hr-dashboard .card .text-primary,
.hr-dashboard .card .text-success,
.hr-dashboard .card .text-warning,
.hr-dashboard .card .text-danger,
.hr-dashboard .card .text-info,
.hr-dashboard .card .text-secondary {
  color: #f8fafc !important;
}

/* ----------------------------
   Tables inside cards
----------------------------- */
.hr-dashboard table,
.hr-dashboard thead,
.hr-dashboard tbody,
.hr-dashboard tr,
.hr-dashboard th,
.hr-dashboard td {
  background: transparent !important;
  color: #e5e7eb !important;
  border-color: rgba(255,255,255,.12) !important;
}

.hr-dashboard thead.table-light th {
  background: rgba(255,255,255,.08) !important;
  color: #f8fafc !important;
}

/* Hover effect for table rows */
.hr-dashboard table tbody tr:hover {
  background: rgba(255,255,255,.12) !important;
}

/* ----------------------------
   Badges
----------------------------- */
.hr-dashboard .badge,
.hr-dashboard .badge.bg-light,
.hr-dashboard .badge.bg-success,
.hr-dashboard .badge.bg-warning,
.hr-dashboard .badge.bg-danger,
.hr-dashboard .badge.bg-secondary,
.hr-dashboard .badge.bg-info {
  background: rgba(255,255,255,.15) !important;
  color: #fff !important;
  border-radius: 12px;
}

/* Specific status badges */
.hr-dashboard .badge.bg-success { background-color: rgba(34,197,94,.2) !important; color: #16a34a !important; }
.hr-dashboard .badge.bg-warning { background-color: rgba(234,179,8,.2) !important; color: #ca8a04 !important; }
.hr-dashboard .badge.bg-danger { background-color: rgba(239,68,68,.2) !important; color: #b91c1c !important; }

/* ----------------------------
   Alerts inside cards or modals
----------------------------- */
.hr-dashboard .alert,
.hr-dashboard .alert-light,
.hr-dashboard .alert-secondary,
.hr-dashboard .alert-warning,
.hr-dashboard .alert-danger,
.hr-dashboard .alert-success {
  background: rgba(255,255,255,.08) !important;
  color: #f8fafc !important;
  border: 1px solid rgba(255,255,255,.12) !important;
}

/* ----------------------------
   Recent Claims List Group
----------------------------- */
.hr-dashboard .list-group,
.hr-dashboard .list-group-item {
  background: rgba(255,255,255,.08) !important;
  color: #e5e7eb !important;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 14px;
  margin-bottom: 8px;
  backdrop-filter: blur(14px);
}

.hr-dashboard .list-group-item:hover {
  background: rgba(255,255,255,.12) !important;
  transform: translateY(-2px);
  transition: all .25s ease;
}

.hr-dashboard .list-group-item h6,
.hr-dashboard .list-group-item strong {
  color: #f8fafc !important;
}

.hr-dashboard .list-group-item small,
.hr-dashboard .list-group-item span,
.hr-dashboard .list-group-item p {
  color: #c7d2fe !important;
}

/* ----------------------------
   Modals
----------------------------- */
.hr-dashboard .modal-content {
  background: rgba(255,255,255,.06) !important;
  backdrop-filter: blur(20px) !important;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,.18);
  color: #e5e7eb !important;
}

.hr-dashboard .modal-header,
.hr-dashboard .modal-footer {
  background: rgba(255,255,255,.08) !important;
  color: #f8fafc !important;
  border-bottom: 1px solid rgba(255,255,255,.12);
}

.hr-dashboard .modal-body {
  background: transparent !important;
  color: #c7d2fe !important;
}

/* ----------------------------
   Buttons
----------------------------- */
.hr-dashboard .btn-primary,
.hr-dashboard .btn-success,
.hr-dashboard .btn-warning,
.hr-dashboard .btn-danger,
.hr-dashboard .btn-info,
.hr-dashboard .btn-secondary,
.hr-dashboard .btn-outline-primary,
.hr-dashboard .btn-outline-success,
.hr-dashboard .btn-outline-warning,
.hr-dashboard .btn-outline-danger,
.hr-dashboard .btn-outline-secondary,
.hr-dashboard .btn-outline-info {
  border-radius: 14px;
}

/* ----------------------------
   Form Inputs
----------------------------- */
.hr-dashboard .form-control,
.hr-dashboard .form-select,
.hr-dashboard .input-group-text {
  background: rgba(255,255,255,.08) !important;
  color: #e5e7eb !important;
  border: 1px solid rgba(255,255,255,.12) !important;
}

/* ----------------------------
   Table active / selected row
----------------------------- */
.hr-dashboard .table-active {
  background-color: rgba(0,123,255,0.1) !important;
}

/* ----------------------------
   Misc utility
----------------------------- */
.hr-dashboard .cursor-pointer {
  cursor: pointer;
}
// .hr update.
`}</style>
}</style>
    </div>
  );
}