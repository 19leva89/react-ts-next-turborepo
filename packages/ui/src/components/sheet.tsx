'use client'

import { cn } from '@repo/ui/lib'
import { XIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

/**
 * Main sheet component wrapper for slide-out panel functionality
 * Handles sheet state management and accessibility features
 * @param props - Sheet component props
 * @param props.props - Props forwarded to SheetPrimitive.Root
 * @returns JSX element with sheet root container
 */
function Sheet({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot='sheet' {...props} />
}

/**
 * Sheet trigger component that opens the sheet when activated
 * Handles click events to trigger sheet opening with proper accessibility
 * @param props - Sheet trigger component props
 * @param props.props - All other props forwarded to SheetPrimitive.Trigger
 * @returns JSX element with sheet trigger button
 */
function SheetTrigger({ ...props }: ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

/**
 * Sheet close component for closing the sheet panel
 * Handles sheet dismissal with proper accessibility and focus management
 * @param props - Sheet close component props
 * @param props.props - All other props forwarded to SheetPrimitive.Close
 * @returns JSX element with sheet close button
 */
function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}

/**
 * Sheet portal component for rendering sheet content outside DOM hierarchy
 * Handles portal rendering to avoid z-index and overflow issues
 * @param props - Sheet portal component props
 * @param props.props - All other props forwarded to SheetPrimitive.Portal
 * @returns JSX element with portal container
 */
function SheetPortal({ ...props }: ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
}

/**
 * Sheet overlay component that provides backdrop for sheet panels
 * Handles backdrop styling with fade animations and click-to-close functionality
 * @param props - Sheet overlay component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to SheetPrimitive.Overlay
 * @returns JSX element with styled sheet backdrop
 */
function SheetOverlay({ className, ...props }: ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot='sheet-overlay'
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Sheet content component that contains the main sheet panel
 * Handles slide-out panel with configurable side positioning and built-in close button
 * @param props - Sheet content component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.children - Content to render inside sheet panel
 * @param props.side - Side from which sheet slides ('top', 'right', 'bottom', 'left')
 * @param props.props - All other props forwarded to SheetPrimitive.Content
 * @returns JSX element with positioned sheet panel and slide animations
 */
function SheetContent({
	className,
	children,
	side = 'right',
	...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left'
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot='sheet-content'
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
					side === 'right' &&
						'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
					side === 'left' &&
						'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
					side === 'top' &&
						'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
					side === 'bottom' &&
						'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
					className,
				)}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none'>
					<XIcon className='size-4' />
					<span className='sr-only'>Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</SheetPortal>
	)
}

/**
 * Sheet header component for organizing sheet title and description
 * Handles header layout with proper spacing for sheet content
 * @param props - Sheet header component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to div element
 * @returns JSX element with sheet header container
 */
function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
	return <div data-slot='sheet-header' className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
}

/**
 * Sheet footer component for action buttons and controls
 * Handles footer layout with automatic margin top for bottom alignment
 * @param props - Sheet footer component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to div element
 * @returns JSX element with sheet footer container
 */
function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div data-slot='sheet-footer' className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
	)
}

/**
 * Sheet title component for accessible sheet heading
 * Handles semantic sheet title with proper typography and accessibility attributes
 * @param props - Sheet title component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to SheetPrimitive.Title
 * @returns JSX element with sheet title heading
 */
function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot='sheet-title'
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	)
}

/**
 * Sheet description component for additional sheet context
 * Handles accessible sheet description with muted text styling
 * @param props - Sheet description component props
 * @param props.className - Additional CSS classes for styling customization
 * @param props.props - All other props forwarded to SheetPrimitive.Description
 * @returns JSX element with sheet description text
 */
function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot='sheet-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

export {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
}
