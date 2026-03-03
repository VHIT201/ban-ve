# Refresh Token Best Practices Implementation

## 📋 Tổng quan

Đã implement refresh token theo best practices cho Next.js project với các tính năng sau:

## ✨ Các tính năng chính

### 1. **Token Utilities** (`src/utils/token.ts`)

Các hàm helper để làm việc với JWT tokens:

- `decodeToken()` - Decode JWT token
- `isTokenExpired()` - Kiểm tra token có expire không (với buffer time)
- `shouldRefreshToken()` - Kiểm tra có nên refresh token không
- `getTokenExpirationTime()` - Lấy thời gian expire
- `getTimeUntilExpiration()` - Tính thời gian còn lại
- `isValidTokenFormat()` - Validate format của token

### 2. **Improved Axios Interceptors** (`src/api/mutator/custom-instance.ts`)

#### Request Interceptor

- ✅ Tự động thêm Bearer token vào headers
- ✅ **Proactive refresh**: Tự động refresh token trước khi expire (5 phút)
- ✅ Skip auth cho public endpoints (login, register, etc.)
- ✅ Prevent multiple concurrent refresh requests

#### Response Interceptor

- ✅ Tự động xử lý 401 errors
- ✅ Queue mechanism cho failed requests
- ✅ Retry failed requests sau khi refresh thành công
- ✅ Auto logout và redirect khi refresh token fail
- ✅ Error handling cho các status codes khác (403, 429, 5xx)
- ✅ Prevent infinite retry loops

### 3. **Background Token Refresh Hook** (`src/hooks/use-token-refresh.ts`)

- ✅ Tự động check và refresh token mỗi 1 phút
- ✅ Refresh khi token còn < 5 phút
- ✅ Prevent concurrent refresh attempts
- ✅ Auto cleanup khi component unmount

### 4. **Token Refresh Provider** (`src/components/auth/TokenRefreshProvider.tsx`)

- ✅ Component để enable auto refresh cho toàn bộ app
- ✅ Đã tích hợp vào `Providers` component

## 🎯 Cách hoạt động

### Flow 1: Proactive Refresh (Khi gửi request)

```
User gửi request
    ↓
Request Interceptor check token
    ↓
Token sắp expire? (< 5 phút)
    ↓ YES
Refresh token trước khi gửi request
    ↓
Gửi request với token mới
```

### Flow 2: Background Refresh

```
User đã login
    ↓
TokenRefreshProvider active
    ↓
Mỗi 1 phút check token
    ↓
Token sắp expire? (< 5 phút)
    ↓ YES
Refresh token tự động
```

### Flow 3: Reactive Refresh (Khi nhận 401)

```
Request fail với 401
    ↓
Response Interceptor catch error
    ↓
Đang refresh? → YES → Add to queue
    ↓ NO
Refresh token
    ↓
Success? → YES → Retry failed requests
    ↓ NO
Logout user và redirect to login
```

## 🚀 Cấu hình và Tùy chỉnh

### Thay đổi thời gian refresh threshold

**File: `src/hooks/use-token-refresh.ts`**

```typescript
const REFRESH_CHECK_INTERVAL = 60 * 1000; // Check mỗi phút
const REFRESH_THRESHOLD_MINUTES = 5; // Refresh khi còn 5 phút
```

**File: `src/api/mutator/custom-instance.ts`**

```typescript
// Trong request interceptor
if (shouldRefreshToken(accessToken, 5)) {
  // 5 phút
  // ...
}
```

### Thêm public endpoints

**File: `src/api/mutator/custom-instance.ts`**

```typescript
const publicEndpoints = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/refresh-token",
  // Thêm endpoints khác ở đây
];
```

### Tùy chỉnh redirect URL sau khi logout

**File: `src/api/mutator/custom-instance.ts`**

```typescript
// Trong response interceptor
if (typeof window !== "undefined") {
  window.location.href = "/auth/login"; // Thay đổi URL này
}
```

