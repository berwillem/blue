
export const personalCapacityTest = {
  id: "personal",
  title: "Personal Capacity Assessment",
  scale: {
    0: "Strongly disagree",
    1: "Disagree",
    2: "Neutral",
    3: "Agree",
    4: "Strongly agree",
  },
  steps: [
    {
      step: 1,
      title: "Energy & Vitality",
      questions: [
        { id: "pc_q1", text: "I feel energetic most days" },
        { id: "pc_q2", text: "I wake up feeling rested" },
        { id: "pc_q3", text: "I have enough energy to get through the day" },
        { id: "pc_q4", text: "I rarely feel exhausted without reason" },
        {
          id: "pc_q5",
          text: "My energy levels are consistent throughout the day",
        },
      ],
    },
    {
      step: 2,
      title: "Physical Capacity",
      questions: [
        { id: "pc_q6", text: "I can perform daily physical tasks easily" },
        { id: "pc_q7", text: "I feel physically strong" },
        { id: "pc_q8", text: "I can exercise without excessive fatigue" },
        { id: "pc_q9", text: "My endurance is good" },
        { id: "pc_q10", text: "I recover well after physical activity" },
      ],
    },
    {
      step: 3,
      title: "Mental Focus",
      questions: [
        { id: "pc_q11", text: "I can concentrate for long periods" },
        { id: "pc_q12", text: "I feel mentally sharp" },
        { id: "pc_q13", text: "I can focus even under pressure" },
        { id: "pc_q14", text: "I rarely feel mentally fatigued" },
        { id: "pc_q15", text: "I stay productive throughout the day" },
      ],
    },
    {
      step: 4,
      title: "Stress & Recovery",
      questions: [
        { id: "pc_q16", text: "I manage stress well" },
        { id: "pc_q17", text: "I recover quickly after stressful situations" },
        { id: "pc_q18", text: "Stress does not affect my performance much" },
        { id: "pc_q19", text: "I feel emotionally balanced" },
        { id: "pc_q20", text: "I handle pressure effectively" },
      ],
    },
    {
      step: 5,
      title: "Lifestyle & Habits",
      questions: [
        { id: "pc_q21", text: "I maintain healthy daily habits" },
        { id: "pc_q22", text: "My sleep quality is good" },
        { id: "pc_q23", text: "I eat in a way that supports my energy" },
        { id: "pc_q24", text: "I stay consistent with physical activity" },
        { id: "pc_q25", text: "I take time to recover and rest" },
      ],
    },
    {
      step: 6,
      title: "Overall Capacity",
      questions: [
        {
          id: "pc_q26",
          text: "I feel capable of handling my responsibilities",
        },
        { id: "pc_q27", text: "My body supports my daily demands" },
        { id: "pc_q28", text: "My mind supports my daily demands" },
        { id: "pc_q29", text: "I feel resilient overall" },
        { id: "pc_q30", text: "I am satisfied with my current capacity level" },
      ],
    },
  ],
};
