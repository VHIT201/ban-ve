# Collaborator Request Form

Form quản lý yêu cầu cộng tác viên với thông tin ngân hàng và tỷ lệ hoa hồng.

## Component: CollaboratorRequestForm

### Features

1. **4 Modes hỗ trợ:**

   - `create`: Tạo yêu cầu mới (user tự đăng ký)
   - `edit`: Chỉnh sửa thông tin
   - `review`: Admin review và phê duyệt/từ chối
   - `view`: Chỉ xem, không chỉnh sửa

2. **Form Fields:**

   - Bank Account: Số tài khoản (6-20 chữ số, chỉ số)
   - Bank Name: Select dropdown 26 ngân hàng Việt Nam
   - Commission Rate: Tỷ lệ hoa hồng 0-100% với preview calculator
   - Rejection Reason: Lý do từ chối (chỉ hiện ở review/view mode)

3. **Validation (Zod):**

   - Bank account: Regex `/^[0-9]{6,20}$/`
   - Bank name: Required
   - Commission rate: Number 0-100
   - Rejection reason: Optional string

4. **UI Features:**
   - Icons cho mỗi field (CreditCard, Building2, Percent)
   - Commission calculator với 2 ví dụ (1M, 5M)
   - Status badge với màu sắc (pending/approved/rejected)
   - User info card (review/view mode)
   - Approval info card (approved by, approved at)
   - Error alert với AlertCircle icon
   - Loading states với Loader2 spinner

### Props

```typescript
interface CollaboratorRequestFormProps {
  mode?: "create" | "edit" | "review" | "view";
  defaultValues?: Partial<CollaboratorRequestFormValues>;
  onSubmit: (values: CollaboratorRequestFormValues) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
  requestStatus?: "pending" | "approved" | "rejected";
  userInfo?: {
    username?: string;
    email?: string;
  };
  approvedBy?: {
    username?: string;
    email?: string;
  };
  approvedAt?: string;
}
```

### Usage Examples

#### 1. User tạo yêu cầu mới

```tsx
import { CollaboratorRequestForm } from "@/components/modules/collaborator";

const CreateCollaboratorRequest = () => {
  const createMutation = useMutation({
    mutationFn: (data: CollaboratorRequestFormValues) =>
      postApiCollaborators(data),
  });

  return (
    <CollaboratorRequestForm
      mode="create"
      onSubmit={createMutation.mutate}
      isLoading={createMutation.isPending}
      error={createMutation.error?.message}
    />
  );
};
```

#### 2. Admin review yêu cầu

```tsx
import { CollaboratorRequestForm } from "@/components/modules/collaborator";

const ReviewCollaboratorRequest = () => {
  const { id } = useParams();
  const { data: request } = useQuery({
    queryKey: ["collaborator-request", id],
    queryFn: () => getApiCollaboratorsId(id),
  });

  const approveMutation = useMutation({
    mutationFn: (data: CollaboratorRequestFormValues) =>
      putApiCollaboratorsIdApprove(id, data),
  });

  return (
    <div>
      <CollaboratorRequestForm
        mode="review"
        requestStatus={request?.status}
        userInfo={{
          username: request?.user?.username,
          email: request?.user?.email,
        }}
        defaultValues={{
          bankAccount: request?.bankAccount,
          bankName: request?.bankName,
          commissionRate: request?.commissionRate,
        }}
        onSubmit={approveMutation.mutate}
        isLoading={approveMutation.isPending}
      />

      {/* Action buttons for approve/reject */}
      <div className="flex gap-3 mt-6">
        <Button variant="destructive" onClick={handleReject}>
          Từ chối
        </Button>
        <Button onClick={handleApprove}>Phê duyệt</Button>
      </div>
    </div>
  );
};
```

#### 3. View yêu cầu đã xử lý

```tsx
<CollaboratorRequestForm
  mode="view"
  requestStatus={request?.status}
  userInfo={{
    username: request?.user?.username,
    email: request?.user?.email,
  }}
  approvedBy={request?.approvedBy}
  approvedAt={request?.approvedAt}
  defaultValues={{
    bankAccount: request?.bankAccount,
    bankName: request?.bankName,
    commissionRate: request?.commissionRate,
    rejectionReason: request?.rejectionReason,
  }}
  onSubmit={() => {}} // No submit in view mode
/>
```

### Vietnamese Banks List

Form bao gồm 26 ngân hàng Việt Nam:

- Vietcombank, VietinBank, BIDV, Agribank
- Techcombank, MB Bank, ACB, VPBank, TPBank
- Sacombank, HDBank, VIB, SHB, Eximbank
- MSB, OCB, SCB, SeABank, VietCapital Bank
- Bac A Bank, Nam A Bank, VietBank, LienViet Post Bank
- PVComBank, Cake, Timo, Ubank (digital banks)

### Commission Calculator

Real-time preview calculator hiển thị:

- Tỷ lệ hoa hồng hiện tại (%)
- Hoa hồng từ giao dịch 1,000,000₫
- Hoa hồng từ giao dịch 5,000,000₫

### Status Management

3 trạng thái với config riêng:

- `pending`: Yellow badge, AlertCircle icon
- `approved`: Green badge, CheckCircle2 icon
- `rejected`: Red badge, XCircle icon

### Validation Rules

- **bankAccount**: 6-20 digits, no special characters
- **bankName**: Required, select from list
- **commissionRate**: 0-100%, accepts decimals (step 0.1)
- **rejectionReason**: Optional, only required when rejecting

### Integration Notes

1. **API Endpoints cần có:**

   ```typescript
   POST /api/collaborators - Create new request
   GET /api/collaborators/:id - Get request detail
   PUT /api/collaborators/:id/approve - Approve request
   PUT /api/collaborators/:id/reject - Reject request
   PUT /api/collaborators/:id - Update request info
   ```

2. **Backend cần thêm collaborators tag vào Swagger** để Orval generate endpoints

3. **Permissions:**
   - User: Chỉ create và view own requests
   - Admin: Review, approve, reject tất cả requests

### Testing Checklist

- [ ] Create mode: Submit form với valid data
- [ ] Validation: Test invalid bank account (5 digits, letters)
- [ ] Validation: Test commission rate < 0 và > 100
- [ ] Calculator: Verify commission calculations (1M, 5M)
- [ ] Review mode: Approve với rejection reason empty
- [ ] Review mode: Reject với rejection reason filled
- [ ] View mode: Tất cả fields disabled
- [ ] Status badges: Pending/Approved/Rejected hiển thị đúng màu
- [ ] Loading states: Spinner hiển thị khi isLoading=true
- [ ] Error handling: Error alert hiển thị khi có lỗi
- [ ] Bank select: Dropdown scrollable với 26 ngân hàng
- [ ] User info card: Hiển thị username, email (review/view)
- [ ] Approval info: Hiển thị approvedBy, approvedAt (view)
