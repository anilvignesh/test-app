/**
 * Data Refresh Script
 * This script should be run weekly to update credit card information
 * Usage: npx ts-node scripts/refresh-data.ts
 *
 * Set up a cron job to run this weekly:
 * 0 0 * * 0 cd /path/to/card-genie && npx ts-node scripts/refresh-data.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function refreshCardData() {
  console.log('Starting data refresh...');
  console.log('Timestamp:', new Date().toISOString());

  try {
    // Update lastUpdated timestamp for all cards
    const result = await prisma.creditCard.updateMany({
      data: {
        lastUpdated: new Date(),
      },
    });

    console.log(`Updated ${result.count} cards`);

    // Here you would add logic to:
    // 1. Fetch updated card information from external sources
    // 2. Update card offers, benefits, fees, etc.
    // 3. Add new cards if available
    // 4. Mark deprecated cards

    // Example: Update offers for specific cards
    // This is where you'd integrate with external APIs or data sources

    console.log('Data refresh completed successfully');

    // Log the refresh in a separate table (optional)
    // await prisma.dataRefreshLog.create({
    //   data: {
    //     refreshedAt: new Date(),
    //     status: 'success',
    //   },
    // });

  } catch (error) {
    console.error('Error refreshing data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

refreshCardData();
