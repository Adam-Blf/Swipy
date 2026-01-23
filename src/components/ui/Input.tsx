import { forwardRef, useState, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Check, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

// Base input types
type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success';

interface BaseInputProps {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// Input component
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {
  clearable?: boolean;
  onClear?: () => void;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-3 px-4 text-base',
  lg: 'py-4 px-5 text-lg',
};

const iconSizes: Record<InputSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      success,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      clearable = false,
      onClear,
      className,
      type,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const state: InputState = error ? 'error' : success ? 'success' : 'default';
    const isPassword = type === 'password';
    const hasValue = value !== undefined && value !== '';

    const stateStyles: Record<InputState, string> = {
      default: 'border-slate-700 focus:border-[#4364F7] focus:ring-[#4364F7]/20',
      error: 'border-[#FF5252] focus:border-[#FF5252] focus:ring-[#FF5252]/20',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    };

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 text-slate-400',
                iconSizes[size]
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            value={value}
            disabled={disabled}
            className={cn(
              'w-full rounded-xl bg-slate-800 border text-white placeholder-slate-500',
              'transition-all duration-200 outline-none',
              'focus:ring-4',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeStyles[size],
              stateStyles[state],
              leftIcon && 'pl-10',
              (rightIcon || isPassword || (clearable && hasValue)) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={onClear}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className={iconSizes[size]} />
              </button>
            )}

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className={iconSizes[size]} />
                ) : (
                  <Eye className={iconSizes[size]} />
                )}
              </button>
            )}

            {state === 'error' && !isPassword && (
              <AlertCircle className={cn(iconSizes[size], 'text-[#FF5252]')} />
            )}

            {state === 'success' && !isPassword && (
              <Check className={cn(iconSizes[size], 'text-green-500')} />
            )}

            {rightIcon && state === 'default' && !isPassword && !clearable && (
              <div className={cn('text-slate-400', iconSizes[size])}>
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Helper text */}
        <AnimatePresence mode="wait">
          {(hint || error || success) && (
            <motion.p
              key={error || success || hint}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                'text-sm',
                error && 'text-[#FF5252]',
                success && 'text-green-400',
                hint && !error && !success && 'text-slate-500'
              )}
            >
              {error || success || hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

// Search input variant
interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch((e.target as HTMLInputElement).value);
      }
      onKeyDown?.(e);
    };

    return (
      <Input
        ref={ref}
        type="search"
        leftIcon={<Search />}
        placeholder="Rechercher..."
        clearable
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Textarea component
interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<BaseInputProps, 'leftIcon' | 'rightIcon'> {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      success,
      size = 'md',
      fullWidth = false,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const state: InputState = error ? 'error' : success ? 'success' : 'default';

    const stateStyles: Record<InputState, string> = {
      default: 'border-slate-700 focus:border-[#4364F7] focus:ring-[#4364F7]/20',
      error: 'border-[#FF5252] focus:border-[#FF5252] focus:ring-[#FF5252]/20',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    };

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.currentTarget;
        target.style.height = 'auto';
        const lineHeight = parseInt(getComputedStyle(target).lineHeight) || 24;
        const minHeight = lineHeight * minRows;
        const maxHeight = lineHeight * maxRows;
        target.style.height = `${Math.min(Math.max(target.scrollHeight, minHeight), maxHeight)}px`;
      }
    };

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          rows={minRows}
          onInput={handleInput}
          className={cn(
            'w-full rounded-xl bg-slate-800 border text-white placeholder-slate-500',
            'transition-all duration-200 outline-none resize-none',
            'focus:ring-4',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeStyles[size],
            stateStyles[state],
            className
          )}
          {...props}
        />

        <AnimatePresence mode="wait">
          {(hint || error || success) && (
            <motion.p
              key={error || success || hint}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                'text-sm',
                error && 'text-[#FF5252]',
                success && 'text-green-400',
                hint && !error && !success && 'text-slate-500'
              )}
            >
              {error || success || hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
