import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const categories = [
  { name: 'digestive', details: '' },
  { name: 'heat_toxin', details: '' },
  { name: 'exterior_cold', details: '' },
  { name: 'allergies_sinus', details: '' },
  { name: 'respiratory_asthma', details: '' },
  { name: 'inflammation_pain', details: '' },
  { name: 'joints_bi', details: '' },
  { name: 'trauma_healing', details: '' },
  { name: 'trauma_acute', details: '' },
  { name: 'trauma_general', details: '' },
  { name: 'womens_pms_mood', details: '' },
  { name: 'womens_blood_stasis', details: '' },
  { name: 'womens_masses', details: '' },
  { name: 'womens_tonic_pregnancy', details: '' },
  { name: 'womens_damp_heat', details: '' },
  { name: 'menopause', details: '' },
  { name: 'sleep_anxiety', details: '' },
  { name: 'sleep_concentration_qi_blood_xu', details: '' },
  { name: 'yin_deficiency', details: '' },
  { name: 'stamina_adaptogen', details: '' },
  { name: 'aging_pain_deficiency', details: '' },
  { name: 'hair_essence', details: '' },
  { name: 'weight_metabolism', details: '' },
  { name: 'urinary_stones', details: '' },
  { name: 'qi_blood_tonic', details: '' },
];

const formulasData = [
  { id: "agastache_tummy_syrup", name: "Agastache Tummy Syrup (Huo Xiang Zheng Qi Gao)", category: "digestive" },
  { id: "ease_digestion", name: "Ease Digestion Formula (Jia Wei Kang Ning Wan)", category: "digestive" },
  { id: "earth_harmonizing", name: "Earth Harmonizing Formula (He Tu Pian)", category: "digestive" },
  { id: "intestinal_fungus", name: "Intestinal Fungus Formula (Chang Mei Jun Fang)", category: "digestive" },
  { id: "andrographis", name: "Andrographis Formula (Chuan Xin Lian Kang Yan Pian)", category: "heat_toxin" },
  { id: "coptis_relieve_toxicity", name: "Coptis Relieve Toxicity Formula (Huang Lian Jie Du Pian)", category: "heat_toxin" },
  { id: "siler_platycodon", name: "Siler & Platycodon Formula (Fang Feng Tong Sheng San)", category: "heat_toxin" },
  { id: "cinnamon_twig", name: "Cinnamon Twig Formula (Gui Zhi Tang)", category: "exterior_cold" },
  { id: "xanthium_magnolia", name: "Xanthium & Magnolia Formula (Jia Wei Xin Yi San)", category: "allergies_sinus" },
  { id: "ling_zhi_lung", name: "Ling Zhi Lung Formula (Ling Zhi Fei Pian)", category: "respiratory_asthma" },
  { id: "curcuma_longa", name: "Curcuma Longa Formula (Jiang Huang Wan)", category: "inflammation_pain" },
  { id: "chase_wind_penetrate_bone", name: "Chase Wind, Penetrate Bone (Zhui Feng Tou Gu Wan)", category: "joints_bi" },
  { id: "duhuo_loranthus", name: "Duhuo & Loranthus (Du Huo Ji Sheng Tang)", category: "joints_bi" },
  { id: "bone_sinew", name: "Bone & Sinew Formula (Zheng Gu Xu Jin Fang)", category: "trauma_healing" },
  { id: "trauma_1", name: "Trauma 1 (Die Da 1 Hao Fang)", category: "trauma_acute" },
  { id: "tieh_ta", name: "Tieh Ta (Die Da Wan)", category: "trauma_general" },
  { id: "bupleurum_tang_kuei", name: "Bupleurum & Tang Kuei (Xiao Yao Wan)", category: "womens_pms_mood" },
  { id: "chong_release", name: "Chong Release (Jia Wei Tao Hong Si Wu Tang)", category: "womens_blood_stasis" },
  { id: "cinnamon_poria", name: "Cinnamon & Poria (Gui Zhi Fu Ling Wan modification)", category: "womens_masses" },
  { id: "tang_kuei_peony", name: "Tang Kuei & Peony (Dang Gui Shao Yao San)", category: "womens_tonic_pregnancy" },
  { id: "immortal_valley", name: "Immortal Valley (Xian Gu Fang)", category: "womens_damp_heat" },
  { id: "two_immortals", name: "Two Immortals (Jia Jian Er Xian Tang)", category: "menopause" },
  { id: "an_mien", name: "An Mien (An Mien Pian)", category: "sleep_anxiety" },
  { id: "ginseng_longan", name: "Ginseng & Longan (Gui Pi Tang)", category: "sleep_concentration_qi_blood_xu" },
  { id: "eight_immortals", name: "Eight Immortals (Ba Xian Chang Shou Wan)", category: "yin_deficiency" },
  { id: "ginseng_endurance", name: "Ginseng Endurance (Ren Shen Pian)", category: "stamina_adaptogen" },
  { id: "restorative", name: "Restorative Formula (Yang Xue Zhuang Jin Jian Bu Wan)", category: "aging_pain_deficiency" },
  { id: "seven_treasures", name: "Seven Treasures (Jin Hua Mei Ran Wan)", category: "hair_essence" },
  { id: "hawthorn_fennel", name: "Hawthorn & Fennel (Shan Zha Xiao Hui Xiang Fang)", category: "weight_metabolism" },
  { id: "amber_stone_transforming", name: "Amber Stone‑Transforming (Hu Po Hua Shi Pian)", category: "urinary_stones" },
  { id: "womens_precious", name: "Women's Precious (Ba Zhen Tang)", category: "qi_blood_tonic" },
];

