import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userCards = await prisma.userCard.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        card: true,
      },
    });

    return NextResponse.json(userCards.map((uc) => uc.card));
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId } = await req.json();

    const userCard = await prisma.userCard.create({
      data: {
        userId: (session.user as any).id,
        cardId,
      },
    });

    return NextResponse.json(userCard);
  } catch (error) {
    console.error('Error adding card to wallet:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId } = await req.json();

    await prisma.userCard.deleteMany({
      where: {
        userId: (session.user as any).id,
        cardId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing card from wallet:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
