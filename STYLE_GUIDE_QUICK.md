# Quick Reference - Genius Blue Edition

## 🎨 Couleurs Essentielles

```jsx
// Palette Bleu
#0052D4  → primary-500   (Deep Electric)
#4364F7  → primary-400   (Royal Blue)
#6FB1FC  → primary-300   (Sky Blue)

// Actions
#00E5FF  → genius-cyan     (✓ Positif)
#FF5252  → genius-coral    (✗ Négatif)
#00C853  → genius-green    (Correct)

// Fonds
#0F172A  → genius-bg       (Dark background)
#F8F9FA  → genius-bg-light (Light background)
```

## 🔥 Composants les Plus Utilisés

### Bouton Primaire
```jsx
<button className="btn-primary">
  Cliquez ici
</button>
```
Gradient bleu 135° + ombre bleue

### Card Swipeable
```jsx
<div className="genius-card">
  <div className="stamp-genius">GENIUS</div>
  {/* Contenu */}
</div>
```
Radius 24px + Ombre bleu spéciale

### FAB Controls
```jsx
<FABControls
  onSwipeLeft={action}
  onSwipeRight={action}
  onFlip={action}
/>
```
Blanc avec borders colorées : coral (left), cyan (right)

### Glass Card
```jsx
<div className="glass-card">
  Contenu avec glassmorphism
</div>
```
Backdrop blur + semi-transparent

## 📐 Classe Tailwind Principales

```jsx
// Couleurs
bg-primary-500
text-primary-400
border-primary-300
bg-genius-cyan
text-genius-coral
bg-genius-bg

// Ombres
shadow-genius-card        // Bleu subtil
shadow-genius-glow        // Cyan pulsant
shadow-nope-glow          // Coral pulsant

// Gradients
bg-gradient-genius        // 135° bleu complet
from-primary-500 via-primary-400 to-primary-300

// Border radius
rounded-card              // 24px (cartes)
rounded-xl                // 12px (boutons)

// Animations
animate-fade-in
animate-slide-up
animate-scale-in
animate-bounce-ralph
```

## 💡 Exemples Rapides

### Button avec Gradient
```jsx
<button className="bg-gradient-genius text-white px-6 py-3 rounded-xl
                   shadow-lg hover:shadow-lg shadow-primary-600/25">
  Action
</button>
```

### Card avec Hover
```jsx
<div className="genius-card hover:shadow-genius-card-hover
                transition-shadow duration-300">
  Contenu
</div>
```

### Badge d'Action
```jsx
<div className="badge-xp">+50 XP</div>         {/* Cyan */}
<div className="badge-streak">5 🔥</div>       {/* Orange */}
```

### Notification Positive
```jsx
<div className="text-genius-cyan">✓ Correct!</div>
```

### Notification Négative
```jsx
<div className="text-genius-coral">✗ Essayez encore</div>
```

## 🎭 États Interactifs

```jsx
// Hover : Translate et ombre
hover:shadow-genius-card-hover transform hover:-translate-y-1

// Active : Scale down
active:scale-95

// Focus : Ring bleu
focus-visible:ring-2 focus-visible:ring-primary-400

// Disabled : Opacity
disabled:opacity-50 disabled:cursor-not-allowed

// Touch feedback
className="touch-feedback"
```

## 📱 Responsive

```jsx
// Mobile first
<div className="px-4 sm:px-6 md:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🌙 Dark/Light Mode

```jsx
// Appliqué par défaut (dark)
// Classes automatiques pour light mode via 'light:' prefix

<div className="bg-genius-bg dark:bg-genius-bg light:bg-white">
```

## ⚡ Performance Tips

1. **Utilisez des classes Tailwind** plutôt que des styles inline
2. **Réutilisez `genius-card`** pour les cartes uniformes
3. **Appliquez `touch-feedback`** sur tous les boutons
4. **Préférez les animations Tailwind** (`animate-*`) aux Framer Motion complexes

## 🔗 Fichiers Source

- `tailwind.config.js` → Palette complète
- `src/index.css` → Classes `.btn-*`, `.genius-*`, `.badge-*`
- `src/components/FABControls.tsx` → Exemple complet

## ✨ Patterns d'Utilisation

### Pattern 1 : Bouton + Shadow
```jsx
<button className="btn-primary shadow-genius-card hover:shadow-genius-card-hover">
  Action
</button>
```

### Pattern 2 : Card avec Badge
```jsx
<div className="genius-card p-6">
  <div className="badge-xp mb-4">+100 XP</div>
  <h2 className="text-2xl font-bold">Titre</h2>
</div>
```

### Pattern 3 : Status Message
```jsx
<div className="flex items-center gap-2">
  <span className="text-genius-cyan">✓</span>
  <span>Correcte !</span>
</div>
```

## 🎯 Tâches Courantes

| Tâche | Code |
|-------|------|
| Fond primaire | `bg-primary-500` |
| Texte cyan | `text-genius-cyan` |
| Ombre card | `shadow-genius-card` |
| Bouton gradient | `bg-gradient-genius` |
| Animation fade | `animate-fade-in` |
| Hover effect | `hover:shadow-genius-card-hover` |

---

**Besoin d'aide ?** Consulter `DESIGN_SYSTEM.md` pour la documentation complète.
