# Next.js Migration Plan - Enterprise-Grade Strategy

## Executive Summary

This document provides a comprehensive migration strategy for transitioning the existing ReactJS SPA (Vite-based) to Next.js 14+ using the App Router. The migration follows enterprise-grade standards with TypeScript strict mode, SEO optimization, and zero UI/UX changes.

**Project Context:**

- **Current Stack:** Vite + React 19 + React Router v7 + TanStack Query + Zustand
- **Target Stack:** Next.js 14+ (App Router) + React 19 + Server Actions + Zustand (client state only)
- **Authentication:** JWT-based with access/refresh tokens stored in Zustand
- **API Integration:** Orval-generated API client with Axios

---

## 1. Migration Strategy

### 1.1 Incremental Migration Approach (Recommended)

We'll use a **phased approach** to minimize risk and ensure backward compatibility:

#### Phase 1: Foundation Setup (Week 1)

- [ ] Set up Next.js project alongside existing Vite app
- [ ] Configure TypeScript strict mode
- [ ] Set up path aliases matching current structure (`@/*`)
- [ ] Configure Tailwind CSS v4 (matching current setup)
- [ ] Port shared utilities, types, and constants
- [ ] Set up environment variables and configuration

#### Phase 2: Static Pages Migration (Week 2)

- [ ] Migrate static/marketing pages first (lowest risk):
  - Terms of Service (`/terms`)
  - Privacy Policy (`/privacy`)
  - Cookie Policy (`/cookie-policy`)
  - Contact (`/contact`)
- [ ] Implement base layout with SEO metadata
- [ ] Verify styling and responsive behavior

#### Phase 3: Public Pages (Week 3)

- [ ] Home page (`/`)
- [ ] Collections page (`/collections`)
- [ ] Search page (`/search`)
- [ ] Detail page (`/detail/:id`)
- [ ] Implement server-side data fetching for SEO
- [ ] Add OpenGraph metadata per page

#### Phase 4: Authentication Flow (Week 4)

- [ ] Migrate auth routes (`/auth/*`)
- [ ] Implement middleware for route protection
- [ ] Set up cookie-based session management
- [ ] Migrate AuthGate logic to server components
- [ ] Implement protected route patterns

#### Phase 5: User Dashboard (Week 5)

- [ ] Profile pages (`/profile/*`)
- [ ] Downloads page (`/downloads`)
- [ ] Payment flow (`/payment`)
- [ ] Order management

#### Phase 6: Admin Panel (Week 6-7)

- [ ] Admin dashboard (`/admin/*`)
- [ ] Content management
- [ ] Category management
- [ ] Collaborator management
- [ ] Copyright management
- [ ] Payment administration

#### Phase 7: Testing & Optimization (Week 8)

- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] SEO validation
- [ ] Bundle size analysis
- [ ] Deployment preparation

### 1.2 Backward Compatibility Strategy

**Option A: Parallel Deployment** (Recommended for Zero Downtime)

```
Current:     app.banve.com (Vite SPA)
Migration:   next.banve.com (Next.js - testing)
Final:       app.banve.com (Next.js - after validation)
```

**Option B: Feature Flags**

- Use environment variables to toggle between old/new implementations
- Gradually roll out Next.js routes via routing rules

---

## 2. File & Folder Mapping

### 2.1 Directory Structure Comparison

#### Current Structure (Vite + React Router)

```
src/
├── app/
│   ├── layout.tsx              # Root layout wrapper
│   ├── views/
│   │   ├── main/              # Public routes
│   │   │   ├── layout.tsx
│   │   │   ├── lib/routes.tsx
│   │   │   └── views/
│   │   │       ├── home/
│   │   │       ├── detail/
│   │   │       ├── collections/
│   │   │       └── profile/
│   │   ├── auth/              # Auth routes
│   │   │   ├── layout.tsx
│   │   │   ├── lib/routes.tsx
│   │   │   └── views/
│   │   │       ├── login/
│   │   │       ├── register/
│   │   │       └── forgot/
│   │   └── admin/             # Admin routes
│   │       ├── layout.tsx
│   │       ├── lib/routes.tsx
│   │       └── views/
│   │           ├── dashboard/
│   │           ├── contents/
│   │           └── categories/
├── components/
│   ├── layouts/
│   ├── modules/
│   ├── shared/
│   └── ui/
├── contexts/
├── stores/
├── hooks/
├── lib/
└── utils/
```

