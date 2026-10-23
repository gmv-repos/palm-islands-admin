import * as XLSX from "xlsx";

export const downloadExcelHeaders = ({ headers, filename }) => {
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  ws["!cols"] = headers.map(() => ({ wch: 22 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, filename);
};

export const exportToExcel = ({ data, filename, columns }) => {
  if (!data || data.length === 0) return false;

  const rows = data.map((row) =>
    columns.map((col) => {
      const value = col.get ? col.get(row) : row[col.key];
      return value === null || value === undefined ? "" : value;
    })
  );

  const ws = XLSX.utils.aoa_to_sheet([columns.map((col) => col.label), ...rows]);
  ws["!cols"] = columns.map((col) => ({ wch: col.width || 22 }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, filename);
  return true;
};

export const exportToCSV = ({ data, filename, columns }) => {
  if (!data || data.length === 0) return;

  const headers = columns.map((col) => col.label);

  const escapeCell = (value) => {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = data.map((row) =>
    columns.map((col) => escapeCell(row[col.key])).join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
