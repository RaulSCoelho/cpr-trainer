import { SlotsToClasses } from '@/utils/types'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { VariantProps, tv } from 'tailwind-variants'

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof button> {
  classNames?: SlotsToClasses<keyof ReturnType<typeof button>>
}

export const button = tv({
  slots: {
    base: 'py-1.5 px-2',
    text: 'text-white'
  },
  variants: {
    color: {
      primary: { base: 'bg-blue-500' },
      secondary: { base: 'bg-green-500' }
    },
    radius: {
      sm: { base: 'rounded-sm' },
      md: { base: 'rounded-md' },
      lg: { base: 'rounded-lg' }
    }
  },
  defaultVariants: {
    color: 'primary',
    radius: 'md'
  }
})

export function Button({ children, color, radius, classNames, className, ...rest }: ButtonProps) {
  const { base, text } = button({ color, radius })

  return (
    <TouchableOpacity className={base({ class: [classNames?.base, className] })} {...rest}>
      <Text className={text({ class: classNames?.text })}>{children}</Text>
    </TouchableOpacity>
  )
}
