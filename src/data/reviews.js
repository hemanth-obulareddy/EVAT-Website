const reviews = [
  // Sample reviews for various stations
  {
    id: 1,
    stationId: 'chargefox',
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    rating: 5,
    reviewText: "Excellent charging station! Fast charging and always available. The location is convenient and well-lit at night. Highly recommend!",
    timestamp: "2024-01-15T10:30:00Z",
    helpfulCount: 12,
    photos: [],
    keywords: ["fast charging", "convenient", "well-lit"]
  },
  {
    id: 2,
    stationId: 'chargefox',
    userId: "user2",
    userName: "Mike Chen",
    userAvatar: "MC",
    rating: 4,
    reviewText: "Good charging speed, but sometimes crowded during peak hours. The payment system is easy to use.",
    timestamp: "2024-01-10T14:20:00Z",
    helpfulCount: 8,
    photos: [],
    keywords: ["crowded", "payment system", "peak hours"]
  },
  {
    id: 3,
    stationId: 'chargefox',
    userId: "user3",
    userName: "Emma Davis",
    userAvatar: "ED",
    rating: 5,
    reviewText: "Perfect for my daily commute. The CCS charger works flawlessly with my Tesla. Clean and well-maintained.",
    timestamp: "2024-01-08T08:45:00Z",
    helpfulCount: 15,
    photos: [],
    keywords: ["tesla", "ccs", "clean", "well-maintained"]
  },

  // Belmont Station Reviews
  {
    id: 4,
    stationId: 'evie',
    userId: "user4",
    userName: "David Wilson",
    userAvatar: "DW",
    rating: 3,
    reviewText: "Decent charging speed but the Type 1 connector was a bit loose. Staff was helpful though.",
    timestamp: "2024-01-12T16:15:00Z",
    helpfulCount: 5,
    photos: [],
    keywords: ["type 1", "loose connector", "staff helpful"]
  },
  {
    id: 5,
    stationId: 'evie',
    userId: "user5",
    userName: "Lisa Thompson",
    userAvatar: "LT",
    rating: 4,
    reviewText: "Reliable charging station. Good for quick top-ups. The location is easy to find.",
    timestamp: "2024-01-05T12:30:00Z",
    helpfulCount: 7,
    photos: [],
    keywords: ["reliable", "quick top-up", "easy to find"]
  },

  // Grovedale Station Reviews
  {
    id: 6,
    stationId: 'tesla',
    userId: "user6",
    userName: "Alex Rodriguez",
    userAvatar: "AR",
    rating: 2,
    reviewText: "Very slow charging speed. The 150kW+ promise is misleading. Often out of service.",
    timestamp: "2024-01-14T09:20:00Z",
    helpfulCount: 20,
    photos: [],
    keywords: ["slow charging", "out of service", "misleading"]
  },
  {
    id: 7,
    stationId: 'tesla',
    userId: "user7",
    userName: "Rachel Green",
    userAvatar: "RG",
    rating: 1,
    reviewText: "Terrible experience. Charger was broken and no maintenance in sight. Avoid this station.",
    timestamp: "2024-01-11T17:45:00Z",
    helpfulCount: 25,
    photos: [],
    keywords: ["broken", "no maintenance", "avoid"]
  },

  // Geelong West Station Reviews
  {
    id: 8,
    stationId: 4,
    userId: "user8",
    userName: "Tom Anderson",
    userAvatar: "TA",
    rating: 4,
    reviewText: "Good value for money. Slow but steady charging. Perfect for overnight charging.",
    timestamp: "2024-01-13T22:10:00Z",
    helpfulCount: 9,
    photos: [],
    keywords: ["good value", "slow charging", "overnight"]
  },
  {
    id: 9,
    stationId: 4,
    userId: "user9",
    userName: "Maria Garcia",
    userAvatar: "MG",
    rating: 5,
    reviewText: "Excellent Type 2 charger. Works perfectly with my Nissan Leaf. Very affordable too!",
    timestamp: "2024-01-09T11:25:00Z",
    helpfulCount: 14,
    photos: [],
    keywords: ["type 2", "nissan leaf", "affordable"]
  },

  // Newcomb Station Reviews
  {
    id: 10,
    stationId: 5,
    userId: "user10",
    userName: "James Brown",
    userAvatar: "JB",
    rating: 4,
    reviewText: "Solid charging station. Good mix of CCS and Type 2 connectors. Reliable service.",
    timestamp: "2024-01-16T13:40:00Z",
    helpfulCount: 11,
    photos: [],
    keywords: ["ccs", "type 2", "reliable"]
  },

  // North Geelong Station Reviews
  {
    id: 11,
    stationId: 6,
    userId: "user11",
    userName: "Anna White",
    userAvatar: "AW",
    rating: 3,
    reviewText: "CHAdeMO charger works fine but limited to certain vehicles. Location is convenient.",
    timestamp: "2024-01-07T15:55:00Z",
    helpfulCount: 6,
    photos: [],
    keywords: ["chademo", "limited vehicles", "convenient"]
  },

  // Highton Station Reviews
  {
    id: 12,
    stationId: 7,
    userId: "user12",
    userName: "Chris Lee",
    userAvatar: "CL",
    rating: 5,
    reviewText: "Best charging station in the area! High reliability, fast service, and great staff.",
    timestamp: "2024-01-17T10:15:00Z",
    helpfulCount: 18,
    photos: [],
    keywords: ["best station", "high reliability", "great staff"]
  },
  {
    id: 13,
    stationId: 7,
    userId: "user13",
    userName: "Sophie Martin",
    userAvatar: "SM",
    rating: 5,
    reviewText: "Perfect for my daily charging needs. Type 1 and Type 2 both work excellently.",
    timestamp: "2024-01-06T07:30:00Z",
    helpfulCount: 13,
    photos: [],
    keywords: ["daily charging", "type 1", "type 2"]
  },

  // Geelong CBD Station Reviews
  {
    id: 14,
    stationId: 8,
    userId: "user14",
    userName: "Peter Taylor",
    userAvatar: "PT",
    rating: 4,
    reviewText: "Great location in the CBD. All connector types available. Can be busy during peak times.",
    timestamp: "2024-01-18T12:00:00Z",
    helpfulCount: 16,
    photos: [],
    keywords: ["cbd location", "all connectors", "busy peak times"]
  },

  // Waurn Ponds Station Reviews
  {
    id: 15,
    stationId: 9,
    userId: "user15",
    userName: "Nina Patel",
    userAvatar: "NP",
    rating: 2,
    reviewText: "Inconsistent charging speeds. Sometimes works great, sometimes barely charges at all.",
    timestamp: "2024-01-19T14:20:00Z",
    helpfulCount: 10,
    photos: [],
    keywords: ["inconsistent", "unreliable", "variable speeds"]
  },

  // Corio Station Reviews
  {
    id: 16,
    stationId: 10,
    userId: "user16",
    userName: "Mark Johnson",
    userAvatar: "MJ",
    rating: 3,
    reviewText: "Average charging station. Nothing special but gets the job done when available.",
    timestamp: "2024-01-20T09:45:00Z",
    helpfulCount: 4,
    photos: [],
    keywords: ["average", "gets job done", "when available"]
  },

  // Newton Station Reviews
  {
    id: 17,
    stationId: 11,
    userId: "user17",
    userName: "Kelly Smith",
    userAvatar: "KS",
    rating: 5,
    reviewText: "Excellent value! Very affordable and reliable Type 2 charging. Perfect for budget-conscious EV owners.",
    timestamp: "2024-01-21T11:10:00Z",
    helpfulCount: 22,
    photos: [],
    keywords: ["excellent value", "affordable", "budget-conscious"]
  },

  // Armstrong Creek Station Reviews
  {
    id: 18,
    stationId: 12,
    userId: "user18",
    userName: "Ryan Cooper",
    userAvatar: "RC",
    rating: 4,
    reviewText: "Good high-speed charging options. CCS and CHAdeMO both work well. Location is a bit out of the way.",
    timestamp: "2024-01-22T16:30:00Z",
    helpfulCount: 8,
    photos: [],
    keywords: ["high-speed", "ccs", "chademo", "out of way"]
  },

  // Charlemont Station Reviews
  {
    id: 19,
    stationId: 13,
    userId: "user19",
    userName: "Amanda Foster",
    userAvatar: "AF",
    rating: 4,
    reviewText: "Reliable charging with good speed. Type 1 and Type 2 connectors available. Clean facility.",
    timestamp: "2024-01-23T13:15:00Z",
    helpfulCount: 12,
    photos: [],
    keywords: ["reliable", "good speed", "clean facility"]
  },

  // Mount Dundeed Station Reviews
  {
    id: 20,
    stationId: 14,
    userId: "user20",
    userName: "Daniel Clark",
    userAvatar: "DC",
    rating: 5,
    reviewText: "Fantastic charging station! Great location with beautiful views. CCS charging works perfectly.",
    timestamp: "2024-01-24T10:00:00Z",
    helpfulCount: 19,
    photos: [],
    keywords: ["fantastic", "beautiful views", "ccs", "perfect"]
  }
];

export default reviews;
