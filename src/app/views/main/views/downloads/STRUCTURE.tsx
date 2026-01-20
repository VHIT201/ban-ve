/**
 * COMPONENT STRUCTURE VISUALIZATION
 *
 * This file shows how all the components fit together.
 * Use this as a reference when building or modifying the page.
 */

/*
┌─────────────────────────────────────────────────────────────────────┐
│  DownloadPage (page.tsx or page-improved.tsx)                      │
│  - Main container component                                         │
│  - Handles routing and state management via useDownloadOrder hook   │
│  - Renders different states: loading, error, success                │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                ┌─────────────────┴─────────────────┐
                │                                   │
                ▼                                   ▼
┌───────────────────────────┐         ┌───────────────────────────┐
│  OrderInfoCard            │         │  Files Section            │
│  (components/)            │         │  (inline in page.tsx)     │
│                           │         │                           │
│  Props:                   │         │  Contains:                │
│  - order: Order           │         │  - Card wrapper           │
│                           │         │  - CardHeader             │
│  Displays:                │         │  - CardContent            │
│  ├─ Order Code            │         │    └─ FileItem[]          │
│  ├─ Purchase Date         │         │    └─ Download All Button │
│  ├─ Status Badge          │         │                           │
│  ├─ Total Amount          │         └───────────────────────────┘
│  ├─ Email                 │                       │
│  ├─ Payment Method        │         ┌─────────────┴──────────────┐
│  └─ Expiration Alert      │         │                            │
└───────────────────────────┘         ▼                            ▼
                          ┌─────────────────────┐   ┌─────────────────────┐
                          │  FileItem           │   │  FileItem           │
                          │  (components/)      │   │  (repeated)         │
                          │                     │   │                     │
                          │  Props:             │   │  Same structure     │
                          │  - fileName         │   │  for each file      │
                          │  - fileType         │   │                     │
                          │  - fileSize         │   │  User clicks        │
                          │  - fileUrl          │   │  Download button    │
                          │  - onDownload       │   │                     │
                          │  - isDownloading    │   │                     │
                          │                     │   │                     │
                          │  Displays:          │   │                     │
                          │  ├─ File Icon       │   │                     │
                          │  ├─ File Name       │   │                     │
                          │  ├─ File Type Badge │   │                     │
                          │  ├─ File Size       │   │                     │
                          │  └─ Download Button │   │                     │
                          └─────────────────────┘   └─────────────────────┘
                                      │
                                      │ onClick
                                      ▼
                          ┌─────────────────────┐
                          │  useDownloadOrder   │
                          │  (hooks/)           │
                          │                     │
                          │  Manages:           │
                          │  - Data fetching    │
                          │  - Download logic   │
                          │  - State validation │
                          │  - Error handling   │
                          │                     │
                          │  Returns:           │
                          │  - order            │
                          │  - files[]          │
                          │  - isLoading        │
                          │  - isExpired        │
                          │  - isNotFound       │
                          │  - downloadFile()   │
                          │  - downloadAllFiles│
                          └─────────────────────┘
                                      │
                                      │ uses
                                      ▼
                          ┌─────────────────────┐
                          │  API Endpoints      │
                          │  (generated)        │
                          │                     │
                          │  - useGetApiOrders  │
                          │    OrderId          │
                          │                     │
                          │  OR (recommended):  │
                          │  - useGetApiOrders  │
                          │    ByCode           │
                          └─────────────────────┘
*/

/**
 * DATA FLOW
 *
 * 1. User lands on page with ?orderCode=ABC123
 *    └─> useDownloadOrder hook extracts orderCode from URL
 *
 * 2. Hook fetches order data from API
 *    └─> useGetApiOrdersOrderId(orderCode)
 *    └─> Returns: order, isLoading, error
 *
 * 3. Hook validates order state
 *    ├─> isExpired: order.expiresAt < now
 *    ├─> isNotFound: !order || error
 *    ├─> isNotCompleted: order.status !== "completed"
 *    └─> hasNoFiles: !order.items.length
 *
 * 4. Hook transforms order.items → files[]
 *    └─> Extract file details from order items
 *
 * 5. Page renders appropriate state
 *    ├─> Loading: <Skeleton />
 *    ├─> Error: <Alert variant="destructive" />
 *    └─> Success: <OrderInfoCard /> + <FileItem />[]
 *
 * 6. User clicks download
 *    ├─> FileItem.onDownload()
 *    ├─> downloadFile(fileId)
 *    ├─> Create <a> element
 *    ├─> Set href = file.url
 *    ├─> Trigger click
 *    └─> File downloads
 */