const symptomsData = [
  { category: "digestive", prefer: ["sudden_onset","nausea","vomiting","external_cold","dampness","morning_sickness","diarrhea"], support: ["bloating","lack_appetite","wind_damp_headache_or_ear_pain"] },
  { category: "digestive", prefer: ["gastroenteritis","vomiting_and_diarrhea","mild_food_poisoning","hangover"], support: ["abdominal_distension","heartburn","indigestion"] },
  { category: "digestive", prefer: ["acid_reflux","bloating","belching","epigastric_pain","foul_taste","constipation_or_diarrhea","chronic"], support: ["stress_related","liver_qi_invading_spleen_stomach"] },
  { category: "digestive", prefer: ["candida","post_antibiotics","leaky_gut","diarrhea","abdominal_bloating","rectal_itching"], support: ["food_poisoning","giardia","stomach_flu"] },
  { category: "heat_toxin", prefer: ["acute_fever","sore_throat","viral","bacterial","lymph_swollen","tonsillitis","uti","resp_infection"], support: ["hepatitis","skin_infection"] },
  { category: "heat_toxin", prefer: ["liver_heat","heart_heat","heat_toxin","acne","ulcer","strep_throat","tonsillitis","diarrhea_heat","gastritis_acute"], support: ["bad_breath","irritability"] },
  { category: "heat_toxin", prefer: ["fever_high","constipation_with_fever","hot_red_skin_rash","red_painful_eyes","acute_bronchitis","influenza_heat_type"], support: ["viral_infection","sore_throat"] },
  { category: "exterior_cold", prefer: ["wind_cold_invasion","spontaneous_sweating_no_relief","aversion_to_wind","low_grade_fever","neck_stiffness"], support: [] },
  { category: "allergies_sinus", prefer: ["severe_nasal_congestion","copious_clear_discharge","post_nasal_drip","sinus_pain"], support: [] },
  { category: "respiratory_asthma", prefer: ["asthma","wheezing","labored_breathing_exertion","allergic_asthma","post_viral_wheeze","no_fever"], support: [] },
  { category: "inflammation_pain", prefer: ["systemic_inflammation","warm_hot_swollen_joints","rheumatoid_arthritis","red_itchy_eyes","allergies_with_inflammation","neuropathy","trauma_inflammation"], support: ["lymph_swollen","gastritis","gout","sinus_inflammation"] },
  { category: "joints_bi", prefer: ["joint_pain_stiff_swollen_multiple","chronic_back_stiffness","weak_knees"], support: [] },
  { category: "joints_bi", prefer: ["chronic_lower_back_leg_pain","weakness_stiffness","arthritis_lower_body","cold_back_knees"], support: [] },
  { category: "trauma_healing", prefer: ["later_stage_trauma","torn_ligaments_tendons","fractures","cartilage_damage"], support: [] },
  { category: "trauma_acute", prefer: ["first_stage_trauma","acute_red_hot_swollen_painful_injury"], support: [] },
  { category: "trauma_general", prefer: ["bruises","sprains","torn_ligaments","fractures","post_op_pain"], support: [] },
  { category: "womens_pms_mood", prefer: ["pms","irritability","mood_swings","breast_tenderness","irregular_menses","fatigue","liver_qi_stagnation"], support: ["nausea","weight_loss_unintended"] },
  { category: "womens_blood_stasis", prefer: ["period_pain_dark_clots","starts_and_stops_flow","pelvic_congestion","irregular_cycles","infertility_with_stasis"], support: [] },
  { category: "womens_masses", prefer: ["fixed_abdominal_mass","fibroids","ovarian_cysts","fixed_stabbing_pain","lower_abdominal_tension","prostate_enlarged"], support: ["night_sweats"] },
  { category: "womens_tonic_pregnancy", prefer: ["pregnancy_tonic","postpartum_tonic","mild_constant_abdominal_pain","edema","pms","irregular_menses"], support: [] },
  { category: "womens_damp_heat", prefer: ["yellow_odorous_discharge","vaginitis","cervical_dysplasia","hpv_related","vulvar_itch_pain"], support: [] },
  { category: "menopause", prefer: ["hot_flashes","night_sweats","insomnia","emotional_instability","fatigue","hypertension_menopausal"], support: [] },
  { category: "sleep_anxiety", prefer: ["insomnia","palpitations","anxiety","emotional_fragility","dream_disturbed_sleep"], support: [] },
  { category: "sleep_concentration_qi_blood_xu", prefer: ["poor_concentration","memory_poor","anxiety","insomnia","palpitations","postpartum_qi_blood_deficiency"], support: ["poor_appetite","easily_bruised"] },
  { category: "yin_deficiency", prefer: ["dry_weak_cough","shortness_of_breath_chronic","night_sweats","hot_palms","dry_mouth_throat","yin_deficiency"], support: [] },
  { category: "stamina_adaptogen", prefer: ["athletic_performance","stamina","post_illness_recovery","weak_immunity","shortness_of_breath_exertion","fatigue"], support: [] },
  { category: "aging_pain_deficiency", prefer: ["chronic_pain_deficiency","fibromyalgia","elderly_aches","nerve_pain","tired_achy_limbs"], support: [] },
  { category: "hair_essence", prefer: ["hair_thinning","premature_graying","low_back_knee_soreness","thirst","nocturnal_emissions","profuse_vaginal_discharge"], support: [] },
  { category: "weight_metabolism", prefer: ["weight_management","metabolic_syndrome","bloating","constipation","edema","food_stagnation"], support: [] },
  { category: "urinary_stones", prefer: ["kidney_stones","bladder_stones","urination_pain","hematuria","flank_or_lower_abdominal_pressure_from_stones"], support: [] },
  { category: "qi_blood_tonic", prefer: ["qi_blood_deficiency","postpartum_recovery","pale_complexion","fatigue","scanty_or_irregular_menses","palpitations"], support: ["vaginal_discharge","dry_skin_from_blood_xu"] },
];

