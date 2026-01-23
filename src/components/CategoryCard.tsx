import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Star, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  color: string; // Hex color for accent
  progress?: number; // 0-100
  lessonsCompleted?: number;
  totalLessons?: number;
  xpReward?: number;
  isLocked?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({
  id,
  name,
  description,
  emoji,
  color,
  progress = 0,
  lessonsCompleted,
  totalLessons,
  xpReward,
  isLocked = false,
  isNew = false,
  isFeatured = false,
  onClick,
  className,
}: CategoryCardProps) {
  const isComplete = progress >= 100;

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        'w-full p-4 rounded-2xl text-left transition-all',
        'border border-slate-700/50',
        isLocked
          ? 'bg-slate-800/30 cursor-not-allowed opacity-60'
          : 'bg-slate-800/50 hover:bg-slate-800 cursor-pointer',
        isFeatured && 'ring-2 ring-offset-2 ring-offset-slate-900',
        className
      )}
      style={{
        borderColor: !isLocked ? `${color}30` : undefined,
        ...(isFeatured && { '--tw-ring-color': color } as React.CSSProperties),
      }}
      whileHover={!isLocked ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Emoji icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {isLocked ? (
            <Lock className="w-6 h-6 text-slate-500" />
          ) : (
            <span className={isLocked ? 'grayscale' : ''}>{emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white truncate">{name}</h3>
            {isComplete && (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            {isNew && !isLocked && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                style={{ backgroundColor: `${color}30`, color }}
              >
                Nouveau
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
              {description}
            </p>
          )}

          {/* Progress bar */}
          {!isLocked && progress > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">
                  {lessonsCompleted ?? 0}/{totalLessons ?? '?'} lecons
                </span>
                <span style={{ color }}>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </div>
          )}

          {/* XP reward for locked */}
          {isLocked && xpReward && (
            <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs">
              <Lock className="w-3 h-3" />
              <span>Debloquer au niveau suivant</span>
            </div>
          )}
        </div>

        {/* Chevron */}
        {!isLocked && (
          <ChevronRight
            className="w-5 h-5 text-slate-500 flex-shrink-0"
            style={{ color: progress > 0 ? color : undefined }}
          />
        )}
      </div>

      {/* Featured badge */}
      {isFeatured && !isLocked && (
        <div
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
          style={{ backgroundColor: `${color}15` }}
        >
          <Star className="w-4 h-4" style={{ color }} />
          <span style={{ color }}>Recommande pour toi</span>
          {xpReward && (
            <span className="ml-auto flex items-center gap-1 text-[#00E5FF]">
              <Zap className="w-3 h-3" /> +{xpReward} XP
            </span>
          )}
        </div>
      )}
    </motion.button>
  );
}

// Category list component
interface CategoryListProps {
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    emoji: string;
    color: string;
    progress?: number;
    lessonsCompleted?: number;
    totalLessons?: number;
    isLocked?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
  }>;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategoryList({ categories, onSelect, className }: CategoryListProps) {
  // Sort: featured first, then by progress, then locked at end
  const sorted = [...categories].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    if (a.isLocked && !b.isLocked) return 1;
    if (!a.isLocked && b.isLocked) return -1;
    return (b.progress ?? 0) - (a.progress ?? 0);
  });

  return (
    <div className={cn('space-y-3', className)}>
      {sorted.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CategoryCard
            {...category}
            onClick={() => onSelect(category.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Compact horizontal category chips
interface CategoryChipsProps {
  categories: Array<{
    id: string;
    name: string;
    emoji: string;
    color: string;
    isActive?: boolean;
  }>;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategoryChips({ categories, onSelect, className }: CategoryChipsProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto no-scrollbar pb-2', className)}>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all',
            category.isActive
              ? 'text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          )}
          style={
            category.isActive
              ? { backgroundColor: category.color }
              : undefined
          }
          whileTap={{ scale: 0.95 }}
        >
          <span>{category.emoji}</span>
          <span className="text-sm font-medium">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
