# 🔧 Hướng dẫn Debug OG:Image cho Zalo

## ✅ Đã sửa những gì?

### 1. **Sử dụng đúng mediaDomain cho ảnh**

- ❌ Trước: Dùng `NEXT_PUBLIC_APP_URL` → có thể là localhost hoặc wrong domain
- ✅ Sau: Dùng `baseConfig.mediaDomain` → `https://giangvien.org/gateway/ban-ve`

### 2. **Thêm các thẻ meta bắt buộc cho Zalo**

```tsx
{
  url: imageUrl,
  width: 1200,
  height: 630,
  alt: title,
  type: "image/png",           // ✅ Thêm image MIME type
  secureUrl: imageUrl,          // ✅ Thêm HTTPS URL (bắt buộc cho Zalo)
}
```

### 3. **Logic build URL ảnh chính xác**

- Kiểm tra nếu ảnh đã là HTTP URL → giữ nguyên
- Nếu path bắt đầu với `/` → `mediaDomain + path`
- Nếu không có `/` → `mediaDomain + / + path`

---

## 🧪 Cách Test & Debug

### **Bước 1: Kiểm tra URL ảnh có accessible không**

```bash
# Mở trình duyệt và paste URL ảnh
https://giangvien.org/gateway/ban-ve/uploads/img-1770824955794-274700019.png

# Hoặc dùng curl
curl -I https://giangvien.org/gateway/ban-ve/uploads/img-1770824955794-274700019.png
```

**Kiểm tra:**

- ✅ HTTP Status: 200 OK
- ✅ Content-Type: image/png hoặc image/jpeg
- ✅ Content-Length: > 0
- ✅ Ảnh hiển thị được trong browser
- ✅ Không có CORS error

---

### **Bước 2: Kiểm tra Meta Tags**

#### A. View Page Source

```
1. Mở trang detail trên production
2. Right click → View Page Source (Ctrl+U)
3. Tìm các thẻ meta sau:
```

Cần có **đầy đủ các thẻ này**:

```html
<!-- Bắt buộc cho Zalo -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta
  property="og:image"
  content="https://giangvien.org/gateway/ban-ve/uploads/..."
/>
<meta
  property="og:image:secure_url"
  content="https://giangvien.org/gateway/ban-ve/uploads/..."
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:url" content="..." />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="BanVe" />
```

#### B. Dùng Facebook Debugger (hoạt động cho cả Zalo)

```
https://developers.facebook.com/tools/debug/

1. Nhập URL trang detail của bạn
2. Click "Debug"
3. Xem phần "Open Graph Object Debugger"
4. Kiểm tra image có load được không
```

---

### **Bước 3: Clear Cache Zalo**

Zalo **cache metadata rất lâu** (có thể 7-30 ngày). Sau khi sửa, bạn cần:

#### Option 1: Thêm query parameter (Nhanh nhất)

```
# Thay vì gửi:
https://your-domain.com/detail/123

# Gửi:
https://your-domain.com/detail/123?v=2
https://your-domain.com/detail/123?t=1234567890
```

#### Option 2: Clear cache bằng Facebook Debugger

```
1. Vào Facebook Debugger Tool
2. Nhập URL → Click "Debug"
3. Click nút "Scrape Again" nhiều lần
4. Đợi 1-2 phút
5. Test lại trên Zalo
```

---

## 🚨 Các vấn đề phổ biến

### ❌ **1. Ảnh không truy cập được (403/404)**

**Nguyên nhân:**

- Server block requests từ Zalo/Facebook crawlers
- URL sai hoặc file không tồn tại
- Cần authentication

**Giải pháp:**

```nginx
# Trong Nginx config
location /uploads/ {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, OPTIONS';
}
```

---

### ❌ **2. HTTPS required**

**Nguyên nhân:** Zalo chỉ chấp nhận HTTPS URLs

**Kiểm tra:**

```bash
# URL phải bắt đầu bằng https://
✅ https://giangvien.org/gateway/ban-ve/uploads/img.png
❌ http://giangvien.org/gateway/ban-ve/uploads/img.png
```

---

### ❌ **3. Kích thước ảnh không phù hợp**

**Yêu cầu của Zalo:**

- ✅ Tối thiểu: 200x200px
- ✅ Khuyến nghị: 1200x630px (ratio 1.91:1)
- ✅ Dung lượng: < 8MB
- ✅ Format: JPG, PNG

**Kiểm tra:**

```bash
# Dùng ImageMagick
identify image.png
# Output: image.png PNG 1200x630 8-bit sRGB 456KB
```

---

### ❌ **4. Content-Type sai**

**Nguyên nhân:** Server trả về `Content-Type: text/html` thay vì `image/png`

**Test:**

```bash
curl -I https://giangvien.org/gateway/ban-ve/uploads/img.png | grep content-type

# Phải trả về:
✅ content-type: image/png
❌ content-type: text/html
```

---

## 📋 Checklist trước khi test

- [ ] Build production: `pnpm build`
- [ ] Deploy lên server/Vercel
- [ ] Test URL ảnh trong browser (phải hiển thị được)
- [ ] View Page Source → kiểm tra các thẻ og:image
- [ ] Dùng Facebook Debugger → xem ảnh có load không
- [ ] Thêm query param `?v=2` vào URL khi gửi Zalo
- [ ] Đợi 1-2 phút để Zalo fetch metadata
- [ ] Test bằng cách gửi link trong Zalo chat

---

## 🛠️ Debug Tools

### 1. **Facebook Open Graph Debugger**

```
https://developers.facebook.com/tools/debug/
```

- Xem metadata được parse như thế nào
- Clear cache và re-scrape
- Xem errors nếu có

### 2. **Twitter Card Validator**

```
https://cards-dev.twitter.com/validator
```

- Kiểm tra Twitter Card (tương tự OG)
- Preview cách hiển thị

### 3. **LinkedIn Post Inspector**

```
https://www.linkedin.com/post-inspector/
```

- Clear cache LinkedIn
- Test sharing

### 4. **OpenGraph.xyz**

```
https://www.opengraph.xyz/
```

- Tool đơn giản để preview OG tags

---

## 📞 Vẫn không được?

### Debug theo thứ tự:

1. **Test URL ảnh trực tiếp** → Phải mở được trong browser
2. **View Page Source** → Phải thấy các thẻ og:image
3. **Facebook Debugger** → Phải thấy ảnh preview
4. **Clear cache** → Dùng query parameter `?v=2`
5. **Đợi** → Đợi 2-5 phút để Zalo fetch lại
6. **Test** → Gửi link mới trong Zalo

### Nếu Facebook Debugger hiển thị OK nhưng Zalo vẫn không được:

- Đợi lâu hơn (30 phút - 1 giờ)
- Thử gửi từ Zalo Desktop app (không phải web)
- Thử gửi trong group chat khác
- Clear app cache của Zalo

---

## ✨ Expected Result

Sau khi sửa, khi gửi link detail vào Zalo, bạn sẽ thấy:

```
┌─────────────────────────────────┐
│  [Ảnh preview 1200x630]         │
│                                  │
├─────────────────────────────────┤
│  📄 Tiêu đề sản phẩm            │
│  💰 Giá: xxx VND                │
│  🔗 ban-ve.vn                   │
└─────────────────────────────────┘
```

**Good luck! 🚀**
