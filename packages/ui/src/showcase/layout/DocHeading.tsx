export function DocHeading({
  level = 'h2',
  children
}: {
  level?: 'h2' | 'h3' | 'h4';
  children: string;
}) {
  const Tag = level;
  const styles = {
    h2: 'text-foreground mt-14 mb-4 text-xl font-medium tracking-tight',
    h3: 'text-foreground mt-10 mb-3 text-base font-medium',
    h4: 'text-foreground mt-6 mb-2 text-sm font-medium'
  };
  return <Tag className={styles[level]}>{children}</Tag>;
}
