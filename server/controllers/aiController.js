const generateItinerary = async (destination, days, budget, interests) => {
  const itinerary = [];

  for (let i = 1; i <= days; i++) {
    itinerary.push({
      day: i,
      activities: [
        `Day ${i}: Explore popular attractions in ${destination}`,
        `Try local ${interests[0] || 'food'} experiences`,
        `Visit ${destination} landmarks and take photos`,
      ],
    });
  }

  const budgetMap = { Low: 50, Medium: 150, High: 300 };
  const daily = budgetMap[budget] || 100;

  const estimatedBudget = {
    flights: daily * 4,
    accommodation: daily * days,
    food: daily * days * 0.3,
    activities: daily * days * 0.2,
    total: daily * 4 + daily * days + daily * days * 0.5,
  };

  const hotels = {
    Low: [{ name: `${destination} Budget Inn`, type: 'Budget Friendly' }],
    Medium: [{ name: `${destination} Grand Hotel`, type: 'Mid Range' }],
    High: [{ name: `${destination} Luxury Palace`, type: 'Luxury' }],
  };

  return {
    itinerary,
    estimatedBudget,
    hotels: hotels[budget] || hotels['Medium'],
  };
};

module.exports = { generateItinerary };