#### Target Structure (Next.js App Router)

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout (Server Component)
│   ├── page.tsx               # Home page
│   ├── loading.tsx            # Loading UI
│   ├── error.tsx              # Error boundary
│   ├── not-found.tsx          # 404 page
│   │
│   ├── (public)/              # Route group for public pages
│   │   ├── layout.tsx         # Public layout
│   │   ├── detail/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── collections/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── auth/                  # Auth pages (redirect if logged in)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot/
│   │       └── page.tsx
│   │
│   ├── (protected)/           # Route group for authenticated users
│   │   ├── layout.tsx         # Protected layout (server auth check)
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   ├── personal/
│   │   │   ├── collaborator/
│   │   │   ├── history/
│   │   │   └── order/
│   │   ├── downloads/
│   │   │   └── page.tsx
│   │   ├── payment/
│   │   │   └── page.tsx
│   │   └── setting/
│   │       └── page.tsx
│   │
│   ├── admin/                 # Admin routes (admin role required)
│   │   ├── layout.tsx         # Admin layout with auth+role check
│   │   ├── page.tsx           # Dashboard
│   │   ├── categories/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   ├── contents/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   └── edit/[id]/
│   │   ├── collaborators/
│   │   ├── copy-right/
│   │   └── payments/
│   │
│   └── api/                   # API routes (if needed)
│       ├── auth/
│       │   └── [...nextauth]/
│       └── revalidate/
│
├── components/                 # NO CHANGE - Keep existing structure
│   ├── layouts/
│   ├── modules/
│   ├── shared/
│   └── ui/
│
├── lib/                        # Server-side utilities
│   ├── auth/
│   │   ├── session.ts         # Server session management
│   │   ├── middleware.ts      # Auth helpers
│   │   └── config.ts
│   ├── api/
│   │   ├── client.ts          # Server-side API client
│   │   └── fetchers.ts        # Server data fetching
│   └── metadata.ts            # SEO metadata generators
│
├── actions/                    # Server Actions
│   ├── auth.ts                # Login, register, logout
│   ├── content.ts             # Content CRUD operations
│   ├── cart.ts                # Cart operations
│   └── profile.ts             # Profile updates
│
├── middleware.ts              # Next.js middleware (auth, redirects)
│
├── stores/                     # Client-side state only
│   ├── use-cart-store.ts      # Keep for client-side cart
│   ├── use-ui-store.ts        # UI state (modals, sidebar)
│   └── use-optimistic-store.ts
│
├── hooks/                      # NO CHANGE - Keep existing hooks
├── utils/                      # NO CHANGE - Keep existing utils
├── types/                      # NO CHANGE - Keep existing types
└── api/                        # Keep Orval-generated code
    ├── endpoints/
    ├── models/
    └── types/
