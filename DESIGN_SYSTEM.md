# Design System - Genius Blue Edition

## 🎨 Palette de Couleurs

La charte "Blue Shift Edition" utilise une palette électrique et moderne basée sur le bleu.

### Couleurs Primaires (Gradient Bleu)

```css
--primary-deep: #0052D4    /* Deep Electric - Base sombre */
--primary-royal: #4364F7   /* Royal Blue - Milieu gradient */
--primary-sky: #6FB1FC     /* Sky Blue - Teinte claire */
```

**Utilisation Tailwind :**
```jsx
// Classes de couleur
<div className="bg-primary-500">           {/* #0052D4 */}
<div className="text-primary-400">         {/* #4364F7 */}
<div className="border-primary-300">       {/* #6FB1FC */}

// Gradient
<div className="bg-gradient-genius">       {/* Gradient 135° */}
<button className="bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300">
```

### Couleurs d'Actions

| Couleur | Hex | Usage | Classe |
|---------|-----|-------|--------|
| Swipe Right | `#00E5FF` | GENIUS positif | `text-genius-cyan`, `border-genius-cyan` |
| Alternative | `#00C853` | Correcte (Quiz) | `text-genius-green`, `bg-genius-green` |
| Swipe Left | `#FF5252` | NOPE négatif | `text-genius-coral`, `border-genius-coral` |

### Couleurs de Fond

| Contexte | Couleur | Usage |
|----------|---------|-------|
| Dark Mode | `#0F172A` | Arrière-plan principal (deep slate) |
| Light Mode | `#F8F9FA` | Arrière-plan (clean white) |
| Card Dark | `#1E293B` | Cartes en mode sombre |

**Utilisation Tailwind :**
```jsx
<div className="bg-genius-bg">             {/* #0F172A */}
<div className="bg-genius-bg-light">       {/* #F8F9FA */}
<div className="border-genius-border">     {/* #334155 */}
```

## 🎯 Composants Principaux

### Boutons

#### Primary (Gradient Bleu)
```jsx
<button className="btn-primary">
  Click me
</button>

// Tailwind direct
<button className="bg-gradient-genius text-white py-3 px-6 rounded-xl
                   shadow-lg shadow-primary-600/25 hover:shadow-lg">
  Action
</button>
```

**Styles :**
- Background: Gradient diagonal `#0052D4 → #6FB1FC`
- Ombre: `0 4px 14px rgba(0, 82, 212, 0.25)`
- Hover: Ombre accrue + translateY(-1px)
- Active: Échelle 0.95

#### Secondary (Bleu Royal)
```jsx
<button className="btn-secondary">
  Secondary Action
</button>
```

#### Ghost (Transparent)
```jsx
<button className="btn-ghost">
  Tertiary Action
</button>
```

### Cartes (Cards)

#### Genius Card (Swipeable)
```jsx
<div className="genius-card">
  <div className="stamp-genius">GENIUS</div>
  {/* Contenu */}
</div>

// CSS class
.genius-card {
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 82, 212, 0.15);
  aspect-ratio: 3 / 4;
}
```

**États :**
- Default: Ombre bleu subtile
- Hover: Ombre augmentée `0 25px 50px -12px rgba(0, 82, 212, 0.25)`
- Glowing: Dynamique selon direction swipe

#### Glass Card
```jsx
<div className="glass-card">
  {/* Contenu */}
</div>

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

### FAB Controls (Floating Action Buttons)

Les trois boutons d'action principaux avec la palette "Blue Shift" :

```jsx
<FABControls
  onSwipeLeft={handleNo}
  onSwipeRight={handleYes}
  onFlip={handleFlip}
/>
```

**Boutons :**
- NOPE (Gauche): Blanc + border `#FF5252` (coral)
- FLIP (Centre): Gradient bleu complet
- GENIUS (Droite): Blanc + border `#00E5FF` (cyan)

### Badges & Indicators

```jsx
// XP Badge
<div className="badge-xp">+100 XP</div>

// Streak Badge
<div className="badge-streak">🔥 5 jours</div>

// Styles
.badge-xp {
  background: rgba(0, 229, 255, 0.2);
  color: #00E5FF;
  border-radius: 9999px;
}

.badge-streak {
  background: rgba(255, 159, 64, 0.2);
  color: #FF9F40;
}
```

### Stamps (Swipe Indicators)

```jsx
// GENIUS Stamp
<div className="stamp-genius">GENIUS</div>

// NOPE Stamp
<div className="stamp-nope">NOPE</div>

// CSS
.stamp-genius {
  color: #00E5FF;
  border-color: #00E5FF;
  background: rgba(0, 229, 255, 0.1);
  border: 4px solid;
  transform: rotate(-20deg);
}

.stamp-nope {
  color: #FF5252;
  border-color: #FF5252;
  background: rgba(255, 82, 82, 0.1);
  border: 4px solid;
  transform: rotate(20deg);
}
```

