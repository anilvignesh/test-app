'use client';

import { useMemo } from 'react';
import CreditCardComponent from './CreditCard';

interface CardListProps {
  cards: any[];
  groupBy: 'bank' | 'category';
}

export default function CardList({ cards, groupBy }: CardListProps) {
  const groupedCards = useMemo(() => {
    const groups: { [key: string]: any[] } = {};

    cards.forEach((card) => {
      const key = groupBy === 'bank' ? card.bank : card.category;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    return groups;
  }, [cards, groupBy]);

  const sortedGroupKeys = Object.keys(groupedCards).sort();

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No credit cards found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedGroupKeys.map((groupKey) => (
        <div key={groupKey} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 capitalize border-b-2 border-purple-600 pb-2">
            {groupKey}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedCards[groupKey].map((card) => (
              <CreditCardComponent key={card.id} card={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
