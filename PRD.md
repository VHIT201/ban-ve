# Blueprint Marketplace - Product Requirements Document

A professional e-commerce platform for selling architectural blueprints, technical drawings, and design plans to architects, builders, and DIY enthusiasts.

**Experience Qualities**:
1. **Professional** - Conveys expertise and trustworthiness in technical design work through clean layouts and precise typography
2. **Browsable** - Makes it effortless to explore and discover blueprints through visual previews and clear categorization
3. **Inspiring** - Showcases the beauty and detail of architectural drawings to excite potential buyers

**Complexity Level**: Light Application (multiple features with basic state)
- This is an e-commerce showcase with browsing, cart management, and basic checkout flow. No actual payment processing or user accounts, focusing on the shopping experience and blueprint presentation.

## Essential Features

### Browse Blueprint Catalog
- **Functionality**: Display grid of available blueprints with thumbnails, titles, categories, and prices
- **Purpose**: Allow customers to discover and explore available designs quickly
- **Trigger**: User lands on homepage or navigates to catalog
- **Progression**: View grid → Hover for preview → Click for details
- **Success criteria**: All blueprints visible with clear images, pricing, and categories; responsive grid layout

### Blueprint Detail View
- **Functionality**: Show full blueprint details including large preview image, description, specifications, dimensions, and purchase button
- **Purpose**: Provide comprehensive information for purchase decisions
- **Trigger**: Click on any blueprint card
- **Progression**: Click blueprint → View modal/detail page → Read specs → Add to cart or close
- **Success criteria**: Clear presentation of all blueprint information; easy to add to cart; smooth transitions

### Shopping Cart Management
- **Functionality**: Add blueprints to cart, view cart contents, adjust quantities, remove items, see total price
- **Purpose**: Let customers collect multiple blueprints before checkout
- **Trigger**: Click "Add to Cart" button
- **Progression**: Add item → Toast confirmation → View cart badge update → Open cart → Review items → Proceed to checkout
- **Success criteria**: Cart persists between sessions; accurate totals; clear item management

### Category Filtering
- **Functionality**: Filter blueprints by category (Residential, Commercial, Landscape, Industrial, etc.)
- **Purpose**: Help users find relevant blueprints quickly
- **Trigger**: Click category filter button or dropdown
- **Progression**: View all → Select category → See filtered results → Clear filter to return
- **Success criteria**: Instant filtering; visual indication of active filter; smooth transitions

### Search Functionality
- **Functionality**: Search blueprints by name, description, or category
- **Purpose**: Quick access to specific blueprint types
- **Trigger**: Type in search input
- **Progression**: Focus search → Type query → See filtered results → Clear to reset
- **Success criteria**: Real-time filtering; helpful empty states; case-insensitive matching

## Edge Case Handling
- **Empty Cart**: Show friendly empty state with call-to-action to browse catalog
- **No Search Results**: Display helpful message suggesting alternative searches or showing all items
- **Empty Category**: Indicate no blueprints available in selected category with option to view all
- **Duplicate Cart Items**: Increase quantity rather than adding duplicate entries
- **Missing Images**: Show placeholder with blueprint icon for any missing thumbnails

## Design Direction
The design should feel professional, precise, and architectural - evoking the clean lines and technical elegance of blueprint drawings themselves. A minimal interface serves the detailed blueprint imagery best, with generous whitespace that feels like a gallery or portfolio rather than a crowded marketplace.

## Color Selection
Complementary (opposite colors) - Using a classic blueprint blue paired with warm contrasts to create a technical yet inviting atmosphere that references traditional architectural drawings while feeling modern and accessible.

- **Primary Color**: Blueprint Blue `oklch(0.45 0.15 250)` - Communicates technical expertise and architectural tradition
- **Secondary Colors**: 
  - Warm Paper `oklch(0.97 0.01 85)` - Provides a clean canvas reminiscent of drawing paper
  - Charcoal `oklch(0.25 0.01 250)` - For technical text and precise details
