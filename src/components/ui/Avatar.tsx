import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
  bordered?: boolean;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', status: 'w-2 h-2 border' },
  sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2.5 h-2.5 border-2' },
  md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-3 h-3 border-2' },
  lg: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3.5 h-3.5 border-2' },
  xl: { container: 'w-20 h-20', text: 'text-2xl', status: 'w-4 h-4 border-2' },
  '2xl': { container: 'w-28 h-28', text: 'text-3xl', status: 'w-5 h-5 border-2' },
};

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-500',
  busy: 'bg-[#FF5252]',
  away: 'bg-amber-500',
};

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'from-[#0052D4] to-[#4364F7]',
    'from-[#4364F7] to-[#6FB1FC]',
    'from-[#00E5FF] to-[#0097A7]',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-amber-500',
    'from-green-500 to-emerald-500',
    'from-rose-500 to-pink-500',
    'from-indigo-500 to-blue-500',
  ];

  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  showStatus = false,
  status = 'offline',
  bordered = false,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const { container, text, status: statusSize } = sizeStyles[size];

  const initials = useMemo(() => (name ? getInitials(name) : ''), [name]);
  const bgColor = useMemo(() => (name ? getAvatarColor(name) : 'from-slate-600 to-slate-700'), [name]);

  const showImage = src && !imageError;
  const showInitials = !showImage && initials;
  const showIcon = !showImage && !showInitials;

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold',
          container,
          bordered && 'ring-2 ring-offset-2 ring-offset-slate-900 ring-[#4364F7]'
        )}
      >
        {showImage && (
          <motion.img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {showInitials && (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center bg-gradient-to-br text-white',
              text,
              bgColor
            )}
          >
            {initials}
          </div>
        )}

        {showIcon && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 text-slate-400">
            <User className={cn(text === 'text-[10px]' ? 'w-3 h-3' : 'w-1/2 h-1/2')} />
          </div>
        )}
      </div>

      {/* Status indicator */}
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-slate-900',
            statusSize,
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

// Avatar group for stacked display
interface AvatarGroupProps {
  avatars: Array<{ src?: string; name?: string }>;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const { container, text } = sizeStyles[size];

  // Calculate overlap based on size
  const overlapMap: Record<AvatarSize, string> = {
    xs: '-ml-2',
    sm: '-ml-2.5',
    md: '-ml-3',
    lg: '-ml-4',
    xl: '-ml-5',
    '2xl': '-ml-6',
  };

  return (
    <div className={cn('flex items-center', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'ring-2 ring-slate-900 rounded-full',
            index > 0 && overlapMap[size]
          )}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            'rounded-full ring-2 ring-slate-900 flex items-center justify-center bg-gradient-to-br from-[#4364F7] to-[#6FB1FC] text-white font-semibold',
            container,
            text,
            overlapMap[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

// Editable avatar with upload hint
interface EditableAvatarProps extends AvatarProps {
  onEdit?: () => void;
}

export function EditableAvatar({ onEdit, ...props }: EditableAvatarProps) {
  return (
    <div className="relative group">
      <Avatar {...props} />
      {onEdit && (
        <motion.button
          onClick={onEdit}
          className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white text-xs font-medium">Modifier</span>
        </motion.button>
      )}
    </div>
  );
}