```

### 2.2 Detailed File Mapping Table

| Current File                                        | Next.js Location                        | Component Type   | Notes                                         |
| --------------------------------------------------- | --------------------------------------- | ---------------- | --------------------------------------------- |
| `src/app/layout.tsx`                                | `src/app/layout.tsx`                    | Server Component | Add metadata, fonts                           |
| `src/app/views/main/layout.tsx`                     | `src/app/(public)/layout.tsx`           | Server Component | Public pages wrapper                          |
| `src/app/views/main/views/home/page.tsx`            | `src/app/page.tsx`                      | Server Component | Fetch data server-side                        |
| `src/app/views/main/views/detail/page.tsx`          | `src/app/(public)/detail/[id]/page.tsx` | Server Component | Dynamic route, ISR                            |
| `src/app/views/main/views/collections/page.tsx`     | `src/app/(public)/collections/page.tsx` | Server Component | SSR with caching                              |
| `src/app/views/main/views/search/SearchResults.tsx` | `src/app/(public)/search/page.tsx`      | Client Component | Interactive search                            |
| `src/app/views/main/views/payment/page.tsx`         | `src/app/(protected)/payment/page.tsx`  | Client Component | Payment form                                  |
| `src/app/views/auth/views/login/page.tsx`           | `src/app/auth/login/page.tsx`           | Client Component | Form handling                                 |
| `src/app/views/auth/views/register/page.tsx`        | `src/app/auth/register/page.tsx`        | Client Component | Form handling                                 |
| `src/app/views/admin/layout.tsx`                    | `src/app/admin/layout.tsx`              | Server Component | Admin auth check                              |
| `src/app/views/admin/views/dashboard/page.tsx`      | `src/app/admin/page.tsx`                | Server Component | Server data fetch                             |
| `src/app/views/admin/views/contents/page.tsx`       | `src/app/admin/contents/page.tsx`       | Mixed            | Table SC + filters CC                         |
| `src/components/**/*`                               | `src/components/**/*`                   | Mixed            | Keep structure, add 'use client' where needed |
| `src/stores/use-auth-store.ts`                      | ❌ Remove                               | -                | Use server sessions + cookies                 |
| `src/contexts/AuthContext.tsx`                      | ❌ Remove                               | -                | Replace with server session                   |

---

## 3. Server vs Client Component Separation Rules

### 3.1 Decision Matrix

Use this flowchart to determine component type:

```
Does it need interactivity (onClick, onChange, useState, useEffect)?
├─ YES → Client Component
│   └─ Add "use client" directive
│
└─ NO → Does it fetch data?
    ├─ YES → Server Component (fetch in component or use async)
    │   └─ No "use client" directive
    │
    └─ NO → Is it a pure presentational component?
        ├─ YES → Server Component (default)
        └─ NO → Evaluate dependencies
```

### 3.2 Server Components (Default)

**When to use:**

- Layouts and page shells
- Static content rendering
- Data fetching from databases/APIs
- SEO-critical content
- Markdown/content rendering
- Access to environment variables
- Reduced JavaScript bundle

**Examples from your project:**

```tsx
// src/app/page.tsx - Home page (Server Component)
import { Main } from "@/components/layouts/Main";
import { BannerSection, CategoriesSection } from "./components";
import { fetchFeaturedContent } from "@/lib/api/content";

export default async function HomePage() {
  // Fetch data server-side
  const featured = await fetchFeaturedContent();

  return (
    <Main>
      <BannerSection />
      <CategoriesSection data={featured} />
    </Main>
  );
}

// src/app/(public)/detail/[id]/page.tsx
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const content = await fetchContentById(params.id);

  return <ContentDetail data={content} />;
}

// Metadata generation
export async function generateMetadata({ params }: { params: { id: string } }) {
  const content = await fetchContentById(params.id);

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
    },
  };
}
```

### 3.3 Client Components

**When to use:**

- Forms and inputs
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect, useRef)
- Browser APIs (localStorage, window, document)
- Third-party libraries requiring browser context
- Animations and interactions
- Client-side routing (useRouter, usePathname)

**Examples from your project:**

```tsx
// src/app/auth/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const form = useForm();

  const handleSubmit = async (data) => {
    await loginAction(data);
  };

  return <form onSubmit={form.handleSubmit(handleSubmit)}>...</form>;
}

// src/components/modules/content/ContentFilters.tsx
("use client");

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ContentFilters() {
  const [filters, setFilters] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Client-side filter logic
  return <div>...</div>;
}
```

### 3.4 Hybrid Pattern (Composition)

**Best Practice:** Nest Client Components inside Server Components

```tsx
// src/app/admin/contents/page.tsx (Server Component)
import { fetchContents } from "@/lib/api/content";
import { ContentTable } from "@/components/modules/content/ContentTable"; // Client
import { ContentFilters } from "@/components/modules/content/ContentFilters"; // Client

