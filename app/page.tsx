'use client';

import { useState, useEffect } from 'react';
import CardList from '@/components/CardList';
import SearchBar from '@/components/SearchBar';
import GroupingToggle from '@/components/GroupingToggle';
import ChatInterface from '@/components/ChatInterface';
import { CreditCard as CreditCardIcon } from 'lucide-react';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [groupBy, setGroupBy] = useState<'bank' | 'category'>('bank');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = cards.filter((card: any) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [searchQuery, cards]);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <div className="flex justify-center mb-4">
          <CreditCardIcon className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Card Genie
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your intelligent assistant for finding the perfect credit card in India.
          Compare benefits, rewards, and offers all in one place.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <GroupingToggle value={groupBy} onChange={setGroupBy} />
          <button
            onClick={() => setShowChat(!showChat)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showChat ? 'Hide' : 'Ask'} Card Genie AI
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <ChatInterface />
        </div>
      )}

      {/* Card List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading credit cards...</p>
        </div>
      ) : (
        <CardList cards={filteredCards} groupBy={groupBy} />
      )}
    </div>
  );
}
