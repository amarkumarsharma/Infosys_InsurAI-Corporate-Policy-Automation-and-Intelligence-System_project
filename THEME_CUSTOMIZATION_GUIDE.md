# 🎨 Theme Customization Guide

## Tailwind CSS Integration (Optional but Recommended)

While the current UI uses CSS-in-JS and utility classes, here's how to add Tailwind CSS for even more power:

### Installation
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure tailwind.config.js
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideInRight 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
```

### Configure postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Custom Color Palettes

### Brand Colors
To customize the brand colors throughout the application:

1. **Homepage**: Edit `src/pages/ModernHomepage.jsx`
```jsx
const colors = {
  primary: '#2563eb',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  // Update these values
};
```

2. **Components**: Edit `src/components/ui/Button.jsx`, `Card.jsx`, etc.
```jsx
const variants = {
  primary: 'bg-gradient-to-r from-YOUR-COLOR to-YOUR-COLOR',
};
```

3. **Global CSS**: Edit `src/globals_modern.css`
```css
:root {
  --primary-blue: #YOUR-COLOR;
  --primary-blue-dark: #YOUR-COLOR-DARK;
}
```

---

## Creating Custom Themes

### Light Theme Example
```jsx
// src/themes/lightTheme.js
export const lightTheme = {
  colors: {
    primary: '#0066cc',
    secondary: '#6c5ce7',
    accent: '#00b894',
    background: '#ffffff',
    surface: '#f5f6fa',
    text: '#1e293b',
    textSecondary: '#64748b',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
  },
};
```

### Dark Theme Example
```jsx
// src/themes/darkTheme.js
export const darkTheme = {
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    accent: '#34d399',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
  },
};
```

---

## Gradient Presets

### Available Gradients
```jsx
// In any component
const gradients = {
  'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'gradient-premium': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'gradient-sunset': 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};
```

### Creating Custom Gradients
```jsx
// Usage in Button component
<button style={{
  background: 'linear-gradient(135deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%)'
}}>
  Custom Gradient Button
</button>
```

---

## Icon Customization

All icons come from `lucide-react`. To find more icons:

1. Visit: https://lucide.dev
2. Search for your icon
3. Import and use:

```jsx
import { IconName } from 'lucide-react';

export default function Component() {
  return <IconName className="w-6 h-6" />;
}
```

### Common Insurance-Related Icons
```jsx
import {
  FileText,        // For documents/claims
  Shield,          // For security/protection
  Users,           // For clients/employees
  BarChart3,       // For analytics
  AlertTriangle,   // For alerts/fraud
  CheckCircle,     // For approval
  Clock,           // For pending items
  TrendingUp,      // For growth
  DollarSign,      // For money/commission
  Bell,            // For notifications
} from 'lucide-react';
```

---

## Animation Customization

### Built-in Animations
```css
/* In globals_modern.css */
@keyframes fadeIn { /* fade in animation */ }
@keyframes slideInRight { /* slide animation */ }
@keyframes pulse { /* pulse effect */ }
@keyframes shimmer { /* loading shimmer */ }
@keyframes glow { /* glow effect */ }
```

### Using Animations in Components
```jsx
<div className="animate-fade-in">
  Fades in smoothly
</div>

<div className="animate-pulse">
  Pulses continuously
</div>
```

### Creating Custom Animations
```css
@keyframes customAnimation {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-custom {
  animation: customAnimation 0.5s ease-out;
}
```

---

## Responsive Breakpoints

### Mobile-First Approach
```jsx
// Small screens (base)
<div className="px-4 py-2">Mobile first</div>

// Medium screens (768px+)
<div className="md:px-6 md:py-4">Tablet and up</div>

// Large screens (1024px+)
<div className="lg:px-8 lg:py-6">Desktop and up</div>

// Extra large (1280px+)
<div className="xl:px-12 xl:py-8">Large desktop</div>
```

---

## Typography Customization

### Font Sizes
```jsx
// Update in components
<h1 className="text-5xl md:text-6xl font-bold">
  Responsive Heading
</h1>

<p className="text-base md:text-lg">
  Responsive paragraph
</p>
```

### Font Weights
- `font-light`: 300
- `font-normal`: 400
- `font-medium`: 500
- `font-semibold`: 600
- `font-bold`: 700
- `font-extrabold`: 800

---

## Spacing System

### Margin and Padding
```jsx
// xs: 0.5rem, sm: 1rem, md: 1.5rem, lg: 2rem, xl: 3rem
<div className="p-4 m-2 space-y-4">
  Spacing examples
</div>
```

---

## Component Variants

### Button Variants
- `primary`: Blue gradient (main action)
- `secondary`: Purple gradient (secondary)
- `gradient`: Multi-color gradient (featured)
- `outline`: Bordered button
- `ghost`: Transparent background
- `danger`: Red (destructive actions)
- `success`: Green (positive actions)

### Card Variants
- `default`: White card
- `gradient`: Gradient background
- `glass`: Glass morphism effect
- `dark`: Dark card
- `neon`: Glowing neon effect

### Badge Variants
- `primary`: Blue
- `secondary`: Purple
- `success`: Green
- `danger`: Red
- `warning`: Yellow/Amber
- `info`: Cyan

---

## Dark Mode Implementation

### Enable Dark Mode Toggle
```jsx
// In components
const [isDark, setIsDark] = useState(false);

// Use this to set document theme
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDark]);

return (
  <button onClick={() => setIsDark(!isDark)}>
    Toggle Dark Mode
  </button>
);
```

### Dark Mode CSS
```css
/* Light mode (default) */
body {
  background: #ffffff;
  color: #1e293b;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background: #0f172a;
    color: #f1f5f9;
  }
}
```

---

## Advanced Customization

### Creating a Custom Button Component
```jsx
export function CustomButton({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '' 
}) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    custom: 'bg-gradient-to-r from-YOUR-COLOR-1 to-YOUR-COLOR-2',
  };

  return (
    <button 
      onClick={onClick}
      className={`
        px-6 py-2 rounded-lg font-semibold transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
```

### Creating a Custom Card Component
```jsx
export function CustomCard({ children, gradient = false }) {
  return (
    <div className={`
      p-6 rounded-xl shadow-lg transition-all duration-300
      ${gradient 
        ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
        : 'bg-white dark:bg-slate-800'
      }
    `}>
      {children}
    </div>
  );
}
```

---

## Performance Tips for Customization

1. **Use CSS Variables** for easy theme switching
2. **Minimize Color Variations** (max 10-15 colors)
3. **Optimize Images** for gradients
4. **Use CSS Grid** for responsive layouts
5. **Lazy Load** heavy components
6. **Memoize** expensive calculations
7. **Use Production Builds** for optimized CSS

---

## Resources

- **Lucide Icons**: https://lucide.dev
- **Color Palette Generator**: https://coolors.co
- **CSS Gradient Generator**: https://cssgradient.io
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org

---

## Questions or Issues?

1. Check if changes are saved
2. Clear browser cache (Ctrl+Shift+Delete)
3. Rebuild the project (`npm run build`)
4. Check browser console for errors (F12)
5. Test in incognito mode

Good luck with your customization! 🎨
