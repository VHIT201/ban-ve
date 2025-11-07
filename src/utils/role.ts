export const getRoleLabel = (role?: string) => {
  switch (role) {
    case "admin":
      return "Quản trị viên";
    case "user":
      return "Người dùng";
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
    default:
      return "outline";
  }
};
