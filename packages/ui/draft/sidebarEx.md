import React from 'react';
import { cn } from '../../../utils/cn';

export type SidebarPlacement = 'top' | 'bottom' | 'left' | 'right';

export type SidebarProps = React.ComponentPropsWithoutRef<'div'> & {
children: React.ReactNode;
isOpen?: boolean;
placement?: SidebarPlacement;
};

export type SidebarSubComponentProps = React.ComponentPropsWithoutRef<'div'>;

export function Sidebar({
children,
className,
isOpen = true,
placement = 'left',
...props
}: SidebarProps) {
return (
<div
data-sidebar-open={isOpen}
data-sidebar-placement={placement}
className={cn(
// Core Layout Context
"grid w-full h-screen transition-[grid-template-columns,grid-template-rows] duration-300 ease-in-out bg-background text-foreground",

        // --- 1. LEFT PLACEMENT ---
        "data-[sidebar-placement=left]:grid-cols-[20rem_1fr] data-[sidebar-placement=left]:grid-rows-1",
        "data-[sidebar-placement=left][data-sidebar-open=false]:grid-cols-[0rem_1fr]",

        // --- 2. RIGHT PLACEMENT ---
        "data-[sidebar-placement=right]:grid-cols-[1fr_20rem] data-[sidebar-placement=right]:grid-rows-1",
        "data-[sidebar-placement=right][data-sidebar-open=false]:grid-cols-[1fr_0rem]",

        // --- 3. TOP PLACEMENT ---
        "data-[sidebar-placement=top]:grid-rows-[16rem_1fr] data-[sidebar-placement=top]:grid-cols-1",
        "data-[sidebar-placement=top][data-sidebar-open=false]:grid-rows-[0rem_1fr]",

        // --- 4. BOTTOM PLACEMENT ---
        "data-[sidebar-placement=bottom]:grid-rows-[1fr_16rem] data-[sidebar-placement=bottom]:grid-cols-1",
        "data-[sidebar-placement=bottom][data-sidebar-open=false]:grid-rows-[1fr_0rem]",

        className
      )}
      {...props}
    >
      {children}
    </div>

);
}

Sidebar.Panel = function SidebarPanel({ children, className, ...props }: SidebarSubComponentProps) {
return (
<aside
className={cn(
// Solid Gruvbox design aesthetics from your CSS variables
"bg-card text-card-foreground border-border min-w-0 min-h-0 overflow-hidden transition-colors duration-200",

        // Match borders and positioning strictly using modern parent state queries
        "group-data-[sidebar-placement=left]:border-r group-data-[sidebar-placement=left]:order-first group-data-[sidebar-placement=left]:h-full",
        "group-data-[sidebar-placement=right]:border-l group-data-[sidebar-placement=right]:order-last group-data-[sidebar-placement=right]:h-full",
        "group-data-[sidebar-placement=top]:border-b group-data-[sidebar-placement=top]:order-first group-data-[sidebar-placement=top]:w-full",
        "group-data-[sidebar-placement=bottom]:border-t group-data-[sidebar-placement=bottom]:order-last group-data-[sidebar-placement=bottom]:w-full",

        className
      )}
      {...props}
    >
      {/* The isolated sub-viewport layout anchor ensures component boundaries don't
        collapse or cause layout shifting during transition states.
      */}
      <div className={cn(
        "h-full w-full overflow-auto p-4",
        "group-data-[sidebar-placement=left]:w-80",
        "group-data-[sidebar-placement=right]:w-80",
        "group-data-[sidebar-placement=top]:h-64",
        "group-data-[sidebar-placement=bottom]:h-64"
      )}>
        {children}
      </div>
    </aside>

);
};

Sidebar.Main = function SidebarMain({ children, className, ...props }: SidebarSubComponentProps) {
return (
<main
className={cn(
"w-full h-full min-w-0 min-h-0 overflow-hidden",
// Forces the canvas layout viewport to safely share remaining grid space
"group-data-[sidebar-placement=left]:order-last",
"group-data-[sidebar-placement=right]:order-first",
"group-data-[sidebar-placement=top]:order-last",
"group-data-[sidebar-placement=bottom]:order-first",
className
)}
{...props} >
{children}
</main>
);
};
