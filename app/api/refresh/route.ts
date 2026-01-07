import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API endpoint to manually trigger data refresh
 * This can be called by a cron service or manually
 *
 * Security: Add authentication or API key verification in production
 */
export async function POST(req: NextRequest) {
  try {
    // Optional: Verify API key or admin authentication
    const authHeader = req.headers.get('authorization');
    const expectedKey = process.env.REFRESH_API_KEY;

    if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update lastUpdated timestamp for all cards
    const result = await prisma.creditCard.updateMany({
      data: {
        lastUpdated: new Date(),
      },
    });

    // Here you would add logic to fetch and update card data
    // from external sources or admin-managed data

    return NextResponse.json({
      success: true,
      message: `Refreshed ${result.count} cards`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get the oldest lastUpdated timestamp to show when data was last refreshed
    const oldestCard = await prisma.creditCard.findFirst({
      orderBy: {
        lastUpdated: 'asc',
      },
      select: {
        lastUpdated: true,
      },
    });

    return NextResponse.json({
      lastRefreshed: oldestCard?.lastUpdated,
      status: 'ok',
    });
  } catch (error) {
    console.error('Error getting refresh status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