export default async function ContentsPage() {
  // Server-side data fetching
  const initialContents = await fetchContents();

  return (
    <div>
      <h1>Content Management</h1>
      {/* Client Component for filters */}
      <ContentFilters />
      {/* Client Component for interactive table */}
      <ContentTable initialData={initialContents} />
    </div>
  );
}
```

### 3.5 Component Migration Guide

| Current Component                    | Type      | Migration Strategy                             |
| ------------------------------------ | --------- | ---------------------------------------------- |
| `BannerSection`                      | Server    | Keep as Server Component (static content)      |
| `CategoriesSection`                  | Server    | Pass data as props, render server-side         |
| `TopSellingLists`                    | Server    | Fetch data in component, render server-side    |
| `DailyBestSeller`                    | Server    | Server Component with async data               |
| `SearchResults`                      | Client    | Needs 'use client' (search state, filters)     |
| `ContentFilters`                     | Client    | Needs 'use client' (form state)                |
| `ContentTable`                       | Client    | Needs 'use client' (sorting, pagination)       |
| `PaymentForm`                        | Client    | Needs 'use client' (form handling)             |
| `AuthGate`                           | ❌ Remove | Replace with middleware + server sessions      |
| `ScrollToTop`                        | Client    | Needs 'use client' (useEffect + router events) |
| UI Components (Button, Dialog, etc.) | Client    | Already have 'use client' (Radix UI)           |

### 3.6 Minimize Client Bundle Size

**Strategy:**

1. **Mark only leaf components as Client Components**

   ```tsx
   // ❌ Bad - entire tree becomes client
   "use client";
   export default function Page() {
     return (
       <Layout>
         <Sidebar />
         <Content />
       </Layout>
     );
   }

   // ✅ Good - only interactive parts are client
   export default function Page() {
     // Server Component
     return (
       <Layout>
         {" "}
         {/* Server */}
         <Sidebar /> {/* Server */}
         <InteractiveContent /> {/* 'use client' */}
       </Layout>
     );
   }
   ```

2. **Pass Server Components as children to Client Components**

   ```tsx
   // ClientWrapper.tsx
   'use client';
   export function ClientWrapper({ children }) {
     return <div onClick={...}>{children}</div>;
   }

   // page.tsx (Server Component)
   export default function Page() {
     return (
       <ClientWrapper>
         <ServerDataDisplay /> {/* Stays server-side! */}
       </ClientWrapper>
     );
   }
   ```

3. **Use React Context sparingly**
   - Replace global contexts with Server Components + props
   - Keep only UI-specific contexts (theme, modals)

---

## 4. Data Fetching Strategy

### 4.1 Server-Side Data Fetching (Primary)

#### 4.1.1 Pattern 1: Async Server Components

```tsx
// src/app/page.tsx
import { fetchFeaturedContent, fetchCategories } from "@/lib/api/content";

export default async function HomePage() {
  // Parallel data fetching
  const [featured, categories] = await Promise.all([
    fetchFeaturedContent(),
    fetchCategories(),
  ]);

  return (
    <Main>
      <CategoriesSection categories={categories} />
      <FeaturedSection content={featured} />
    </Main>
  );
}
```

#### 4.1.2 Pattern 2: Server Actions (Mutations)

```tsx
// src/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authApi } from "@/lib/api/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await authApi.login({ email, password });

    // Set HTTP-only cookie
    cookies().set("session", response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    cookies().set("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  } catch (error) {
    return { error: "Invalid credentials" };
  }

  redirect("/");
}

export async function logoutAction() {
  cookies().delete("session");
  cookies().delete("refreshToken");
  redirect("/auth/login");
}
```

#### 4.1.3 Server-Side API Client Setup

```tsx
// src/lib/api/client.ts
import { cookies } from "next/headers";
import axios from "axios";

export async function createServerApiClient() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("session")?.value;

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
}

// src/lib/api/content.ts
import { createServerApiClient } from "./client";

export async function fetchContentById(id: string) {
  const client = await createServerApiClient();
  const { data } = await client.get(`/content/${id}`);
  return data;
}

export async function fetchFeaturedContent() {
  const client = await createServerApiClient();
  const { data } = await client.get("/content/featured");
  return data;
}
```

#### 4.1.4 Caching and Revalidation

```tsx
// Static Generation with Revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour

export default async function CollectionsPage() {
  const collections = await fetchCollections();
  return <CollectionsList data={collections} />;
}

// On-Demand Revalidation
// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  }

  return Response.json({ revalidated: false });
}

