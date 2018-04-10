var Old = {
  MedicalConditionTwo: { name: 'MedicalConditionTwo', confirmationStatus: 'NONE' },
  DietTwo: { name: 'DietTwo', confirmationStatus: 'NONE' },
  FoodAllergies: { name: 'FoodAllergies', confirmationStatus: 'NONE' },
  Injury: { name: 'Injury', confirmationStatus: 'NONE' },
  HowOftenVisit: { name: 'HowOftenVisit', confirmationStatus: 'NONE' },
  Birthday: { name: 'Birthday', confirmationStatus: 'NONE' },
  Gender: { name: 'Gender', confirmationStatus: 'NONE' },
  SpecialDiets: { name: 'SpecialDiets', confirmationStatus: 'NONE' },
  WeightTrouble: { name: 'WeightTrouble', confirmationStatus: 'NONE' },
  Smoker: { name: 'Smoker', confirmationStatus: 'NONE' },
  StressLevel: { name: 'StressLevel', confirmationStatus: 'NONE' },
  PregnantOrNursing: { name: 'PregnantOrNursing', confirmationStatus: 'NONE' },
  VitaminTaker: { name: 'VitaminTaker', confirmationStatus: 'NONE' },
  FoodAllergyTwo: { name: 'FoodAllergyTwo', confirmationStatus: 'NONE' },
  FoodIsComfort: { name: 'FoodIsComfort', confirmationStatus: 'NONE' },
  MedicalConditionOne: { name: 'MedicalConditionOne', confirmationStatus: 'NONE' },
  ActivityLevel: { name: 'ActivityLevel', confirmationStatus: 'NONE' },
  FirstName: { name: 'FirstName', value: 'Adam', confirmationStatus: 'NONE' },
  VitaminsTaken: { name: 'VitaminsTaken', confirmationStatus: 'NONE' },
  HeightInches: { name: 'HeightInches', confirmationStatus: 'NONE' },
  DietOne: { name: 'DietOne', confirmationStatus: 'NONE' },
  Weight: { name: 'Weight', confirmationStatus: 'NONE' },
  SleepEight: { name: 'SleepEight', confirmationStatus: 'NONE' },
  PregnantBefore: { name: 'PregnantBefore', confirmationStatus: 'NONE' },
  StressEater: { name: 'StressEater', confirmationStatus: 'NONE' },
  Occupation: { name: 'Occupation', confirmationStatus: 'NONE' },
  FoodAllergyOne: { name: 'FoodAllergyOne', confirmationStatus: 'NONE' },
  HeightFoot: { name: 'HeightFoot', confirmationStatus: 'NONE' },
  FoodLoop: { name: 'FoodLoop', confirmationStatus: 'NONE' },
  Alcoholic: { name: 'Alcoholic', confirmationStatus: 'NONE' },
  CupsOfWater: { name: 'CupsOfWater', confirmationStatus: 'NONE' }
}

var New = {
  MedicalConditionTwo: { name: 'MedicalConditionTwo', confirmationStatus: 'NONE' },
  DietTwo: { name: 'DietTwo', confirmationStatus: 'NONE' },
  FoodAllergies: { name: 'FoodAllergies', confirmationStatus: 'NONE' },
  Injury: { name: 'Injury', confirmationStatus: 'NONE' },
  HowOftenVisit: { name: 'HowOftenVisit', confirmationStatus: 'NONE' },
  Birthday: { name: 'Birthday', confirmationStatus: 'NONE' },
  Gender: { name: 'Gender', confirmationStatus: 'NONE' },
  SpecialDiets: { name: 'SpecialDiets', confirmationStatus: 'NONE' },
  WeightTrouble: { name: 'WeightTrouble', confirmationStatus: 'NONE' },
  Smoker: { name: 'Smoker', confirmationStatus: 'NONE' },
  StressLevel: { name: 'StressLevel', confirmationStatus: 'NONE' },
  PregnantOrNursing: { name: 'PregnantOrNursing', confirmationStatus: 'NONE' },
  VitaminTaker: { name: 'VitaminTaker', confirmationStatus: 'NONE' },
  FoodAllergyTwo: { name: 'FoodAllergyTwo', confirmationStatus: 'NONE' },
  FoodIsComfort: { name: 'FoodIsComfort', confirmationStatus: 'NONE' },
  MedicalConditionOne: { name: 'MedicalConditionOne', confirmationStatus: 'NONE' },
  ActivityLevel: { name: 'ActivityLevel', confirmationStatus: 'NONE' },
  FirstName: { name: 'FirstName', value: 'Adam', confirmationStatus: 'NONE' },
  VitaminsTaken: { name: 'VitaminsTaken', confirmationStatus: 'NONE' },
  HeightInches: { name: 'HeightInches', confirmationStatus: 'NONE' },
  DietOne: { name: 'DietOne', confirmationStatus: 'NONE' },
  Weight: { name: 'Weight', confirmationStatus: 'NONE' },
  SleepEight: { name: 'SleepEight', confirmationStatus: 'NONE' },
  PregnantBefore: { name: 'PregnantBefore', confirmationStatus: 'NONE' },
  StressEater: { name: 'StressEater', confirmationStatus: 'NONE' },
  Occupation: { name: 'Occupation', confirmationStatus: 'NONE' },
  FoodAllergyOne: { name: 'FoodAllergyOne', confirmationStatus: 'NONE' },
  HeightFoot: { name: 'HeightFoot', confirmationStatus: 'NONE' },
  FoodLoop: {
    name: 'FoodLoop',
    value: '5,000,000 tacos',
    resolutions: { resolutionsPerAuthority: [Object] },
    confirmationStatus: 'NONE'
  },
  Alcoholic: { name: 'Alcoholic', confirmationStatus: 'NONE' },
  CupsOfWater: { name: 'CupsOfWater', confirmationStatus: 'NONE' }
}

var getIntentChange = (oldIntent, newIntent) => {
  var intentChanges = []
  for (var key in oldIntent) {
    if (oldIntent[key].value !== newIntent[key].value) {
      console.log(key);
      console.log(oldIntent[key].value, newIntent[key].value)
    }
  }
  return intentChanges;
}

var answer = getIntentChange(Old, New);
console.log('answer: ', answer);
console.log(typeof answer);
