'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  CreditCard,
  Award,
  Plane,
  Fuel,
  Gift,
  Info,
  Plus,
  Check,
  X,
} from 'lucide-react';

interface CreditCardProps {
  card: any;
}

export default function CreditCardComponent({ card }: CreditCardProps) {
  const { data: session } = useSession();
  const [showDetails, setShowDetails] = useState(false);
  const [isInWallet, setIsInWallet] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleWallet = async () => {
    if (!session) {
      alert('Please login to add cards to your wallet');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wallet', {
        method: isInWallet ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id }),
      });

      if (response.ok) {
        setIsInWallet(!isInWallet);
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = () => {
    switch (card.category.toLowerCase()) {
      case 'travel':
        return <Plane className="w-5 h-5" />;
      case 'fuel':
        return <Fuel className="w-5 h-5" />;
      case 'rewards':
        return <Award className="w-5 h-5" />;
      case 'cashback':
        return <Gift className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      {/* Card Header */}
      <div className="card-gradient p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{card.name}</h3>
            <p className="text-sm opacity-90">{card.bank}</p>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
            {getCategoryIcon()}
            <span className="text-sm capitalize">{card.category}</span>
          </div>
        </div>
        <CreditCard className="w-12 h-12 opacity-80" />
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Key Features */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Annual Fee:</span>
            <span className="font-semibold">₹{card.annualFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Joining Fee:</span>
            <span className="font-semibold">₹{card.joiningFee.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex items-start space-x-2 text-sm">
            <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 line-clamp-2">{card.rewardPoints}</p>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <Plane className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 line-clamp-2">{card.loungeAccess}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>{showDetails ? 'Hide' : 'View'} Details</span>
          </button>
          {session && (
            <button
              onClick={toggleWallet}
              disabled={loading}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isInWallet
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : isInWallet ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="border-t bg-gray-50 p-6 space-y-4">
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Reward Points</h4>
            <p className="text-sm text-gray-700">{card.rewardPoints}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Welcome Benefits</h4>
            <p className="text-sm text-gray-700">{card.welcomeBenefits}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Lounge Access</h4>
            <p className="text-sm text-gray-700">{card.loungeAccess}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Fuel Benefits</h4>
            <p className="text-sm text-gray-700">{card.fuelBenefits}</p>
          </div>

          {card.offers && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Current Offers</h4>
              <p className="text-sm text-gray-700">{card.offers}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Other Benefits</h4>
            <p className="text-sm text-gray-700">{card.otherBenefits}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
            <p className="text-sm text-gray-700">{card.eligibility}</p>
          </div>
        </div>
      )}
    </div>
  );
}
