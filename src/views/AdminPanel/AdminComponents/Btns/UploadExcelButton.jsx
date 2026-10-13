import { useRef, useState } from "react";
import axiosClient from "../../../../axiosClient";
import Swal from "sweetalert2";

function ImportReportModal({ report, activeTab, setActiveTab, onClose }) {
  const tabs = [
    { key: "uploaded", label: `Uploaded (${report.uploaded.length})`, list: report.uploaded },
    { key: "updated", label: `Updated (${report.updated.length})`, list: report.updated },
    { key: "failed", label: `Failed (${report.failed.length})`, list: report.failed },
  ];

  const currentTab = tabs.find((t) => t.key === activeTab) || tabs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">Import Report</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-slate-400 hover:text-slate-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-[#5DAABA] text-[#5DAABA]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {currentTab.list.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No records found.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {currentTab.list.map((item, i) => (
                <li key={item.index ?? i} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {(item.index ?? i) + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {item.blog_title ||
                        item.title ||
                        item.name ||
                        item.banner_heading ||
                        item.heading ||
                        "—"}
                    </p>
                    {item.slug && (
                      <p className="truncate text-xs text-slate-400">{item.slug}</p>
                    )}
                    {item.reason && (
                      <p className="truncate text-xs text-red-500">{item.reason}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const UploadExcelButton = ({
  endpoint,
  buttonLabel = "Upload Excel",
  onImported,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("uploaded");
  const [loading, setLoading] = useState(false);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await axiosClient.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const reportData = response.data?.data || {};
      const failed = reportData?.failed || [];
      setReport({
        updated: reportData?.updated || [],
        uploaded: reportData?.inserted || [],
        failed,
      });
      setActiveTab("uploaded");
      onImported?.(reportData);
      if (failed.length === 0) {
        Swal.fire("Success", "Import completed successfully!", "success");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to import. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCloseReport = () => {
    const hasFailed = (report?.failed || []).length > 0;
    if (!hasFailed) {
      setReport(null);
      return;
    }
    Swal.fire({
      title: "Close Import Report?",
      html:
        "This is a one-time report and you will <b>not</b> be able to view these results again once this window is closed.<br/><br/>" +
        "If any records failed to import, please make a note of them so you can fix and re-upload them later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, close it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        setReport(null);
      }
    });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleImport}
        className="hidden"
      />
      <button
        type="button"
        disabled={loading}
        onClick={() => fileInputRef.current?.click()}
        className={`bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        } ${className}`}
      >
        {loading ? "Uploading..." : buttonLabel}
      </button>
      {report && (
        <ImportReportModal
          report={report}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={handleCloseReport}
        />
      )}
    </>
  );
};

export default UploadExcelButton;
