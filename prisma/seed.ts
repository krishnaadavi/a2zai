import { PrismaClient } from '@prisma/client';
import { glossaryTerms } from './seeds/glossary';
import { explainers } from './seeds/explainers';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Seed Glossary Terms
  console.log('📚 Seeding glossary terms...');
  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.upsert({
      where: { slug: term.slug },
      update: term,
      create: term,
    });
  }
  console.log(`   ✓ ${glossaryTerms.length} glossary terms seeded\n`);

  // Seed Explainers
  console.log('📖 Seeding AI 101 explainers...');
  for (const explainer of explainers) {
    await prisma.explainer.upsert({
      where: { slug: explainer.slug },
      update: explainer,
      create: explainer,
    });
  }
  console.log(`   ✓ ${explainers.length} explainers seeded\n`);

  console.log('✅ Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
