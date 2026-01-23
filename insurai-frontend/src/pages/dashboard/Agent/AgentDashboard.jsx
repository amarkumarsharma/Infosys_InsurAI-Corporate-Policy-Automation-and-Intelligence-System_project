import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Dashboard.css";
import axios from "axios";

import AgentQueries from "./AgentQueries";
import AgentClaims from "./AgentClaims";
import AgentAvailability from "./AgentAvailability";
import AgentReports from "./AgentReports";

export default function AgentDashboard() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("home");
  const [availability, setAvailability] = useState(false);

  const [employeeQueries, setEmployeeQueries] = useState([]);
  const [assistedClaims, setAssistedClaims] = useState([]);

  const [futureFrom, setFutureFrom] = useState("");
  const [futureTo, setFutureTo] = useState("");

  const [agentId, setAgentId] = useState(null);
  const [agentName, setAgentName] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAgentId = localStorage.getItem("agentId");
    const storedAgentName = localStorage.getItem("agentName");

    if (!token || !storedAgentId) {
      alert("Session expired. Login again.");
      navigate("/agent/login");
      return;
    }

    const id = parseInt(storedAgentId);
    setAgentId(id);
    setAgentName(storedAgentName);

    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // 1. Fetch availability
    axios
      .get(`http://localhost:8080/agent/${id}/availability`, axiosConfig)
      .then(res => {
        if (res.data && typeof res.data.available === "boolean") {
          setAvailability(res.data.available);
        }
      })
      .catch(err => console.error("Availability fetch failed:", err));

    // 2. Fetch queries
    axios
      .get(`http://localhost:8080/agent/queries/all/${id}`, axiosConfig)
      .then(res => {
        const allQueries = res.data.map(q => ({
          id: q.id,
          employeeId: q.employeeId,
          employee: q.employeeName || `Employee ${q.employeeId}`,
          query: q.queryText,
          policyName: q.policyName || "-",
          claimType: q.claimType || "-",
          createdAt: q.createdAt,
          updatedAt: q.updatedAt,
          status: q.status === "resolved" ? "Resolved" : "Pending",
          response: q.response || "",
        }));

        setEmployeeQueries(allQueries);

        const resolvedClaims = allQueries
          .filter(q => q.status === "Resolved")
          .map(q => ({
            id: q.id,
            employee: q.employee,
            type: q.claimType,
            policyName: q.policyName,
            date: q.updatedAt,
            status: "Approved"
          }));

        setAssistedClaims(resolvedClaims);
      })
      .catch(err => console.error("Query fetch failed:", err));
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/agent/login");
  };

  // ================= AVAILABILITY =================
  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = !availability;

      await axios.put(
        `http://localhost:8080/agent/${agentId}/availability`,
        { available: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setAvailability(newStatus);
      alert(`You are now ${newStatus ? "Available" : "Unavailable"}`);
    } catch (err) {
      console.error("Availability update failed:", err);
      alert("Failed to update availability");
    }
  };

  const scheduleFutureAvailability = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/agent/${agentId}/availability/schedule`,
        {
          startTime: new Date(futureFrom).toISOString(),
          endTime: new Date(futureTo).toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Future availability scheduled.");
      setFutureFrom("");
      setFutureTo("");
    } catch (err) {
      console.error("Schedule failed:", err);
      alert("Failed to schedule availability");
    }
  };

  // ================= QUERY RESPONSE =================
  const respondToQuery = async (id, responseText) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/agent/queries/respond/${id}`,
        { response: responseText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmployeeQueries(prev =>
        prev.map(q =>
          q.id === id
            ? { ...q, response: responseText, status: "Resolved" }
            : q
        )
      );

      alert("Response sent successfully.");
    } catch (err) {
      console.error("Respond failed:", err);
      alert("Failed to respond.");
    }
  };

  const handleResponseChange = (id, value) => {
    setEmployeeQueries(prev =>
      prev.map(q => (q.id === id ? { ...q, response: value } : q))
    );
  };

  // ================= CONTENT SWITCH =================
  const renderContent = () => {
    switch (activeTab) {
      case "queries":
        return (
          <AgentQueries
            availability={availability}
            filter={filter}
            setFilter={setFilter}
            employeeQueries={employeeQueries}
            handleResponseChange={handleResponseChange}
            respondToQuery={respondToQuery}
            axios={axios}
            setEmployeeQueries={setEmployeeQueries}
          />
        );

      case "claims":
        return <AgentClaims assistedClaims={assistedClaims} />;

      case "availability":
        return (
          <AgentAvailability
            agentName={agentName}
            availability={availability}
            toggleAvailability={toggleAvailability}
            futureFrom={futureFrom}
            setFutureFrom={setFutureFrom}
            futureTo={futureTo}
            setFutureTo={setFutureTo}
            scheduleFutureAvailability={scheduleFutureAvailability}
          />
        );

      case "reports":
        return (
          <AgentReports
            assistedClaims={assistedClaims}
            employeeQueries={employeeQueries}
            agentData={{ agentId, agentName }}
          />
        );

      default:
        return (
          <h3 className="fw-bold">
            Welcome back, {agentName}
          </h3>
        );
    }
  };

  // ================= UI =================
  return (
    <div className="agent-dashboard">
      <header className="dashboard-header text-white p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>InsurAI Agent Portal</h4>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="d-flex">
        <aside className="dashboard-sidebar">
          {[
            { id: "home", label: "Dashboard" },
            { id: "queries", label: "Employee Queries" },
            { id: "claims", label: "Claims" },
            { id: "availability", label: "Availability" },
            { id: "reports", label: "Reports" }
          ].map(item => (
            <button
              key={item.id}
              className={`btn w-100 mb-2 ${
                activeTab === item.id ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <main className="p-4 flex-grow-1 bg-light">{renderContent()}</main>
      </div>
    </div>
  );
}
