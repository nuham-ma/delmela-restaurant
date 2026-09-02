const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = 'C:/Users/DELLL/.gemini/antigravity/brain/90dfc2d0-dd0c-4d7f-94cc-c3224a7d8325/.user_uploaded';
const outputDir = path.join(__dirname, '..', 'assets', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. All 16 Single high-resolution uncropped Branch / Place photos
const singlePlacePhotos = [
  { file: 'media_1788358124488.jpg', name: 'branch-bole-terracotta-tree-hall' },
  { file: 'media_1788358136757.jpg', name: 'branch-bole-dining-hall-guests' },
  { file: 'media_1788358150651.jpg', name: 'branch-exterior-illuminated-delmela-night' },
  { file: 'media_1788358163334.jpg', name: 'branch-bole-espresso-chandeliers-bar' },
  { file: 'media_1788358175302.jpg', name: 'branch-sarbet-brick-oven-banquette' },
  { file: 'media_1788358189076.jpg', name: 'branch-bole-main-hall-staff' },
  { file: 'media_1788358226533.jpg', name: 'branch-sarbet-brick-arch-window' },
  { file: 'media_1788358237430.jpg', name: 'branch-summit-glass-canopy-terrace' },
  { file: 'media_1788358266854.jpg', name: 'branch-sarbet-rustic-brick-corner' },
  { file: 'media_1788358278283.jpg', name: 'branch-bole-espresso-pastry-bar' },
  { file: 'media_1788358292522.jpg', name: 'branch-bole-dining-view-counter' },
  { file: 'media_1788358304545.jpg', name: 'branch-sarbet-brick-hallway-banquette' },
  { file: 'media_1788358319665.jpg', name: 'branch-bole-arched-mirrors-seating' },
  { file: 'media_1788358331384.jpg', name: 'branch-sarbet-arched-french-doors' },
  { file: 'media_1788358343787.jpg', name: 'branch-sarbet-pizza-oven-flames' },
  { file: 'media_1788358357759.jpg', name: 'branch-bole-wide-dining-perspective' }
];

// 2. Food & Beverage items from uncropped collage files
const foodCollages = [
  {
    file: 'media_1788350250688.jpg',
    cols: 2,
    rows: 2,
    items: [
      'dish-wrap-combo',
      'dish-sesame-chicken-bowl',
      'dish-acai-almond-bowl',
      'brand-cookies-shake-table'
    ]
  },
  {
    file: 'media_1788350265497.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-grilled-chicken-salad',
      'dish-belgian-waffle-strawberries',
      'drink-fresh-smoothies-trio',
      'dish-chicken-tikka-naan',
      'dish-curry-rice-flatbread',
      'dish-steak-avocado-sandwich'
    ]
  },
  {
    file: 'media_1788350275974.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-avocado-toast-eggs',
      'dish-caramel-apple-waffle',
      'dish-shakshuka-skillet',
      'dish-traditional-foul',
      'dish-mediterranean-chicken-salad',
      'branch-summit-exterior-rustic-patio'
    ]
  },
  {
    file: 'media_1788350286180.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-banana-crumble-waffle-leather',
      'dish-belgian-waffle-berries-cream',
      'dish-waffle-red-juice',
      'dish-philly-steak-ciabatta',
      'dish-crispy-chicken-wrap-sauce',
      'dish-handheld-grilled-wrap'
    ]
  },
  {
    file: 'media_1788350296778.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-crispy-chicken-burger',
      'dish-scrambled-egg-croissant',
      'dish-teriyaki-chicken-rice-1',
      'dish-teriyaki-chicken-rice-2',
      'dish-peanut-butter-oatmeal-bowl',
      'dish-protein-power-breakfast-bowl'
    ]
  },
  {
    file: 'media_1788350324352.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-table-spread-flatbread-curry',
      'dish-beetroot-avocado-grain-bowl',
      'dish-hummus-spiced-chicken',
      'dish-ethiopian-firfir-enjera',
      'drink-fresh-hibiscus-tea-pot',
      'dish-peanut-crumble-waffle'
    ]
  },
  {
    file: 'media_1788350332737.jpg',
    cols: 2,
    rows: 3,
    items: [
      'dish-chicken-wrap-wedges',
      'dish-chicken-karahi-flatbread',
      'dish-strawberry-fluffy-pancakes',
      'drink-chilled-watermelon-juice',
      'dish-shredded-chicken-rice-bowl',
      'dish-savory-egg-breakfast-waffle'
    ]
  },
  {
    file: 'media_1788350349711.jpg',
    cols: 2,
    rows: 3,
    items: [
      'interior-service-bar-espresso',
      'dish-caramel-banana-cream-waffle',
      'dish-avocado-eggs-paddle-board',
      'dish-rich-chicken-curry-rice',
      'dish-banana-strawberry-power-bowl',
      'dish-chicken-wrap-yellow-juice'
    ]
  }
];

async function processAll() {
  console.log('Processing all 16 single place photos + food collections at high quality...');
  let totalProcessed = 0;

  // Process all 16 single place photos
  for (const item of singlePlacePhotos) {
    const inputPath = path.join(uploadsDir, item.file);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const outWebp = path.join(outputDir, `${item.name}.webp`);
    const outJpg = path.join(outputDir, `${item.name}.jpg`);

    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(outWebp);

    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outJpg);

    totalProcessed++;
    console.log(`Saved full single place photo: ${item.name}.webp & .jpg`);
  }

  // Process food items
  for (const def of foodCollages) {
    const inputPath = path.join(uploadsDir, def.file);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    const cellWidth = Math.floor(width / def.cols);
    const cellHeight = Math.floor(height / def.rows);

    const marginX = Math.max(2, Math.floor(cellWidth * 0.008));
    const marginY = Math.max(2, Math.floor(cellHeight * 0.008));

    for (let r = 0; r < def.rows; r++) {
      for (let c = 0; c < def.cols; c++) {
        const index = r * def.cols + c;
        const name = def.items[index];
        if (!name) continue;

        const left = c * cellWidth + marginX;
        const top = r * cellHeight + marginY;
        const cropW = cellWidth - 2 * marginX;
        const cropH = cellHeight - 2 * marginY;

        const outWebp = path.join(outputDir, `${name}.webp`);
        const outJpg = path.join(outputDir, `${name}.jpg`);

        await sharp(inputPath)
          .extract({ left, top, width: cropW, height: cropH })
          .resize({ width: 1400, withoutEnlargement: true })
          .webp({ quality: 88 })
          .toFile(outWebp);

        await sharp(inputPath)
          .extract({ left, top, width: cropW, height: cropH })
          .resize({ width: 1400, withoutEnlargement: true })
          .jpeg({ quality: 88, mozjpeg: true })
          .toFile(outJpg);

        totalProcessed++;
        console.log(`Saved uncropped food item: ${name}.webp & .jpg`);
      }
    }
  }

  console.log(`Successfully processed total ${totalProcessed} images into ${outputDir}`);
}

processAll().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
