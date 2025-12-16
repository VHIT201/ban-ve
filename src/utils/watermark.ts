/**
 * Tạo watermark cho ảnh trước khi upload
 * @param file File ảnh cần thêm watermark
 * @param watermarkText Nội dung watermark (mặc định: 'Bản quyền thuộc về BanVe')
 * @returns Promise<File> Trả về file ảnh đã được thêm watermark
 */
export const addWatermarkToImage = async (
  file: File,
  watermarkText: string = 'Bản quyền thuộc về BanVe'
): Promise<File> => {
  // Chỉ xử lý file ảnh
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Tạo canvas mới với kích thước bằng ảnh gốc
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Không thể tạo canvas context'));
          return;
        }
        
        // Vẽ ảnh gốc lên canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Cài đặt style cho watermark
        ctx.font = `${Math.max(20, img.width / 20)}px Arial`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Thêm hiệu ứng đổ bóng cho chữ
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        
        // Vẽ watermark ở giữa ảnh
        const x = img.width / 2;
        const y = img.height / 2;
        
        // Vẽ watermark với góc nghiêng 45 độ
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 4);
        
        // Chỉ vẽ 1 watermark ở giữa ảnh
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(watermarkText, 0, 0);
        
        ctx.restore();
        
        // Chuyển canvas thành blob và tạo file mới
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Không thể tạo ảnh mới'));
            return;
          }
          
          // Tạo file mới từ blob
          const watermarkedFile = new File(
            [blob],
            `watermarked_${file.name}`,
            { type: file.type }
          );
          
          resolve(watermarkedFile);
        }, file.type);
      };
      
      img.onerror = () => {
        reject(new Error('Lỗi khi tải ảnh'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Lỗi khi đọc file'));
    };
    
    // Bắt đầu đọc file
    reader.readAsDataURL(file);
  });
};
