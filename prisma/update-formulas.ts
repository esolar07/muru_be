import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Formula details data extracted from the provided text
const formulaDetails = {
  'agastache_tummy_syrup': {
    name4: 'Muru Calm Stomach Syrup',
    shortDescription: 'Fast relief for sudden nausea, queasy stomach, and "travel tummy."',
    supports: 'sudden upset stomach; nausea/vomiting; loose stools; morning queasiness.',
    specialDetails: 'Gentle, pleasant‑tasting syrup that helps settle the stomach and clear damp discomfort.',
    extraDetails: 'Generally pregnancy‑friendly for morning queasiness. Avoid if you feel hot, inflamed, or have a high fever. Follow label directions.'
  },
  'ease_digestion_formula': {
    name4: 'Muru Tummy Rescue',
    shortDescription: 'Go‑to for "I ate the wrong thing."',
    supports: 'sudden gastrointestinal discomfort; mild food/restaurant reactions; bloating; indigestion.',
    specialDetails: 'A practical, fast‑acting blend for acute tummy turbulence when you need quick support.',
    extraDetails: 'Short‑term use during flare‑ups. Follow label directions.'
  },
  'earth_harmonizing_formula': {
    name4: 'Muru Daily Digestive Harmony',
    shortDescription: 'Everyday support for refluxy, bloated, or stress‑tied digestion.',
    supports: 'reflux/heartburn tendencies; belching/bloating; on‑off constipation/loose stools; stress‑sensitive stomachs.',
    specialDetails: 'Helps harmonize the "wood–earth" dynamic so your gut feels calm and steady.',
    extraDetails: 'Designed for ongoing support; pair with balanced meals and mindful eating.'
  },
  'intestinal_fungus_formula': {
    name4: 'Muru Gut Balance Cleanse',
    shortDescription: 'Helps reset the gut environment when things feel "off."',
    supports: 'post‑antibiotic imbalance; candida‑like patterns; bloating; irregular stools; rectal itch.',
    specialDetails: 'Targets damp‑heat congestion while supporting a clearer, calmer gut rhythm.',
    extraDetails: 'May loosen stools—adjust your serving if needed. Short‑term use unless advised by a practitioner.'
  },
  'andrographis_formula': {
    name4: 'Muru Rapid Heat Relief',
    shortDescription: 'Intense, short‑term support when throat and temperature run hot.',
    supports: 'hot, scratchy throat; swollen glands; "coming on strong" seasonal challenges.',
    specialDetails: 'A powerful, cooling botanical for acute "heat" patterns.',
    extraDetails: 'Very cooling; use short‑term. Not ideal if you run cold or have a sensitive digestion.'
  },
  'coptis_relieve_toxicity': {
    name4: 'Muru Deep Heat Clear',
    shortDescription: 'Clears deep, stubborn "heat" congestion.',
    supports: 'strong internal heat with irritability/redness; breakouts; hot digestive flare‑ups.',
    specialDetails: 'Potent, targeted cooling for short courses.',
    extraDetails: 'Not for pregnancy or nursing; not for long‑term daily use. If dryness or fatigue appears, discontinue.'
  },
  'siler_platycodon_formula': {
    name4: 'Muru Fever Flush',
    shortDescription: 'For hot, backed‑up colds when you feel "stuck and flushed."',
    supports: 'high‑heat head colds; heat with sluggish bowels; hot skin rashes that accompany colds.',
    specialDetails: 'Vents the exterior while moving heat down and out.',
    extraDetails: 'Short‑term only. If symptoms are severe or worsening, seek clinical care.'
  },
  'cinnamon_twig_formula': {
    name4: 'Muru Wind‑Cold Comfort',
    shortDescription: 'Gentle help for drafty chills with light sweat and stiff neck.',
    supports: 'wind‑cold sensitivity; low‑grade fever/chills; achy neck/shoulders; spontaneous sweat without relief.',
    specialDetails: 'Balances surface defenses and deeper resilience.',
    extraDetails: 'Not for "cold outside, hot inside" presentations; discontinue if strong heat signs appear.'
  },
  'xanthium_magnolia': {
    name4: 'Muru Clear Passage Sinus',
    shortDescription: 'Opens stubborn, blocked sinuses and constant drip.',
    supports: 'heavy congestion; copious clear discharge; post‑nasal drip; sinus pressure.',
    specialDetails: 'Warms and unblocks to restore clear nasal airflow.',
    extraDetails: 'Avoid in pregnancy. Best used in short bursts during flare‑ups.'
  },
  'ling_zhi_lung': {
    name4: 'Muru Easy Breath Lung Support',
    shortDescription: 'Steady support for wheezy, tight breathing—without the fever.',
    supports: 'allergic or post‑viral wheeze; exertional tightness; phlegmy chest without heat.',
    specialDetails: 'Calms the chest and helps clear phlegm so breathing feels easier.',
    extraDetails: 'Not for pneumonia, high fever, or "lung fire" presentations. If you\'re unsure, consult a clinician.'
  },
  'curcuma_longa_complex': {
    name4: 'Muru Inflamma‑Ease',
    shortDescription: 'Cooling comfort for warm, puffy, irritated joints.',
    supports: 'hot/inflamed joints; systemic irritation; sensitive nerves; post‑activity stiffness.',
    specialDetails: 'Turmeric‑forward synergy to cool, soothe, and keep you moving.',
    extraDetails: 'Can be paired with warming joint formulas if heat is not present.'
  },
  'chase_wind_penetrate_bone': {
    name4: 'Muru Joint Flow Warmth',
    shortDescription: 'Loosens cold, stiff, weather‑sensitive joints.',
    supports: 'multiple achy/stiff joints; chronic back stiffness; cold‑sensitive knees.',
    specialDetails: 'Warms and moves to restore comfortable mobility.',
    extraDetails: 'Avoid in pregnancy and when joints are hot/red. If heat shows up, switch to Inflamma‑Ease.'
  },
  'duhuo_loranthus': {
    name4: 'Muru Lower Back Comfort',
    shortDescription: 'Deep support for cold, achy lower back and legs.',
    supports: 'chronic low back/knee soreness; stiffness; weakness aggravated by cold.',
    specialDetails: 'Nourishes while dispersing stagnation in the lower body.',
    extraDetails: 'Use with care in pregnancy. Pair with gentle movement and core work.'
  },
  'bone_sinew_formula': {
    name4: 'Muru Rebuild & Recover',
    shortDescription: 'Structural support during the rebuild phase.',
    supports: 'later‑stage recovery from strains, tears, fractures, or cartilage wear.',
    specialDetails: 'Targets bones, tendons, and connective tissues during healing.',
    extraDetails: 'Not for pregnancy. Best after the hot, swollen stage has passed.'
  },
  'trauma_1': {
    name4: 'Muru Acute Swell Soothe',
    shortDescription: 'First‑aid support for fresh bumps, bruises, and swelling.',
    supports: 'red, hot, swollen injuries right after they happen.',
    specialDetails: 'Formulated for the acute stage to calm heat and swelling.',
    extraDetails: 'Not for pregnancy or nursing. Seek care for severe injuries.'
  },
  'tieh_ta': {
    name4: 'Muru Bruise & Sprain Relief',
    shortDescription: 'Classic mover for bruises, sprains, and sore tissues.',
    supports: 'bruising; sprains/strains; tendon stress; post‑op soreness.',
    specialDetails: 'Moves stagnation to ease discomfort and support recovery.',
    extraDetails: 'Not for pregnancy or nursing. If a fracture is suspected, get medical evaluation.'
  },
  'restorative_formula': {
    name4: 'Muru Comfort & Restore',
    shortDescription: 'Daily comfort for achy, low‑energy bodies.',
    supports: 'deficiency‑dominant aches; tender nerves; fibromyalgia‑like patterns; elderly discomfort.',
    specialDetails: 'A balanced, nourishing base for whole‑body ease.',
    extraDetails: 'Gentle enough for ongoing support—use consistently for best results.'
  },
  'bupleurum_tang_kuei': {
    name4: 'Muru Cycle Soothe Mood',
    shortDescription: 'Evens out mood and tension around your cycle.',
    supports: 'PMS irritability; breast tenderness; cycle‑linked fatigue; stressy digestion.',
    specialDetails: 'Harmonizes the stress–digestion link to smooth monthly ups and downs.',
    extraDetails: 'If strong heat or infection‑like signs are present, choose a cooling formula instead.'
  },
  'chong_release': {
    name4: 'Muru Period Flow Comfort',
    shortDescription: 'Comfort for crampy periods with "stuck" flow.',
    supports: 'cramps with dark clots; stop‑start flow; pelvic congestion sensations.',
    specialDetails: 'Encourages a smoother, more comfortable monthly rhythm.',
    extraDetails: 'Not for pregnancy. Stop and seek care with heavy/prolonged bleeding.'
  },
  'cinnamon_poria': {
    name4: 'Muru Stuck Flow Support',
    shortDescription: 'For fixed, stubborn lower‑abdominal tension.',
    supports: 'cyclical pelvic tension; feelings of "fixed" stagnation.',
    specialDetails: 'Time‑honored support for dispersing long‑standing congestion.',
    extraDetails: 'Not for pregnancy or nursing. Use with practitioner guidance for complex cases.'
  },
  'tang_kuei_peony': {
    name4: 'Muru Gentle Mama Tonic',
    shortDescription: 'Soft, steady nourishment for pregnancy and postpartum.',
    supports: 'mild, constant abdominal tension; edema; postpartum rebuild; gentle cycle support.',
    specialDetails: 'A classic, gentle tonic for expecting or new mothers.',
    extraDetails: 'Designed to be pregnancy‑friendly. Always follow your clinician\'s advice.'
  },
  'immortal_valley': {
    name4: 'Muru Fresh Balance Feminine',
    shortDescription: 'Clears "damp‑heat" discomfort in sensitive areas.',
    supports: 'yellow, odorous discharge patterns; intimate itch/irritation feelings.',
    specialDetails: 'Targets lower‑body clarity and comfort.',
    extraDetails: 'Not for pregnancy; not ideal for cold/low‑energy patterns—choose a warming tonic instead if that\'s you.'
  },
  'two_immortals': {
    name4: 'Muru Cool Change Menopause',
    shortDescription: 'Calm, cool, collected through the change.',
    supports: 'hot flashes; night sweats; sleep swings; mood fluctuations; menopausal fatigue.',
    specialDetails: 'Balances fire and nourishment for a steadier transition.',
    extraDetails: 'Can be your daily base; layer sleep or mood support as needed.'
  },
  'womens_precious': {
    name4: 'Muru Women\'s Deep Replenish',
    shortDescription: 'Rebuilds what monthly life takes out.',
    supports: 'qi & blood depletion feelings—fatigue, pale look, light or irregular cycles.',
    specialDetails: 'A beloved classic for deep nourishment and steadier energy.',
    extraDetails: 'Not for pregnancy. If you run hot at night, check with a practitioner before use.'
  },
  'an_mien': {
    name4: 'Muru Calm Night Sleep',
    shortDescription: 'Settle the heart, quiet the mind.',
    supports: 'trouble falling asleep; anxious flutters; vivid, busy dreams.',
    specialDetails: 'Soothing botanicals to bring nighttime ease.',
    extraDetails: 'Avoid during acute infections or if you feel hot/agitated; consider a cooling formula first.'
  },
  'ginseng_longan': {
    name4: 'Muru Focus & Fortify',
    shortDescription: 'Steadier focus, calmer nerves, happier gut.',
    supports: 'mental fog with fatigue; light palpitations; sensitive digestion; postpartum rebuild.',
    specialDetails: 'Supports the "spleen–heart" axis for clear focus without jitters.',
    extraDetails: 'Gentle for longer‑term use; pair with regular meals and rest.'
  },
  'ginseng_endurance': {
    name4: 'Muru Daily Stamina',
    shortDescription: 'Clean, sustained energy—no wired edge.',
    supports: 'workouts; busy seasons; post‑illness bounce‑back; low resilience to stress.',
    specialDetails: 'Classic adaptogenic profile to lift capacity and recovery.',
    extraDetails: 'Skip during feverish/cold onset days; avoid if you have signs of internal heat from low fluids.'
  },
  'eight_immortals': {
    name4: 'Muru Yin Nourish',
    shortDescription: 'Cool moisture from the inside out.',
    supports: 'dry mouth/throat; night warmth; dry, weak cough; "deficient heat" feelings.',
    specialDetails: 'Replenishes yin so you feel soothed and hydrated.',
    extraDetails: 'Not ideal if you already feel cold or chilled easily.'
  },
  'seven_treasures': {
    name4: 'Muru Root & Shine Hair',
    shortDescription: 'Hair support that starts at the root.',
    supports: 'thinning or early grays alongside lower‑back/knee fatigue signs.',
    specialDetails: 'Nourishes essence and blood—the deep reserves linked with hair vitality.',
    extraDetails: 'If your tongue coat is thick or stools are loose, this may not be your best first choice.'
  },
  'hawthorn_fennel': {
    name4: 'Muru Light & Lean',
    shortDescription: 'Feel lighter after meals.',
    supports: 'bloating; sluggish metabolism feelings; mild constipation; water retention feelings.',
    specialDetails: 'Helps move food along while supporting a comfortable waistline.',
    extraDetails: 'Not for pregnancy or nursing. Pause if diarrhea appears.'
  },
  'amber_stone_transforming': {
    name4: 'Muru Urinary Flow Ease',
    shortDescription: 'Smooths urinary flow when things feel gritty or tight.',
    supports: 'temporary urinary discomfort; pressure sensations; flow that feels obstructed.',
    specialDetails: 'Focused lower‑tract support for short courses.',
    extraDetails: 'Not for pregnancy. Seek medical care for severe pain, fever, or blood.'
  },
  'tang_kuei_tribulus': {
    name4: 'Muru Skin Soothe & Calm',
    shortDescription: 'Quiets dry, itchy, irritation‑prone skin from within.',
    supports: 'dryness with itch; flaky rashes; blood‑deficiency type irritation.',
    specialDetails: 'Nourishes the blood to support comfortable, supple skin.',
    extraDetails: 'Not for pregnancy. Combine with a bland, hydrating topical routine.'
  }
};

async function updateFormulas() {
  console.log('Starting formula updates...');

  for (const [formulaName, details] of Object.entries(formulaDetails)) {
    try {
      const result = await prisma.formula.update({
        where: { name: formulaName },
        data: {
          name4: details.name4,
          shortDescription: details.shortDescription,
          supports: details.supports,
          specialDetails: details.specialDetails,
          extraDetails: details.extraDetails
        }
      });
      console.log(`✓ Updated: ${formulaName} -> ${details.name4}`);
    } catch (error) {
      console.error(`✗ Failed to update ${formulaName}:`, error);
    }
  }

  console.log('\nFormula updates complete!');
}

updateFormulas()
  .catch((e) => {
    console.error('Error updating formulas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