## ✨ Animations et Micro-interactions

### Transitions Globales
```jsx
// Fade in
className="animate-fade-in"          // 0.2s

// Slide up
className="animate-slide-up"         // 0.4s

// Scale in
className="animate-scale-in"         // 0.2s
```

### Effects Spéciales
```jsx
// Glow cyan
className="shadow-genius-glow"       // Pulse bleu clair

// Glow coral
className="shadow-nope-glow"         // Pulse rouge

// Pulse général
className="pulse-glow"               // Pulse indigo
```

### Card Tilt
```jsx
// Hover 3D effect
<div className="card-tilt">
  Contenu
</div>
```

### Touch Feedback
```jsx
// Active state avec feedback tactile
<div className="touch-feedback">
  Appuyez ici
</div>
```

## 🎨 Utilisation Avancée

### Gradient Text
```jsx
<span className="text-gradient-blue">
  Texte avec gradient bleu
</span>

// CSS
.text-gradient-blue {
  background: linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Glow Effects
```jsx
// Glow pulsant
<div className="glow-pulse">
  Élément brillant
</div>

// Glow spécifique cyan (pour GENIUS)
<div className="shadow-genius-glow">
  Action positive
</div>

// Glow spécifique coral (pour NOPE)
<div className="shadow-nope-glow">
  Action négative
</div>
```

## 📱 Responsive Design

### Breakpoints
```
sm   → 640px   (Mobile landscape)
md   → 768px   (Tablet)
lg   → 1024px  (Desktop small)
xl   → 1280px  (Desktop)
2xl  → 1536px  (Large screens)
```

### Mobile-First Pattern
```jsx
// Classes progressives
<div className="px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {/* Contenu */}
  </div>
</div>
```

## 🌙 Dark Mode

Le dark mode est activé par défaut via `class="dark"` sur l'élément racine.

```jsx
// Automatiquement sombre
<body className="dark bg-genius-bg text-white">
  {/* Contenu sombre par défaut */}
</body>
```

### Variables CSS Dark Mode
```css
.dark {
  --background: #0F172A;
  --foreground: #F8F9FA;
  --primary: #6FB1FC;
}
```

## 🔧 Configuration Tailwind

### Fichier : `tailwind.config.js`

Couleurs personnalisées disponibles :

```js
// Palettes
colors: {
  primary: {    // Bleu gradient
    300: '#6FB1FC',
    400: '#4364F7',
    500: '#0052D4',
    // ... full scale
  },
  genius: {
    cyan: '#00E5FF',
    green: '#00C853',
    coral: '#FF5252',
    bg: '#0F172A',
    'bg-light': '#F8F9FA',
  },
}

// Ombres
boxShadow: {
  'genius-card': '0 20px 40px -10px rgba(0, 82, 212, 0.15)',
  'genius-card-hover': '0 25px 50px -12px rgba(0, 82, 212, 0.25)',
  'genius-glow': '0 0 30px rgba(0, 229, 255, 0.3)',
  'nope-glow': '0 0 30px rgba(255, 82, 82, 0.3)',
}
```

## 📚 Fichiers Clés

| Fichier | Description |
|---------|-------------|
| `tailwind.config.js` | Configuration couleurs et themes |
| `src/index.css` | Styles globaux et composants CSS |
| `src/components/ui/Button.tsx` | Composant bouton réutilisable |
| `src/components/GeniusCard.tsx` | Carte swipeable avec animations 3D |
| `src/components/FABControls.tsx` | Boutons flottants d'action |

## ✅ Checklist d'Intégration

Quand vous intégrez la palette "Blue Shift" dans de nouveaux composants :

- [ ] Utiliser `bg-primary-*` pour les fonds bleus au lieu des hex
- [ ] Remplacer les ombres hardcodées par `shadow-genius-*`
- [ ] Utiliser `text-genius-cyan`, `text-genius-coral`, etc. pour les couleurs d'action
- [ ] Appliquer `className="touch-feedback"` sur éléments interactifs
- [ ] Ajouter des animations (`animate-fade-in`, `animate-slide-up`)
- [ ] Tester en dark mode ET light mode
- [ ] Vérifier la responsivité sur `sm`, `md`, `lg`
- [ ] Documenter les variantes de composants

## 🎯 Prochaines Étapes

1. Appliquer le design system à tous les écrans
2. Tester sur appareils réels (mobile)
3. Optimiser les performances d'animations
4. Recueillir le feedback utilisateur