function parseFormulaName(fullName: string): { name2: string; name3: string } {
  const match = fullName.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    return {
      name2: match[1].trim(),
      name3: match[2].trim(),
    };
  }
  return {
    name2: fullName,
    name3: '',
  };
}

async function main() {
  console.log('Start seeding symptom categories...');

  for (const category of categories) {
    const result = await prisma.symptomCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    console.log(`Created/Updated category: ${result.name}`);
  }

  console.log('\nStart seeding formulas...');

  for (const formulaData of formulasData) {
    const { name2, name3 } = parseFormulaName(formulaData.name);

    // Find the category ID
    const category = await prisma.symptomCategory.findUnique({
      where: { name: formulaData.category },
    });

    if (!category) {
      console.error(`Category not found: ${formulaData.category}`);
      continue;
    }

    const result = await prisma.formula.upsert({
      where: { name: formulaData.id },
      update: {},
      create: {
        name: formulaData.id,
        name2,
        name3,
        symptomCategoryId: category.id,
      },
    });
    console.log(`Created/Updated formula: ${result.name}`);
  }

  console.log('\nStart seeding symptoms...');

  for (const symptomData of symptomsData) {
    // Find the category ID
    const category = await prisma.symptomCategory.findUnique({
      where: { name: symptomData.category },
    });

    if (!category) {
      console.error(`Category not found: ${symptomData.category}`);
      continue;
    }

    const result = await prisma.symptom.create({
      data: {
        highIndications: symptomData.prefer,
        lowIndications: symptomData.support,
        symptomCategoryId: category.id,
      },
    });
    console.log(`Created symptom for category: ${symptomData.category} (ID: ${result.id})`);
  }

  console.log('\nSeeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
