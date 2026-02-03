// metabolicHealth.config.js
export const metabolicHealthTest = {
  id: "metabolic",
  title: "Metabolic Health Assessment",

  steps: [
    {
      title: "Energy & Blood Sugar Regulation",
      questions: [
        {
          id: "mh_q1",
          text: {
            en: "I experience energy crashes during the day.",
            fr: "Je ressens des chutes d’énergie au cours de la journée.",
          },
        },
        {
          id: "mh_q2",
          text: {
            en: "I feel sleepy after meals.",
            fr: "Je me sens somnolent(e) après les repas.",
          },
        },
        {
          id: "mh_q3",
          text: {
            en: "I rely on sugar or caffeine to function.",
            fr: "Je dépends du sucre ou de la caféine pour fonctionner.",
          },
        },
        {
          id: "mh_q4",
          text: {
            en: "I feel shaky or irritable when I haven’t eaten.",
            fr: "Je me sens irritable ou fébrile lorsque je n’ai pas mangé.",
          },
        },
        {
          id: "mh_q5",
          text: {
            en: "My energy levels fluctuate a lot throughout the day.",
            fr: "Mon niveau d’énergie fluctue fortement au cours de la journée.",
          },
        },
      ],
    },

    {
      title: "Weight & Body Composition",
      questions: [
        {
          id: "mh_q6",
          text: {
            en: "I gain weight easily even with moderate food intake.",
            fr: "Je prends du poids facilement même avec une alimentation modérée.",
          },
        },
        {
          id: "mh_q7",
          text: {
            en: "I struggle to lose fat despite effort.",
            fr: "J’ai du mal à perdre de la masse grasse malgré mes efforts.",
          },
        },
        {
          id: "mh_q8",
          text: {
            en: "My weight fluctuates significantly.",
            fr: "Mon poids fluctue de manière significative.",
          },
        },
        {
          id: "mh_q9",
          text: {
            en: "Fat accumulates easily around my abdomen.",
            fr: "La graisse s’accumule facilement autour de mon abdomen.",
          },
        },
        {
          id: "mh_q10",
          text: {
            en: "My body feels resistant to change.",
            fr: "Mon corps semble résistant au changement.",
          },
        },
      ],
    },

    {
      title: "Inflammation & Recovery",
      questions: [
        {
          id: "mh_q11",
          text: {
            en: "I experience frequent joint or muscle pain.",
            fr: "Je ressens fréquemment des douleurs musculaires ou articulaires.",
          },
        },
        {
          id: "mh_q12",
          text: {
            en: "I feel chronically inflamed or swollen.",
            fr: "Je me sens chroniquement enflammé(e) ou gonflé(e).",
          },
        },
        {
          id: "mh_q13",
          text: {
            en: "I recover slowly from physical effort.",
            fr: "Je récupère lentement après un effort physique.",
          },
        },
        {
          id: "mh_q14",
          text: {
            en: "I get sick more often than I should.",
            fr: "Je tombe malade plus souvent que la normale.",
          },
        },
        {
          id: "mh_q15",
          text: {
            en: "Minor stressors affect me strongly.",
            fr: "Des facteurs de stress mineurs m’affectent fortement.",
          },
        },
      ],
    },

    {
      title: "Digestion & Food Response",
      questions: [
        {
          id: "mh_q16",
          text: {
            en: "I experience bloating after meals.",
            fr: "Je ressens des ballonnements après les repas.",
          },
        },
        {
          id: "mh_q17",
          text: {
            en: "Certain foods make me feel unwell.",
            fr: "Certains aliments me font me sentir mal.",
          },
        },
        {
          id: "mh_q18",
          text: {
            en: "My digestion feels slow or uncomfortable.",
            fr: "Ma digestion me paraît lente ou inconfortable.",
          },
        },
        {
          id: "mh_q19",
          text: {
            en: "I experience cravings that feel uncontrollable.",
            fr: "Je ressens des envies alimentaires difficiles à contrôler.",
          },
        },
        {
          id: "mh_q20",
          text: {
            en: "I feel better when I skip meals.",
            fr: "Je me sens mieux lorsque je saute des repas.",
          },
        },
      ],
    },

    {
      title: "Hormonal & Metabolic Signals",
      questions: [
        {
          id: "mh_q21",
          text: {
            en: "My sleep does not feel restorative.",
            fr: "Mon sommeil ne me semble pas réparateur.",
          },
        },
        {
          id: "mh_q22",
          text: {
            en: "I feel wired but tired.",
            fr: "Je me sens nerveux(se) mais fatigué(e).",
          },
        },
        {
          id: "mh_q23",
          text: {
            en: "My libido has noticeably decreased.",
            fr: "Ma libido a nettement diminué.",
          },
        },
        {
          id: "mh_q24",
          text: {
            en: "My mood fluctuates without clear reason.",
            fr: "Mon humeur fluctue sans raison évidente.",
          },
        },
        {
          id: "mh_q25",
          text: {
            en: "Stress strongly affects my physical state.",
            fr: "Le stress affecte fortement mon état physique.",
          },
        },
      ],
    },

    {
      title: "Lifestyle & Metabolic Load",
      questions: [
        {
          id: "mh_q26",
          text: {
            en: "My eating schedule is irregular.",
            fr: "Mon rythme alimentaire est irrégulier.",
          },
        },
        {
          id: "mh_q27",
          text: {
            en: "I sit for long periods daily.",
            fr: "Je reste assis(e) pendant de longues périodes chaque jour.",
          },
        },
        {
          id: "mh_q28",
          text: {
            en: "My sleep schedule is inconsistent.",
            fr: "Mes horaires de sommeil sont irréguliers.",
          },
        },
        {
          id: "mh_q29",
          text: {
            en: "I feel constantly rushed or overloaded.",
            fr: "Je me sens constamment pressé(e) ou surchargé(e).",
          },
        },
        {
          id: "mh_q30",
          text: {
            en: "I rarely feel truly rested.",
            fr: "Je me sens rarement réellement reposé(e).",
          },
        },
      ],
    },
  ],
};
