import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Fetch all cards to provide context
    const cards = await prisma.creditCard.findMany();

    // Create a context string with card information
    const cardsContext = cards
      .map(
        (card) =>
          `${card.name} (${card.bank}) - Category: ${card.category}, Annual Fee: ₹${card.annualFee}, ` +
          `Rewards: ${card.rewardPoints}, Lounge: ${card.loungeAccess}, Fuel: ${card.fuelBenefits}, ` +
          `Offers: ${card.offers}`
      )
      .join('\n');

    // If OpenAI is configured, use it
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Card Genie, an AI assistant that helps users find the best credit cards in India.
            You have access to information about various credit cards. Answer user questions about credit cards,
            recommend cards based on their needs, and provide detailed information about benefits, fees, and offers.

            Here are the available credit cards:
            ${cardsContext}

            When recommending cards, be specific about the card name and bank, and explain why it's a good fit.
            Keep responses concise but informative.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return NextResponse.json({
        response: completion.choices[0].message.content,
      });
    }

    // Fallback: Simple rule-based responses
    const lowerMessage = message.toLowerCase();
    let response = '';

    if (lowerMessage.includes('fuel')) {
      const fuelCards = cards.filter(
        (c) =>
          c.category === 'fuel' ||
          c.fuelBenefits.toLowerCase().includes('surcharge waiver')
      );
      response = `For fuel payments, I recommend:\n\n${fuelCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.fuelBenefits}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (
      lowerMessage.includes('lounge') ||
      lowerMessage.includes('airport')
    ) {
      const loungeCards = cards.filter((c) =>
        c.loungeAccess.toLowerCase().includes('complimentary')
      );
      response = `For lounge access, consider:\n\n${loungeCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.loungeAccess}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (
      lowerMessage.includes('cashback') ||
      lowerMessage.includes('cash back')
    ) {
      const cashbackCards = cards.filter((c) => c.category === 'cashback');
      response = `Best cashback cards:\n\n${cashbackCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.rewardPoints}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('travel')) {
      const travelCards = cards.filter((c) => c.category === 'travel');
      response = `Best travel cards:\n\n${travelCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.rewardPoints}\n  Lounge: ${c.loungeAccess}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('shopping')) {
      const shoppingCards = cards.filter((c) => c.category === 'shopping');
      response = `Best shopping cards:\n\n${shoppingCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.rewardPoints}\n  Offers: ${c.offers}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('rewards')) {
      const rewardCards = cards.filter((c) => c.category === 'rewards');
      response = `Best rewards cards:\n\n${rewardCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.rewardPoints}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('hdfc')) {
      const hdfcCards = cards.filter((c) => c.bank === 'HDFC Bank');
      response = `HDFC Bank cards:\n\n${hdfcCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name}: ${c.rewardPoints}\n  Category: ${c.category}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('sbi')) {
      const sbiCards = cards.filter((c) => c.bank === 'SBI Card');
      response = `SBI cards:\n\n${sbiCards
        .slice(0, 3)
        .map(
          (c) =>
            `• ${c.name}: ${c.rewardPoints}\n  Category: ${c.category}\n  Annual Fee: ₹${c.annualFee}`
        )
        .join('\n\n')}`;
    } else if (lowerMessage.includes('free') || lowerMessage.includes('no fee')) {
      const freeCards = cards.filter((c) => c.annualFee === 0);
      response = `Cards with no annual fee:\n\n${freeCards
        .map(
          (c) =>
            `• ${c.name} (${c.bank}): ${c.rewardPoints}\n  Category: ${c.category}`
        )
        .join('\n\n')}`;
    } else {
      response = `I can help you find the perfect credit card! Try asking me about:

• "Which card is best for fuel payments?"
• "Show me cards with lounge access"
• "What are the best cashback cards?"
• "Which cards have no annual fee?"
• "Best cards for shopping/travel/rewards"
• "Show me HDFC/SBI/ICICI cards"

What would you like to know?`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      {
        response:
          'Sorry, I encountered an error. Please try again or rephrase your question.',
      },
      { status: 500 }
    );
  }
}
