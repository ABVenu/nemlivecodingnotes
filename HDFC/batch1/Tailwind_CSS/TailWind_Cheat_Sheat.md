
### Tailwind CSS Complete Cheatsheet

---

## 📱 Responsive Design Breakpoints

Prefix classes with screen sizes (mobile-first).

| Prefix | Min Width |
| ------ | --------- |
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

Example:

```html
<div class="bg-red-500 sm:bg-green-500 lg:bg-blue-500"></div>
```

---

## 🎨 Colors

```html
text-red-500       → text color
bg-blue-600        → background color
border-green-400   → border color
divide-y divide-gray-200 → borders between children
placeholder-gray-400 → placeholder color
```

---

## 📏 Spacing (Margin & Padding)

```html
m-4     → margin 1rem
mt-2    → margin-top 0.5rem
mx-auto → margin-left & right auto
p-6     → padding 1.5rem
px-4    → padding-left & right 1rem
py-2    → padding-top & bottom 0.5rem
space-x-4 → horizontal space between children
space-y-2 → vertical space between children
```

---

## 📐 Sizing

```html
w-10       → width: 2.5rem
w-1/2      → width: 50%
w-full     → width: 100%
max-w-sm   → max width small
h-16       → height: 4rem
h-screen   → height: 100vh
min-h-full → min-height: 100%
aspect-square, aspect-video
```

---

## 🧩 Layout

```html
container        → responsive fixed-width container
box-border       → include border in size
box-content      → exclude border
block, inline-block, inline
hidden, visible
overflow-hidden, overflow-scroll, overflow-x-auto
```

---

## 🔲 Flexbox

```html
flex, inline-flex
flex-row, flex-col, flex-wrap, flex-nowrap
items-start, items-center, items-end
justify-start, justify-between, justify-center, justify-around
content-start, content-between, content-center
flex-1, flex-auto, flex-none
grow, shrink
```

---

## 📐 Grid

```html
grid, inline-grid
grid-cols-2, grid-cols-12
col-span-2, col-span-full
col-start-2, col-end-4
row-span-3, row-start-1, row-end-2
gap-2, gap-x-4, gap-y-6
auto-cols-fr, auto-rows-min
```

---

## ✍️ Typography

```html
text-xs, text-sm, text-base, text-lg, text-xl, text-4xl
font-thin, font-light, font-normal, font-medium, font-bold, font-black
italic, not-italic
tracking-tight, tracking-wide
leading-none, leading-normal, leading-relaxed
truncate → one line ellipsis
line-clamp-3 → 3 line ellipsis (plugin)
```

---

## 🎛 Borders & Radius

```html
border, border-0, border-2, border-4
border-t, border-b, border-x
border-gray-300
rounded, rounded-md, rounded-full
```

---

## 🖼 Backgrounds

```html
bg-red-500
bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
bg-cover, bg-contain, bg-center, bg-no-repeat
bg-fixed, bg-local, bg-scroll
```

---

## 🌓 Effects

```html
shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-inner
opacity-25, opacity-50, opacity-75, opacity-100
mix-blend-multiply, mix-blend-screen
bg-blend-overlay, bg-blend-darken
```

---

## 🖌 Filters

```html
blur, blur-sm, blur-lg
brightness-50, brightness-150
contrast-200
grayscale, invert, sepia
hue-rotate-90
```

---

## 🖱 Transitions & Animation

```html
transition, transition-all, transition-colors
duration-75, duration-300, duration-700
ease-linear, ease-in, ease-out, ease-in-out
animate-bounce, animate-spin, animate-pulse, animate-ping
```

---

## 🧭 Positioning

```html
static, relative, absolute, fixed, sticky
top-0, bottom-4, inset-0, inset-x-2
z-0, z-10, z-50, z-auto
```

---

## 🧩 Display

```html
block, inline-block, inline, flex, inline-flex
table, table-row, table-cell
grid, inline-grid
hidden
```

---

## 🎚 Transform

```html
transform
scale-50, scale-100, scale-150
rotate-45, rotate-90
translate-x-4, -translate-y-2
skew-x-12
origin-top, origin-bottom-right
```

---

## 📱 Responsive & State Variants

```html
sm:bg-red-500 md:bg-green-500 lg:bg-blue-500
hover:bg-yellow-300 focus:ring-2 active:scale-95
dark:bg-gray-900 dark:text-white
```

---

## 👨‍🦽 Accessibility

```html
sr-only        → visually hidden but screen-reader visible
not-sr-only    → undo sr-only
```

---

## 🔐 Interactivity

```html
cursor-pointer, cursor-not-allowed
resize, resize-x, resize-y, resize-none
select-none, select-text, select-all
pointer-events-none, pointer-events-auto
```

---

## 🌀 Lists

```html
list-none, list-disc, list-decimal
list-inside, list-outside
```

---

## 🎨 Tables

```html
table-auto, table-fixed
border-collapse, border-separate
```

---

## 🌑 Dark Mode

```html
dark:bg-black dark:text-white
```

---

## 🔄 Important Modifier

```html
!important → use `!`
e.g., !text-red-500 (forces override)
```

---


