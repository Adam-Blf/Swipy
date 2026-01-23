import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'genius' | 'cyan' | 'outline'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  rounded?: 'default' | 'full'
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-lg shadow-primary-500/25',
  secondary: 'bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white',
  ghost: 'bg-transparent hover:bg-white/10 active:bg-white/20 text-white border border-white/20',
  danger: 'bg-[#FF5252] hover:bg-[#FF1744] active:bg-red-700 text-white shadow-lg shadow-[#FF5252]/25',
  success: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-lg shadow-green-500/25',
  genius: 'bg-gradient-genius text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50',
  cyan: 'bg-[#00E5FF] hover:bg-[#00B8D4] active:bg-[#0097A7] text-slate-900 font-bold shadow-lg shadow-[#00E5FF]/25',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 active:bg-primary-500/20'
}

const sizes: Record<ButtonSize, string> = {
  xs: 'py-1.5 px-3 text-xs rounded-lg',
  sm: 'py-2 px-4 text-sm rounded-lg',
  md: 'py-3 px-6 text-base rounded-xl',
  lg: 'py-4 px-8 text-lg rounded-xl',
  xl: 'py-5 px-10 text-xl rounded-2xl'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = 'default',
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'font-semibold transition-all duration-200 ease-out',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
          'active:scale-95',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          rounded === 'full' && 'rounded-full',
          className
        )}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// Icon button variant
interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: React.ReactNode
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const iconSizes: Record<ButtonSize, string> = {
      xs: 'w-7 h-7',
      sm: 'w-9 h-9',
      md: 'w-11 h-11',
      lg: 'w-14 h-14',
      xl: 'w-16 h-16'
    }

    return (
      <Button
        ref={ref}
        size={size}
        rounded="full"
        className={cn('!p-0', iconSizes[size], className)}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'
