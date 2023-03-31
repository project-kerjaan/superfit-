
function caloriesCount({ gender,age,height,weight,active_count }) {
    let total;

   if(gender === "female") {
       const counting = (447.6 + 9.26 * weight) + (3.10 * height) - (4.33 * age);
       total = counting * active_count;
   } else{
      const counting = (88.6 + 13.4 * weight) + (4.8 * height) - (5.68 * age);
      total = counting * active_count;
   }

   return total;
}

function macrosCount() {
    
}

module.exports = {
    caloriesCount
}