export const getRoleLabel = (role?: string) => {
  switch (role) {
    case "admin":
      return "Quản trị viên";
    case "user":
      return "Người dùng";
    case "collaborator":
      return "Cộng tác viên";
    default:
      return "Không xác định";
  }
};

export const getRoleVariant = (role?: string) => {
  switch (role) {
    case "admin":
      return "destructive";
    case "user":
      return "secondary";
    case "collaborator":
      return "secondary";
    default:
      return "outline";
  }
};
