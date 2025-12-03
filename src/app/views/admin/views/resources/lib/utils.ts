// Helper functions
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getFileIcon = (type: string) => {
  if (type.toLowerCase().includes("image")) return "🖼️";
  if (type.toLowerCase().includes("pdf")) return "📄";
  if (type.toLowerCase().includes("excel")) return "📊";
  return "📁";
};