/**
 * STATE DIAGRAM
 *
 *                    ┌──────────┐
 *                    │  Initial │
 *                    └────┬─────┘
 *                         │
 *              No orderCode?──────┐
 *                    │            │
 *                    │ Yes        │ No
 *                    ▼            ▼
 *            ┌───────────┐   ┌─────────┐
 *            │  Error    │   │ Loading │
 *            │  State    │   └────┬────┘
 *            └───────────┘        │
 *                              Fetch
 *                              Order
 *                                 │
 *                    ┌────────────┼────────────┐
 *                    │            │            │
 *                  Error       Success      Empty
 *                    │            │            │
 *                    ▼            ▼            ▼
 *            ┌─────────────┐ ┌──────────┐ ┌─────────┐
 *            │ Not Found   │ │ Validate │ │ No Data │
 *            │ Error State │ │  Order   │ │  Error  │
 *            └─────────────┘ └────┬─────┘ └─────────┘
 *                                 │
 *                    ┌────────────┼────────────┐
 *                    │            │            │
 *                 Expired     Pending      Completed
 *                    │            │            │
 *                    ▼            ▼            ▼
 *            ┌─────────────┐ ┌──────────┐ ┌─────────────┐
 *            │ Expired     │ │ Pending  │ │ Has Files?  │
 *            │ Error State │ │  State   │ └──────┬──────┘
 *            └─────────────┘ └──────────┘        │
 *                                        ┌───────┴────────┐
 *                                        │                │
 *                                       Yes               No
 *                                        │                │
 *                                        ▼                ▼
 *                                ┌──────────────┐  ┌──────────┐
 *                                │   Success    │  │ No Files │
 *                                │   Display    │  │  Error   │
 *                                │   Files      │  └──────────┘
 *                                └──────────────┘
 */

/**
 * RESPONSIVE BEHAVIOR
 *
 * Mobile (< 1024px):
 * ┌─────────────────┐
 * │ Order Info      │  ← Full width
 * ├─────────────────┤
 * │ File 1          │  ← Full width
 * ├─────────────────┤
 * │ File 2          │  ← Full width
 * ├─────────────────┤
 * │ Download All    │  ← Full width
 * └─────────────────┘
 *
 * Desktop (≥ 1024px):
 * ┌──────────┬─────────────────┐
 * │ Order    │ File 1          │
 * │ Info     ├─────────────────┤
 * │          │ File 2          │
 * │          ├─────────────────┤
 * │          │ Download All    │
 * └──────────┴─────────────────┘
 *   ← 1/3      ← 2/3 →
 */

/**
 * ERROR HANDLING HIERARCHY
 *
 * 1. No orderCode (URL parameter missing)
 *    └─> Show: "Missing Order Code" alert
 *    └─> User Action: Check email for correct link
 *
 * 2. Order not found (API error or 404)
 *    └─> Show: "Order Not Found" alert
 *    └─> User Action: Verify orderCode or contact support
 *
 * 3. Order expired (order.expiresAt < Date.now())
 *    └─> Show: "Download Link Expired" alert
 *    └─> User Action: Contact support for new link
 *
 * 4. Order not completed (order.status !== "completed")
 *    └─> Show: "Order Not Ready" alert
 *    └─> User Action: Wait for order completion
 *
 * 5. No files available (order.items.length === 0)
 *    └─> Show: "No Files Available" alert
 *    └─> User Action: Contact support
 *
 * 6. Success (all validations pass)
 *    └─> Show: Order info + Download files
 *    └─> User Action: Download files
 */

export const COMPONENT_STRUCTURE = `
This file is for documentation purposes only.
See the ASCII diagrams above for component architecture.
`;

// Example of how components are composed in the main page:

export const ExampleComposition = () => {
  /*
  <DownloadPage>
    {isLoading ? (
      <LoadingSkeleton />
    ) : hasError ? (
      <ErrorAlert type={errorType} />
    ) : (
      <SuccessLayout>
        <OrderInfoColumn>
          <OrderInfoCard order={order} />
        </OrderInfoColumn>
        
        <FilesColumn>
          <FilesCard>
            {files.map(file => (
              <FileItem
                key={file.id}
                {...file}
                onDownload={() => downloadFile(file.id)}
              />
            ))}
            {files.length > 1 && (
              <DownloadAllButton onClick={downloadAllFiles} />
            )}
          </FilesCard>
        </FilesColumn>
      </SuccessLayout>
    )}
  </DownloadPage>
  */
};

/**
 * CUSTOMIZATION POINTS
 *
 * To customize the page, you can modify:
 *
 * 1. Layout ratio (grid-cols-3 → grid-cols-2 for 50/50 split)
 * 2. Color scheme (change className variants)
 * 3. File icons (modify getFileIcon() function)
 * 4. Status badges (modify getStatusVariant() function)
 * 5. Date format (update formatDate() utility)
 * 6. Currency format (update formatCurrency() in OrderInfoCard)
 * 7. Download logic (implement in useDownloadOrder hook)
 * 8. Loading UI (customize Skeleton components)
 * 9. Error messages (update Alert descriptions)
 * 10. Support info (modify bottom Alert content)
 */

export default COMPONENT_STRUCTURE;
