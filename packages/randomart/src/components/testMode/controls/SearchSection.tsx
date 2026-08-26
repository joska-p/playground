import { Button, Input } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { setCategory, setQuery, useCategory, useQuery } from '../store';

const CATEGORIES = ['all', 'terminal', 'structural'] as const;

export function SearchSection() {
    const query = useQuery();
    const category = useCategory();

    return (
        <PanelSection
            label="search"
            defaultOpen
        >
            <Input
                placeholder="Search rules..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <div className="flex gap-1">
                {CATEGORIES.map((cat) => (
                    <Button
                        key={cat}
                        variant={category === cat ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => {
                            setCategory(cat);
                        }}
                        className="px-2 py-1 text-xs"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </PanelSection>
    );
}
