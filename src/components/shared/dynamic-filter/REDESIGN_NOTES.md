# DynamicFilter Redesign - Minimal & Clean UI/UX

## 🎨 Design Philosophy

Phong cách: **Minimal, Clean, Professional**

- Không màu mè, tập trung vào functionality
- Smooth animations with framer-motion
- Responsive & accessible
- Consistent spacing & typography

---

## ✨ Key Improvements

### 1. **DynamicFilterSidebar**

**Framer Motion Animations:**

- Smooth slide-in/out với custom easing `[0.4, 0, 0.2, 1]`
- Backdrop blur overlay cho mobile
- AnimatePresence cho enter/exit transitions

**UI Enhancements:**

- Reduced padding & spacing (6px → 4px)
- Border opacity (border/50) cho subtle look
- Backdrop blur cho glass-morphism effect
- Close button với icon (X) cho mobile
- Sticky header với clean typography

**Responsive:**

- Mobile: Full overlay với backdrop
- Desktop: Sidebar với fixed width 320px

---

### 2. **DynamicFilterActions**

**Icons & Labels:**

- RotateCcw icon cho "Đặt lại"
- Search icon cho "Áp dụng"
- Customizable labels via props
- Smaller icon size (3.5 × 3.5)

**Layout:**

- Flex-reverse trên mobile (Submit button on top)
- Horizontal layout trên desktop
- Equal width buttons với flex-1
- Border-top separator với subtle opacity

**Animation:**

- Fade-in from bottom với delay
- Smooth transition

---

### 3. **DynamicFilterFields**

**Stagger Animation:**

- Container → children stagger pattern
- Each field fades in với 50ms delay
- Consistent spacing (space-y-4)

**Typography:**

- Smaller label (text-xs) với muted color
- Consistent form spacing (space-y-2)
- Better visual hierarchy

---

### 4. **DynamicFilterSection**

**Improvements:**

- Motion wrapper cho smooth reveal
- Accordions open by default (defaultValue={id})
- Removed bottom border on last item
- Cleaner spacing (gap-3)
- Smaller padding

---

### 5. **DynamicFilterGrid**

**Layout:**

- Improved responsive grid
- Stagger children animation
- Better gap spacing (gap-3)
- Modern grid breakpoints

---

### 6. **Field Renderer**

**Input Styling:**

- Consistent height (h-9)
- Smaller text size (text-sm)
- Cleaner Select component
- Better checkbox alignment

---

### 7. **Page Integration (Categories)**

**Active Filter Badge:**

- Shows count of active filters
- Badge appears on filter button
- Auto-calculates from filterValues
- Clean pill design

**Layout:**

- Max-width container (7xl)
- Better padding (p-6 lg:p-8)
- Card wrapper cho table
- Improved header spacing

**Filter Button:**

- Shows active count badge
- Responsive text (hidden on mobile)
- Clean icon placement

---

## 🎯 Animation Details

### Timing Functions

```typescript
// Slide animations
ease: [0.4, 0, 0.2, 1]; // Custom cubic-bezier

// Stagger delays
staggerChildren: 0.05; // 50ms between items

// Individual items
duration: 0.3; // 300ms
delay: 0.1; // 100ms
```

### Motion Variants

```typescript
// Container
hidden: { opacity: 0 }
show: { opacity: 1, transition: { staggerChildren: 0.05 } }

// Items
hidden: { opacity: 0, y: 10 }
show: { opacity: 1, y: 0 }
```

---

## 📦 Component API

### DynamicFilterSidebar

```tsx
<DynamicFilter.Sidebar
  open={boolean}
  onClose={() => void}  // NEW: Close handler
>
```

### DynamicFilterActions

```tsx
<DynamicFilter.Actions
  resetLabel="Đặt lại" // NEW: Custom label
  submitLabel="Áp dụng" // NEW: Custom label
  className="..."
/>
```

---

## 🎨 Design Tokens

### Spacing Scale

- Gap: 2px → 3px (tighter)
- Padding: 4px → 6px (sidebar)
- Section gap: 4px → 5px

### Typography

- Labels: text-sm → text-xs
- Inputs: default → text-sm
- Headers: text-lg → text-base

### Colors

- Borders: border → border/50 (subtle)
- Background: background → background/95 (transparency)
- Labels: foreground → muted-foreground

---

## 🚀 Usage Example

```tsx
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [filterValues, setFilterValues] = useState();

// Count active filters
const activeFiltersCount = useMemo(() => {
  if (!filterValues) return 0;
  return Object.values(filterValues).filter(
    (value) => value !== undefined && value !== "",
  ).length;
}, [filterValues]);

return (
  <DynamicFilter
    schema={filterSchema}
    onSubmit={handleFilterSubmit}
    fieldConfig={fieldConfig}
  >
    <DynamicFilter.Sidebar
      open={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
    >
      <div className="space-y-5">
        <DynamicFilter.Fields />
        <DynamicFilter.Actions resetLabel="Xóa" submitLabel="Tìm kiếm" />
      </div>
    </DynamicFilter.Sidebar>
  </DynamicFilter>
);
```

---

## 📱 Responsive Behavior

### Mobile (< 1024px)

- Sidebar: Fixed overlay với backdrop
- Width: Full screen
- Close button: Visible
- Backdrop: Clickable to close

### Desktop (≥ 1024px)

- Sidebar: Slide from left
- Width: 320px fixed
- Close button: Hidden
- Backdrop: None

---

## ✅ Accessibility

- Keyboard navigation support
- Focus management
- ARIA labels (inherited from Shadcn)
- Proper heading hierarchy
- Screen reader friendly

---

## 🎨 Color Contrast

All colors meet WCAG AA standards:

- Text on background: >= 4.5:1
- Border visibility: Subtle but visible
- Focus indicators: Clear and distinct

---

## 💡 Best Practices

1. **Keep it simple**: Don't over-animate
2. **Consistent spacing**: Use Tailwind spacing scale
3. **Typography hierarchy**: Clear visual levels
4. **Subtle borders**: Use opacity for depth
5. **Purposeful motion**: Animate state changes only

---

## 🔧 Customization

All components accept `className` prop for additional styling:

```tsx
<DynamicFilter.Fields className="custom-class" />
<DynamicFilter.Actions className="custom-class" />
<DynamicFilter.Grid className="custom-class" />
```

---

## 📊 Performance

- Framer Motion: Tree-shaking enabled
- Minimal re-renders with useMemo
- Optimized animations (GPU accelerated)
- No layout thrashing

---

## 🎯 Future Enhancements

- [ ] Saved filter presets
- [ ] Filter history
- [ ] Advanced filter builder
- [ ] Export/Import filters
- [ ] Filter templates

---

**Updated:** February 8, 2026
**Designer:** Senior FE Developer
**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS, Shadcn/UI
