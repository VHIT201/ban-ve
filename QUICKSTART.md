# 🚀 Quick Start - Next.js Migration

## Bước 1: Cài đặt dependencies

\`\`\`bash
pnpm install

# hoặc

npm install
\`\`\`

## Bước 2: Tạo file .env.local

\`\`\`bash
cp .env.example .env.local
\`\`\`

Cập nhật các giá trị trong \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:5000
JWT_SECRET=your-development-secret-key
\`\`\`

## Bước 3: Chạy development server

\`\`\`bash
pnpm dev
\`\`\`

Truy cập: http://localhost:5000

## 🎯 Routes mới

### Public Routes (Không cần đăng nhập)

- \`/\` - Trang chủ
- \`/detail/[id]\` - Chi tiết nội dung
- \`/collections\` - Bộ sưu tập
- \`/search\` - Tìm kiếm
- \`/terms\` - Điều khoản
- \`/privacy\` - Chính sách bảo mật
- \`/contact\` - Liên hệ

### Auth Routes

- \`/auth/login\` - Đăng nhập
- \`/auth/register\` - Đăng ký

### Protected Routes (Yêu cầu đăng nhập)

- \`/payment\` - Thanh toán
- \`/downloads\` - Tải xuống
- \`/profile/\*\` - Trang cá nhân

### Admin Routes (Yêu cầu quyền admin)

- \`/admin\` - Dashboard
- \`/admin/categories\` - Quản lý danh mục
- \`/admin/contents\` - Quản lý nội dung

## 🔑 Tài khoản test

Sử dụng tài khoản trong API backend của bạn để test.

## 📦 Scripts quan trọng

\`\`\`bash
pnpm dev # Development với Next.js
pnpm build # Build production
pnpm start # Run production
pnpm lint # Lint code
pnpm g:api # Generate API types
\`\`\`

## ⚡ Performance Features

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Automatic Code Splitting
- ✅ Image Optimization
- ✅ Font Optimization

## 🛡️ Security Features

- ✅ HTTP-only cookies cho JWT
- ✅ CSRF protection
- ✅ Middleware-based auth
- ✅ Role-based access control
- ✅ Automatic token refresh

## 📝 Important Files

- \`src/middleware.ts\` - Route protection & auth
- \`src/actions/auth.ts\` - Server Actions for auth
- \`src/lib/auth/session.ts\` - Session management
- \`src/app/layout.tsx\` - Root layout with SEO
- \`next.config.js\` - Next.js configuration

## 🔧 Customization

### Thay đổi port

Edit \`package.json\`:
\`\`\`json
"dev": "next dev -p 3000"
\`\`\`

### Thêm metadata cho page mới

\`\`\`tsx
export const metadata: Metadata = {
title: 'Page Title',
description: 'Page description',
};
\`\`\`

### Tạo protected page mới

Đặt trong folder \`src/app/(protected)/\`

### Tạo admin page mới

Đặt trong folder \`src/app/admin/\`

## 📖 Documentation

- Chi tiết migration: [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)
- Kế hoạch migration: [NEXTJS_MIGRATION_PLAN.md](./NEXTJS_MIGRATION_PLAN.md)

## 🆘 Support

Nếu gặp vấn đề, kiểm tra:

1. Node version >= 18.17
2. Dependencies đã cài đặt đầy đủ
3. File \`.env.local\` đã được tạo
4. Port 5000 không bị chiếm dụng

Happy coding! 🎉
