import { prisma } from "./index.js";

async function main() {
  console.log("🌱 Seeding Open Shopify Multi-Tenant Database...");

  // 1. Seed Store 1: Apex Apparel Co.
  const apexTenant = await prisma.tenant.upsert({
    where: { slug: "apex-apparel" },
    update: {},
    create: {
      id: "ten_apex_apparel",
      name: "Apex Apparel Co.",
      slug: "apex-apparel",
      domain: "apex-apparel.openshopify.local",
      currencyCode: "USD",
      plan: "ENTERPRISE",
    },
  });

  // 2. Seed Store 2: Karachi Tech Hub
  const karachiTenant = await prisma.tenant.upsert({
    where: { slug: "karachi-tech" },
    update: {},
    create: {
      id: "ten_karachi_tech",
      name: "Karachi Tech Hub",
      slug: "karachi-tech",
      domain: "karachi-tech.openshopify.local",
      currencyCode: "USD",
      plan: "PLUS",
    },
  });

  // 3. Seed Users
  await prisma.user.upsert({
    where: {
      tenantId_email: {
        tenantId: apexTenant.id,
        email: "admin@apexapparel.co",
      },
    },
    update: {},
    create: {
      tenantId: apexTenant.id,
      email: "admin@apexapparel.co",
      passwordHash: "pbkdf2_sha256$260000$openshopify$hashed",
      role: "OWNER",
    },
  });

  await prisma.user.upsert({
    where: {
      tenantId_email: {
        tenantId: karachiTenant.id,
        email: "tariq@karachilabs.io",
      },
    },
    update: {},
    create: {
      tenantId: karachiTenant.id,
      email: "tariq@karachilabs.io",
      passwordHash: "pbkdf2_sha256$260000$openshopify$hashed",
      role: "OWNER",
    },
  });

  // 4. Seed Theme Configs
  await prisma.themeConfig.upsert({
    where: { tenantId: apexTenant.id },
    update: {},
    create: {
      tenantId: apexTenant.id,
      themeName: "Obsidian Tech & Apparel",
      settings: {
        headline: "Engineered Essentials. Zero Compromise.",
        announcement: "Free Express Worldwide Shipping on Orders Over $150",
        accentColor: "#10b981",
        heroImage: "/assets/products/architect-overshirt.svg",
      },
    },
  });

  await prisma.themeConfig.upsert({
    where: { tenantId: karachiTenant.id },
    update: {},
    create: {
      tenantId: karachiTenant.id,
      themeName: "Cyberpunk Studio",
      settings: {
        headline: "High-Performance Peripherals & POS Systems.",
        announcement: "Karachi Same-Day Delivery | OmniShop POS Hardware in Stock",
        accentColor: "#38bdf8",
        heroImage: "/assets/products/smart-touch-pos.svg",
      },
    },
  });

  console.log("✅ Successfully seeded stores: Apex Apparel Co. & Karachi Tech Hub!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
