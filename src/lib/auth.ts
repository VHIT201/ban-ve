import React from 'react';

// Sample user data
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

// Tài khoản admin mẫu
const sampleAdmin: User = {
  id: 'admin-001',
  email: 'lenguyenhoang9.10@gmail.com',
  password: 'lehoang123', // Lưu ý: Trong ứng dụng thực tế cần mã hóa mật khẩu
  name: 'Lê Nguyễn Hoàng',
  role: 'admin',
  createdAt: new Date()
};

// Lưu trữ người dùng trong bộ nhớ (trong ứng dụng thực tế nên dùng database)
const users: User[] = [sampleAdmin];

// Trạng thái xác thực
let currentUser: User | null = null;

// Các hàm xác thực
export const authService = {
  // Đăng nhập
  login: (email: string, password: string): User | null => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  },

  // Đăng ký người dùng mới
  register: (name: string, email: string, password: string): User | null => {
    if (users.some(u => u.email === email)) {
      return null; // Email đã tồn tại
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // Trong ứng dụng thực tế nên mã hóa mật khẩu
      role: 'user',
      createdAt: new Date()
    };
    
    users.push(newUser);
    return newUser;
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: (): User | null => {
    if (!currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    }
    return currentUser;
  },

  // Kiểm tra có phải admin không
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  // Đăng xuất
  logout: (): void => {
    currentUser = null;
    localStorage.removeItem('currentUser');
  }
};

// Kiểu dữ liệu cho Auth Context
export type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

// Tạo Auth Context với giá trị mặc định là null
const AuthContext = React.createContext<AuthContextType | null>(null);

export { AuthContext };
