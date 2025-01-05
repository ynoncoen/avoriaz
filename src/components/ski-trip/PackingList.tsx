import React from 'react';
import {PackingListProps} from './types';
import {Checkbox} from '@/components/ui/checkbox';

const PackingList: React.FC<PackingListProps> = ({
                                                     title,
                                                     items,
                                                     checkedItems,
                                                     onToggleItem
                                                 }) => (
    <div>
        <h3 className="font-semibold mb-4 text-lg border-b pb-2">{title}</h3>
        <ul className="space-y-4 pl-4">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                    <Checkbox
                        id={`${title}-${item}`}
                        checked={checkedItems.includes(item)}
                        onCheckedChange={() => onToggleItem(item)}
                    />
                    <label
                        htmlFor={`${title}-${item}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    </div>
);

export default PackingList;