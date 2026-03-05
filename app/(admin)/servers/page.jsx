"use client";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faServer,
  faMicrochip,
  faMemory,
  faHardDrive,
  faCircle,
  faNetworkWired,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminServers() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);

  const fetchServers = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("https://fastpanel-api.tetrasco.com/servers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error(`Mã lỗi HTTP: ${response.status}`);

      const data = await response.json();
      
      // XỬ LÝ DATA TỪ MẢNG STRING SANG OBJECT
      const rawList = Array.isArray(data) ? data : (data?.data || []);
      const formattedServers = rawList.map((name, index) => ({
        id: `srv-${index}`,
        name: name,
        ip: `103.157.xxx.${10 + index}`, // Giả lập IP
        status: "online", 
        cpu: Math.floor(Math.random() * 30) + 5, // Random dummy data
        ram: Math.floor(Math.random() * 40) + 15,
        disk: Math.floor(Math.random() * 20) + 10,
      }));

      setServers(formattedServers);
    } catch (err) {
      setError(`Lỗi kết nối: ${err.message}`);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const handleReload = async () => {
    setIsRefreshing(true);
    try {
      await fetch("https://fastpanel-api.tetrasco.com/servers/reload/");
      await fetchServers();
    } catch (err) {
      setError(`Lỗi làm mới: ${err.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0 }}>Quản lý hạ tầng Server</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Dữ liệu trả về từ Nova Hosting</p>
        </div>
        <button onClick={handleReload} disabled={isRefreshing} style={buttonStyle(isRefreshing)}>
          <FontAwesomeIcon icon={faSyncAlt} spin={isRefreshing} />
          {isRefreshing ? "Đang quét..." : "Làm mới hệ thống"}
        </button>
      </div>

      {error && <div style={errorStyle}><FontAwesomeIcon icon={faExclamationTriangle} /> {error}</div>}

      {/* Grid */}
      <div style={gridStyle}>
        {servers.map((server) => (
          <div key={server.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={iconBoxStyle}><FontAwesomeIcon icon={faServer} color="#2563eb" /></div>
                <div>
                  <div style={{ fontWeight: "700" }}>{server.name}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{server.ip}</div>
                </div>
              </div>
              <StatusBadge status={server.status} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <ResourceItem icon={faMicrochip} label="CPU" value={server.cpu} color="#2563eb" />
              <ResourceItem icon={faMemory} label="RAM" value={server.ram} color="#f59e0b" />
              <ResourceItem icon={faHardDrive} label="Disk" value={server.disk} color="#64748b" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Sub-components & Styles ---

function StatusBadge({ status }) {
  const isOnline = status === "online";
  return (
    <span style={{
      fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "12px",
      background: isOnline ? "#dcfce7" : "#fee2e2", color: isOnline ? "#166534" : "#991b1b",
      height: "fit-content", display: "flex", alignItems: "center", gap: "5px"
    }}>
      <FontAwesomeIcon icon={faCircle} style={{ fontSize: "6px" }} /> {status.toUpperCase()}
    </span>
  );
}

function ResourceItem({ icon, label, value, color }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
        <span><FontAwesomeIcon icon={icon} width="14" /> {label}</span>
        <span style={{ fontWeight: "bold" }}>{value}%</span>
      </div>
      <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

// Styles
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" };
const cardStyle = { background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" };
const iconBoxStyle = { width: "35px", height: "35px", background: "#eff6ff", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" };
const errorStyle = { padding: "12px", background: "#fef2f2", color: "#dc2626", borderRadius: "8px", marginBottom: "20px", border: "1px solid #fee2e2" };
const buttonStyle = (loading) => ({ backgroundColor: loading ? "#cbd5e1" : "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" });