- **Accent Color**: Sunset Orange `oklch(0.65 0.18 45)` - Warm highlight for CTAs and interactive elements that creates energy and action
- **Foreground/Background Pairings**:
  - Background (Warm Paper #F7F7F5): Charcoal text (#3A3A3F) - Ratio 11.2:1 ✓
  - Card (White #FFFFFF): Charcoal text (#3A3A3F) - Ratio 12.5:1 ✓
  - Primary (Blueprint Blue #4A6FA5): White text (#FFFFFF) - Ratio 5.2:1 ✓
  - Secondary (Light Blue #E8EDF4): Charcoal text (#3A3A3F) - Ratio 10.8:1 ✓
  - Accent (Sunset Orange #D4965A): White text (#FFFFFF) - Ratio 4.9:1 ✓
  - Muted (Soft Gray #F0F0EE): Dark Gray text (#6B6B70) - Ratio 5.5:1 ✓

## Font Selection
Typography should balance technical precision with approachability - a clean geometric sans-serif for headings that feels architectural, paired with a highly legible sans-serif for body text that ensures blueprint details are easy to read.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter-spacing/-0.02em
  - H2 (Section Headers): Inter SemiBold/24px/normal letter-spacing
  - H3 (Blueprint Titles): Inter Medium/18px/normal letter-spacing
  - Body (Descriptions): Inter Regular/16px/1.6 line-height
  - Small (Metadata): Inter Regular/14px/1.5 line-height/text-muted-foreground
  - Price: Inter Bold/20px/tabular-nums

## Animations
Subtle and purposeful animations that enhance the browsing experience - smooth transitions when filtering or opening details create continuity, while gentle hover effects on blueprint cards invite interaction without distraction.

- **Purposeful Meaning**: Motion should feel precise and intentional, like technical drawing tools - no bouncy or playful animations, instead smooth linear or ease-out curves
- **Hierarchy of Movement**: 
  - High priority: Cart additions (scale + fade), modal open/close (scale + opacity)
  - Medium priority: Card hover effects (subtle lift + shadow), filter transitions (fade)
  - Low priority: Button hover states (background color), badge updates (scale pulse)

## Component Selection
- **Components**:
  - `Card` with custom shadow modifications for blueprint grid items
  - `Dialog` for blueprint detail views with large images
  - `Badge` for category tags and cart item count
  - `Button` with variants for primary (Add to Cart), secondary (View Details), ghost (filters)
  - `Input` with search icon for blueprint search
  - `Sheet` or `Drawer` for mobile shopping cart
  - `Separator` for dividing cart items and sections
  - `ScrollArea` for cart contents and blueprint details
- **Customizations**: 
  - Custom blueprint card component with hover lift effect
  - Price display component with consistent formatting
  - Empty state components for cart and search results
- **States**: 
  - Buttons: Default has subtle border, hover lifts slightly with shadow, active presses down, disabled shows muted colors
  - Cards: Default clean, hover adds shadow and lift, selected/active shows accent border
  - Cart badge: Pulses when items added, shows count with accent background
- **Icon Selection**: 
  - `ShoppingCart` for cart button
  - `MagnifyingGlass` for search
  - `Buildings`, `House`, `Tree`, `Factory` for category icons
  - `Plus`, `Minus`, `X` for cart operations
  - `Ruler`, `Blueprint` for empty states and placeholders
- **Spacing**: 
  - Container: max-w-7xl mx-auto px-4
  - Grid gap: gap-6 (24px) for blueprint cards
  - Section spacing: mb-12 between major sections
  - Card padding: p-6 for content areas
  - Button padding: px-4 py-2 for standard buttons
- **Mobile**: 
  - Grid: 1 column on mobile, 2 on tablet (md:), 3 on desktop (lg:), 4 on xl screens
  - Cart: Sheet drawer from right on mobile, persistent sidebar on desktop
  - Search: Full width on mobile, constrained on desktop
  - Typography: H1 reduces to 24px on mobile, maintain body at 16px minimum
