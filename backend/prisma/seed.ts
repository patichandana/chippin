import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Group Types
  const groupTypes = [
    { groupTypeName: 'Home' },
    { groupTypeName: 'Trip' },
    { groupTypeName: 'Friends' },
    { groupTypeName: 'Other' },
  ]

  for (const g of groupTypes) {
    await prisma.groupTypes.upsert({
      where: { groupTypeName: g.groupTypeName },
      update: {}, // no update needed for group types
      create: g,
    })
  }

  // Currencies
  const currencies = [
    { currencyName: 'US Dollar', code: 'USD', symbol: '$' },
    { currencyName: 'Indian Rupees', code: 'INR', symbol: '₹' },
    { currencyName: 'Canadian dollar', code: 'CAD', symbol: 'CA$' },
  ]

  for (const c of currencies) {
    await prisma.currencies.upsert({
      where: { code: c.code },
      update: { symbol: c.symbol }, // update symbol if changed
      create: c,
    })
  }

  console.log('✅ Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
