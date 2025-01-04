"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import PackingList from './PackingList';
import { packingData } from '@/data/packing-data';

const STORAGE_KEY = 'ski-trip-packing-list';

const PackingTab: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    // Load checked items from localStorage on component mount
    useEffect(() => {
        const savedItems = localStorage.getItem(STORAGE_KEY);
        if (savedItems) {
            setCheckedItems(JSON.parse(savedItems));
        }
    }, []);

    // Save checked items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    const handleToggleItem = (item: string) => {
        setCheckedItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const handleReset = () => {
        setCheckedItems([]);
    };

    const getProgress = () => {
        const totalItems = packingData.reduce((sum, category) => sum + category.items.length, 0);
        const checkedCount = checkedItems.length;
        return Math.round((checkedCount / totalItems) * 100);
    };

    return (
        <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Packing List</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                        Progress: {getProgress()}% packed
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleReset}
                    className="text-destructive hover:text-destructive"
                >
                    Reset Progress
                </Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packingData.map((category) => (
                            <PackingList
                                key={category.title}
                                title={category.title}
                                items={category.items}
                                checkedItems={checkedItems}
                                onToggleItem={handleToggleItem}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default PackingTab;