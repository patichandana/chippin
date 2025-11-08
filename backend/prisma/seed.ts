import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Group Types
  const groupTypes = [
    { group_type_name: 'Home' },
    { group_type_name: 'Trip' },
    { group_type_name: 'Friends' },
    { group_type_name: 'Other' },
  ]

  for (const g of groupTypes) {
    await prisma.groupTypes.upsert({
      where: { group_type_name: g.group_type_name },
      update: {}, // no update needed for group types
      create: g,
    })
  }

  // Currencies
  const currencies = [
    { currency_name: 'US Dollar', code: 'USD', symbol: '$' },
    { currency_name: 'Indian Rupees', code: 'INR', symbol: '₹' },
    { currency_name: 'Canadian dollar', code: 'CAD', symbol: 'CA$' },
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