## 📝 Best Practices được implement

### ✅ 1. Proactive Token Refresh

- Token được refresh **trước khi** expire
- Tránh tình trạng request fail do token expired

### ✅ 2. Queue Management

- Chỉ 1 refresh call tại một thời điểm
- Các requests khác đợi trong queue
- Tất cả requests được retry sau khi refresh thành công

### ✅ 3. Security

- Token được clear khi logout
- Auto redirect to login khi token invalid
- Không log sensitive data

### ✅ 4. Race Condition Prevention

- Sử dụng `isRefreshing` flag
- Sử dụng `refreshTokenPromise` để share promise
- Prevent multiple concurrent refresh calls

### ✅ 5. Error Handling

- Graceful handling cho các loại errors
- User-friendly error messages (tiếng Việt)
- Auto recovery khi có thể

### ✅ 6. Performance

- Background refresh không block UI
- Efficient token validation
- Minimal overhead

## 🧪 Testing

### Test manual:

1. **Test proactive refresh**
   - Login vào app
   - Đợi đến khi token gần expire (sửa threshold xuống 30s để test nhanh)
   - Gửi request → Token sẽ tự động refresh

2. **Test reactive refresh**
   - Login vào app
   - Manually set token expired trong store
   - Gửi request → Sẽ nhận 401 → Auto refresh → Retry request

3. **Test background refresh**
   - Login vào app
   - Giữ tab open
   - Sau vài phút token sẽ tự động refresh

4. **Test concurrent requests**
   - Gửi nhiều requests cùng lúc khi token expired
   - Tất cả requests sẽ đợi và retry sau khi refresh

## 📊 Token Lifecycle

```
Token mới được issue (60 phút validity)
    ↓
[0-55 phút] Normal operation
    ↓
[55 phút] Background check → Token sẽ được refresh
    ↓
New token (thêm 60 phút)
    ↓
Cycle lặp lại
```

## ⚠️ Lưu ý quan trọng

1. **Token expiration time**: Đảm bảo backend JWT có `exp` claim
2. **Refresh token rotation**: Backend nên return refresh token mới (optional)
3. **Token buffer time**: Mặc định 30s để tránh edge cases
4. **Public endpoints**: Thêm tất cả endpoints không cần auth vào danh sách
5. **Error messages**: Đã dùng tiếng Việt, có thể customize theo nhu cầu

## 🔧 Troubleshooting

### Token không tự động refresh?

- Check console logs để xem errors
- Verify token có `exp` claim
- Check `isSignedIn` flag trong store

### Infinite refresh loop?

- Check `_retry` flag hoạt động đúng
- Verify refresh token API không return 401

### Token bị clear unexpected?

- Check browser console để xem errors
- Verify refresh token còn valid
- Check network tab để xem response từ server

## 🎉 Kết quả

✅ Token tự động refresh trước khi expire  
✅ User experience mượt mà, không bị logout đột ngột  
✅ Xử lý concurrent requests hiệu quả  
✅ Security được đảm bảo  
✅ Code maintainable và scalable  
✅ Error handling comprehensive

## 📚 Files đã tạo/sửa đổi

### Files mới:

- `src/utils/token.ts` - Token utilities
- `src/hooks/use-token-refresh.ts` - Background refresh hook
- `src/components/auth/TokenRefreshProvider.tsx` - Provider component

### Files đã sửa đổi:

- `src/api/mutator/custom-instance.ts` - Improved interceptors
- `src/app/providers.tsx` - Added TokenRefreshProvider
- `src/hooks/index.ts` - Export new hook

## 🚀 Next Steps (Optional enhancements)

1. **Add retry với exponential backoff** cho network errors
2. **Add metrics/monitoring** để track refresh rate
3. **Add token refresh event** để notify other tabs (BroadcastChannel)
4. **Add refresh token rotation** tracking
5. **Add unit tests** cho token utilities
6. **Add E2E tests** cho refresh flow

---

Made with ❤️ for best practices in authentication