// Tagged Caching
export async function fetchContentById(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/content/${id}`, {
    next: {
      tags: [`content-${id}`],
      revalidate: 3600,
    },
  });
  return res.json();
}

// Revalidate specific content
revalidateTag(`content-${id}`);
```

### 4.2 Client-Side Data Fetching

#### 4.2.1 When to Use Client Fetching

Use TanStack Query for:

- User-specific data after authentication
- Real-time updates (polling)
- Optimistic UI updates
- Infinite scroll / pagination
- Client-side filtering/sorting

#### 4.2.2 Client Query Setup

```tsx
// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// src/app/layout.tsx (Server Component)
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### 4.2.3 Client Component with TanStack Query

```tsx
// src/components/modules/content/UserContentList.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useGetApiContents } from "@/api/endpoints/content";

export function UserContentList() {
  const { data, isLoading } = useGetApiContents({
    query: {
      staleTime: 5 * 60 * 1000,
    },
  });

  if (isLoading) return <LoadingSkeleton />;

  return <ContentGrid items={data?.data} />;
}
```

#### 4.2.4 Mutations with Server Actions

```tsx
// src/components/modules/content/ContentCreateForm.tsx
"use client";

import { useTransition } from "react";
import { createContentAction } from "@/actions/content";

export function ContentCreateForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createContentAction(formData);
      if (result.success) {
        // Handle success
      }
    });
  };

  return (
    <form action={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

### 4.3 Data Fetching Migration Map

| Current Pattern              | Next.js Pattern                             | Use Case                    |
| ---------------------------- | ------------------------------------------- | --------------------------- |
| `useQuery` in page component | Async Server Component                      | Initial page load, SEO data |
| `useQuery` with filters      | Client Component + `useQuery`               | Interactive filtering       |
| `useMutation` for CRUD       | Server Action                               | Form submissions, mutations |
| Route loaders                | Async Server Component / `generateMetadata` | Pre-fetch data, metadata    |
| Context + useEffect          | Server Component props                      | Eliminate client context    |

---

## 5. Authentication & Protected Routes

### 5.1 Authentication Flow Design

#### Current Flow (JWT in Zustand):

```
Login → API → Access Token + Refresh Token → Zustand Store → LocalStorage
```

#### New Flow (HTTP-Only Cookies + Server Sessions):

```
Login → Server Action → API → Set HTTP-Only Cookies → Redirect
```

**Why the change?**

- ✅ More secure (XSS protection)
- ✅ Server Components can access auth state
- ✅ Automatic token refresh via middleware
- ✅ Better SEO (server-rendered protected content)

### 5.2 Session Management Implementation

#### Step 1: Create Auth Library

```tsx
// src/lib/auth/session.ts
import { cookies } from "next/headers";
import { cache } from "react";
import { jwtVerify } from "jose";

export interface SessionData {
  userId: string;
  email: string;
  role: "user" | "admin" | "collaborator";
  exp: number;
}

export const getSession = cache(async (): Promise<SessionData | null> => {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload as SessionData;
  } catch (error) {
    return null;
  }
});

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.role !== "admin") {
    redirect("/");
  }

  return session;
}
```

#### Step 2: Server Actions for Auth

```tsx
// src/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { postApiAuthLogin } from "@/api/endpoints/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAction(prevState: any, formData: FormData) {
  // Validate input
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Call API
    const response = await postApiAuthLogin({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    // Set cookies
    const cookieStore = cookies();

    cookieStore.set("session", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    cookieStore.set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (error) {
    return {
      message: "Invalid email or password",
    };
  }

  redirect("/");
}

export async function registerAction(prevState: any, formData: FormData) {
  // Similar implementation
}

export async function logoutAction() {
  cookies().delete("session");
  cookies().delete("refreshToken");
  redirect("/auth/login");
}
```

#### Step 3: Login Page

```tsx
// src/app/auth/login/page.tsx
"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <form action={formAction}>
      <div>
        <Input name="email" type="email" placeholder="Email" required />
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
      </div>

      {state?.message && <p className="text-red-500">{state.message}</p>}

      <Button type="submit">Login</Button>
    </form>
  );
}
```

### 5.3 Route Protection Strategy

#### Method 1: Middleware (Recommended)

```tsx
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/detail") ||
    pathname.startsWith("/collections") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/privacy");

  // Auth routes
  const isAuthRoute = pathname.startsWith("/auth");

  // Protected routes
  const isProtectedRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/downloads") ||
    pathname.startsWith("/payment");

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  const session = await getSession();

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to home if accessing auth routes with active session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin route protection
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

#### Method 2: Layout-Based Protection

```tsx
// src/app/(protected)/layout.tsx
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  // Additional user data fetch
  const userData = await fetchUserProfile(session.userId);

  return (
    <div>
      <UserSidebar user={userData} />
      <main>{children}</main>
    </div>
  );
}

// src/app/admin/layout.tsx
import { requireAdmin } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div>
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
```

### 5.4 Token Refresh Strategy

```tsx
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!session && refreshToken) {
    // Try to refresh the token
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();

        const nextResponse = NextResponse.next();

        nextResponse.cookies.set("session", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        return nextResponse;
      }
    } catch (error) {
      // Refresh failed, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}
```

### 5.5 Client-Side Auth State (UI Only)

```tsx
// src/stores/use-auth-ui-store.ts
"use client";

import { create } from "zustand";

interface AuthUIStore {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useAuthUIStore = create<AuthUIStore>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

// Usage in Client Components
("use client");

export function ProtectedButton() {
  const { openLoginModal } = useAuthUIStore();

  // Server Component passes session status
  return <button onClick={() => openLoginModal()}>Login to Continue</button>;
}
```

---

## 6. SEO Optimization

### 6.1 Metadata Configuration

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://banve.com"),
  title: {
    default: "BanVe - Digital Content Marketplace",
    template: "%s | BanVe",
  },
  description: "Discover and download premium digital content",
  keywords: ["digital content", "marketplace", "downloads"],
  authors: [{ name: "BanVe Team" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://banve.com",
    siteName: "BanVe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BanVe - Digital Content Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BanVe - Digital Content Marketplace",
    description: "Discover and download premium digital content",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 6.2 Dynamic Metadata

```tsx
// src/app/(public)/detail/[id]/page.tsx
import type { Metadata } from "next";
import { fetchContentById } from "@/lib/api/content";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const content = await fetchContentById(params.id);

  return {
    title: content.title,
    description: content.description,
    keywords: content.tags,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      publishedTime: content.createdAt,
      authors: [content.author.name],
      images: [
        {
          url: content.thumbnail,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
    },
  };
}

export default async function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const content = await fetchContentById(params.id);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: content.title,
            description: content.description,
            image: content.thumbnail,
            offers: {
              "@type": "Offer",
              price: content.price,
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: content.rating,
              reviewCount: content.reviewCount,
            },
          }),
        }}
      />
      <ContentDetail data={content} />
    </>
  );
}
```

---

## 7. Implementation Checklist

### Week 1: Foundation

- [ ] Initialize Next.js 14+ project with App Router
- [ ] Configure TypeScript strict mode
- [ ] Set up Tailwind CSS v4
- [ ] Configure path aliases (`@/*`)
- [ ] Set up environment variables
- [ ] Port shared utilities and types
- [ ] Create base layout structure
- [ ] Set up Providers (QueryClient)

### Week 2: Static Pages

- [ ] Migrate Terms page
- [ ] Migrate Privacy page
- [ ] Migrate Cookie Policy page
- [ ] Migrate Contact page
- [ ] Implement base metadata
- [ ] Test responsive layouts

### Week 3: Public Pages

- [ ] Migrate Home page with SSR
- [ ] Migrate Collections page
- [ ] Migrate Search page (Client Component)
- [ ] Migrate Detail page with ISR
- [ ] Add OpenGraph metadata
- [ ] Implement structured data

### Week 4: Authentication

- [ ] Create auth Server Actions
- [ ] Implement session management
- [ ] Set up middleware for route protection
- [ ] Migrate Login page
- [ ] Migrate Register page
- [ ] Migrate Forgot Password page
- [ ] Test token refresh flow

### Week 5: Protected Routes

- [ ] Migrate Profile pages
- [ ] Migrate Downloads page
- [ ] Migrate Payment page
- [ ] Migrate Settings page
- [ ] Implement protected layout

### Week 6-7: Admin Panel

- [ ] Migrate Admin layout with role check
- [ ] Migrate Dashboard page
- [ ] Migrate Category management
- [ ] Migrate Content management
- [ ] Migrate Collaborator management
- [ ] Migrate Copyright management
- [ ] Migrate Payment administration

### Week 8: Testing & Launch

- [ ] E2E testing
- [ ] Performance audit (Lighthouse)
- [ ] SEO validation
- [ ] Bundle size analysis
- [ ] Security audit
- [ ] Deployment to staging
- [ ] User acceptance testing
- [ ] Production deployment

---

## 8. Key Files to Create

### Required New Files

1. **`src/middleware.ts`** - Route protection and token refresh
2. **`src/app/layout.tsx`** - Root layout with metadata
3. **`src/app/providers.tsx`** - Client-side providers
4. **`src/lib/auth/session.ts`** - Server session management
5. **`src/actions/auth.ts`** - Auth Server Actions
6. **`src/actions/content.ts`** - Content Server Actions
7. **`src/lib/api/client.ts`** - Server-side API client
8. **`src/lib/metadata.ts`** - Metadata generators
9. **`next.config.js`** - Next.js configuration

### Files to Remove

1. **`src/routes.ts`** - Replaced by App Router file structure
2. **`src/main.tsx`** - Not needed in Next.js
3. **`src/app/lib/routes.tsx`** - Route definitions replaced by folder structure
4. **`src/contexts/AuthContext.tsx`** - Replaced by server sessions
5. **`vite.config.ts`** - Replaced by next.config.js

---

## 9. Environment Variables

```env
# .env.local
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.banve.com
API_BASE_URL=https://api.banve.com

# Authentication
JWT_SECRET=your-jwt-secret-key
NEXT_PUBLIC_APP_URL=https://banve.com

# Revalidation
REVALIDATION_SECRET=your-revalidation-secret

# Node Environment
NODE_ENV=production
```

---

## 10. Performance Targets

| Metric                   | Target  | Current (Vite SPA) | Expected (Next.js) |
| ------------------------ | ------- | ------------------ | ------------------ |
| First Contentful Paint   | < 1.5s  | ~2.5s              | ~1.2s              |
| Largest Contentful Paint | < 2.5s  | ~3.5s              | ~2.0s              |
| Time to Interactive      | < 3.5s  | ~4.0s              | ~2.8s              |
| Total Blocking Time      | < 300ms | ~450ms             | ~200ms             |
| Cumulative Layout Shift  | < 0.1   | ~0.15              | ~0.05              |
| Bundle Size (Initial)    | < 200KB | ~380KB             | ~180KB             |

---

## 11. Risk Mitigation

### High-Risk Areas

1. **Authentication State**
   - Risk: Session loss during migration
   - Mitigation: Dual support for localStorage + cookies during transition

2. **Client-Side State**
   - Risk: Over-reliance on Zustand for server data
   - Mitigation: Gradual migration to Server Components, keep only UI state in Zustand

3. **API Integration**
   - Risk: Orval-generated code compatibility
   - Mitigation: Create server-side wrappers, test thoroughly

4. **SEO Impact**
   - Risk: Broken URLs during migration
   - Mitigation: Implement redirects, maintain URL structure

### Testing Strategy

- Unit tests for Server Actions
- Integration tests for API routes
- E2E tests for critical flows (auth, checkout)
- Visual regression tests
- Performance testing (Lighthouse CI)

---

## Conclusion

This migration plan provides a comprehensive, enterprise-grade approach to transitioning your ReactJS SPA to Next.js. The phased approach minimizes risk while maximizing SEO benefits and performance gains.

**Next Steps:**

1. Review and approve this plan
2. Set up Next.js project in parallel
3. Begin Phase 1 implementation
4. Schedule weekly progress reviews

**Questions or Concerns:**

- Reach out for clarification on any section
- Adjust timeline based on team capacity
- Prioritize phases based on business needs
