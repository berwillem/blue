// personalCapacity.config.js
export const personalCapacityTest = {
  id: "personal",
  title: "Personal Capacity Questionnaire",

  steps: [
    {
      step: 1,
      title: "Discipline & Self-Regulation",
      questions: [
        {
          id: "pc_q1",
          text: {
            en: "I reliably follow through on commitments I make to myself.",
            fr: "Je respecte de manière fiable les engagements que je prends envers moi-même.",
          },
        },
        {
          id: "pc_q2",
          text: {
            en: "I can maintain habits even when motivation is low.",
            fr: "Je parviens à maintenir des habitudes même lorsque la motivation est faible.",
          },
        },
        {
          id: "pc_q3",
          text: {
            en: "I complete important tasks even when they feel boring or uncomfortable.",
            fr: "J’accomplis les tâches importantes même lorsqu’elles sont ennuyeuses ou inconfortables.",
          },
        },
        {
          id: "pc_q4",
          text: {
            en: "I rarely abandon goals once I have started.",
            fr: "J’abandonne rarement mes objectifs une fois que je les ai commencés.",
          },
        },
        {
          id: "pc_q5",
          text: {
            en: "My daily routines are structured and intentional.",
            fr: "Mes routines quotidiennes sont structurées et intentionnelles.",
          },
        },
      ],
    },

    {
      step: 2,
      title: "Future Orientation & Goal Clarity",
      questions: [
        {
          id: "pc_q6",
          text: {
            en: "I have a clear vision of where I want my life to be in 3–5 years.",
            fr: "J’ai une vision claire de comment doit être ma vie dans 3 à 5 ans.",
          },
        },
        {
          id: "pc_q7",
          text: {
            en: "I regularly translate long-term goals into short-term actions.",
            fr: "Je traduis régulièrement mes objectifs à long terme en actions à court terme.",
          },
        },
        {
          id: "pc_q8",
          text: {
            en: "My daily actions are aligned with my stated goals.",
            fr: "Mes actions quotidiennes sont alignées avec mes objectifs déclarés.",
          },
        },
        {
          id: "pc_q9",
          text: {
            en: "I plan ahead rather than reacting to events as they occur.",
            fr: "Je planifie à l’avance plutôt que de réagir aux événements au fur et à mesure.",
          },
        },
        {
          id: "pc_q10",
          text: {
            en: "I know what I am currently working toward and why.",
            fr: "Je sais clairement quels sont les choses liées à ma vie sur lesquels je travaille actuellement et pourquoi.",
          },
        },
      ],
    },

    {
      step: 3,
      title: "Mental Strength & Stress Tolerance",
      questions: [
        {
          id: "pc_q11",
          text: {
            en: "I remain relatively calm when facing pressure or setbacks.",
            fr: "Je reste relativement calme face à la pression ou aux revers.",
          },
        },
        {
          id: "pc_q12",
          text: {
            en: "Failure does not stop me from continuing forward.",
            fr: "L’échec ne m’empêche pas de continuer à avancer.",
          },
        },
        {
          id: "pc_q13",
          text: {
            en: "I can tolerate discomfort without immediately seeking escape or relief.",
            fr: "Je tolère l’inconfort sans chercher immédiatement à l’éviter ou à m’en soulager.",
          },
        },
        {
          id: "pc_q14",
          text: {
            en: "When stressed, I focus on solutions rather than blame.",
            fr: "En situation de stress, je me concentre sur les solutions plutôt que sur le blâme.",
          },
        },
        {
          id: "pc_q15",
          text: {
            en: "I recover quickly after emotional or psychological challenges.",
            fr: "Je récupère rapidement après des difficultés émotionnelles ou psychologiques.",
          },
        },
      ],
    },

    {
      step: 4,
      title: "Mental Energy & Focus Capacity",
      questions: [
        {
          id: "pc_q16",
          text: {
            en: "I wake up most days with adequate mental clarity.",
            fr: "Je me réveille la plupart du temps avec une clarté mentale suffisante.",
          },
        },
        {
          id: "pc_q17",
          text: {
            en: "I can focus deeply on a task without frequent distraction.",
            fr: "Je peux me concentrer profondément sur une tâche sans être fréquemment distrait.",
          },
        },
        {
          id: "pc_q18",
          text: {
            en: "I rarely feel mentally exhausted before the day ends.",
            fr: "Je me sens rarement mentalement épuisé avant la fin de la journée.",
          },
        },
        {
          id: "pc_q19",
          text: {
            en: "I make decisions without feeling overwhelmed or mentally foggy.",
            fr: "Je prends des décisions sans me sentir dépassé ou mentalement embrumé.",
          },
        },
        {
          id: "pc_q20",
          text: {
            en: "My sleep and recovery support my mental performance.",
            fr: "Je sens que mon sommeil et ma récupération soutiennent mes performances mentales.",
          },
        },
      ],
    },

    {
      step: 5,
      title: "Responsibility & Locus of Control",
      questions: [
        {
          id: "pc_q21",
          text: {
            en: "I take full responsibility for my current life situation.",
            fr: "J’assume pleinement la responsabilité de ma situation de vie actuelle.",
          },
        },
        {
          id: "pc_q22",
          text: {
            en: "I rarely blame external circumstances for my results.",
            fr: "Je blâme rarement des circonstances extérieures pour mes résultats.",
          },
        },
        {
          id: "pc_q23",
          text: {
            en: "I actively seek feedback, even when it is uncomfortable.",
            fr: "Je recherche activement le feedback, même lorsqu’il est inconfortable.",
          },
        },
        {
          id: "pc_q24",
          text: {
            en: "I believe my actions matter more than my circumstances.",
            fr: "Je crois que mes actions comptent davantage que mes circonstances.",
          },
        },
        {
          id: "pc_q25",
          text: {
            en: "I am willing to confront hard truths about myself.",
            fr: "Je suis prêt à affronter des vérités difficiles à propos de moi-même.",
          },
        },
      ],
    },

    {
      step: 6,
      title: "Readiness for Change & Accountability",
      questions: [
        {
          id: "pc_q26",
          text: {
            en: "I am willing to sacrifice short-term comfort for long-term improvement.",
            fr: "Je suis prêt à sacrifier le confort à court terme pour une amélioration à long terme.",
          },
        },
        {
          id: "pc_q27",
          text: {
            en: "I act on insights quickly rather than overthinking them.",
            fr: "J’agis rapidement sur les retours que je reçois plutôt que de trop les analyser.",
          },
        },
        {
          id: "pc_q28",
          text: {
            en: "I respond well to structure, standards, and accountability.",
            fr: "Je réagis positivement aux structures, aux standards et à la responsabilisation.",
          },
        },
        {
          id: "pc_q29",
          text: {
            en: "I am open to being challenged and corrected by a coach.",
            fr: "Je suis ouvert à être challengé et corrigé par un mentor.",
          },
        },
        {
          id: "pc_q30",
          text: {
            en: "I am fully committed to making real behavioral changes now.",
            fr: "Je suis pleinement engagé à opérer de véritables changements comportementaux dès maintenant.",
          },
        },
      ],
    },
  ],
};
