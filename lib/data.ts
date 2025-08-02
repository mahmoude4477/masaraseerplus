// Shared data service for events and destinations
export interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
  date: string;
  status: string;
  attendees: number;
  category: string;
  childFriendly: boolean;
}

export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
  rating: number;
  category: string;
  status: string;
  childFriendly: boolean;
}

export interface ExperienceLocation {
  name: string;
  time: string;
  duration: string;
  coordinates: { lat: number; lng: number };
  description: string;
  photos: string[];
  tips: string;
  rating: number;
}

export interface ExperienceDay {
  day: number;
  title: string;
  locations: ExperienceLocation[];
  weather: string;
  totalDistance: string;
  highlights: string[];
}

export interface Experience {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  author: string;
  authorEmail: string;
  location: string;
  images: string[];
  rating: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  language: "ar" | "en" | "both";
  category: string;
  tags: string[];
  days?: number;
  totalCost?: string;
  groupSize?: string;
  season?: string;
  dailyDetails?: ExperienceDay[];
}

// Mock events data - in a real app, this would come from an API
export const mockEvents: Event[] = [
  {
    id: 1,
    name: "جولة تصوير في متنزه عسير الوطني",
    image: "/image1.jpeg", // Habala valley view :contentReference[oaicite:0]{index=0}
    description:
      "رحلة ميدانية لمحبي التصوير لاستكشاف مناظر متنزه عسير الوطني والتقاط صور بانورامية للجبال والوديان.",
    location: "متنزه عسير الوطني",
    date: "2025-02-15",
    status: "نشط",
    attendees: 40,
    category: "طبيعة",
    childFriendly: true,
  },
  {
    id: 2,
    name: "رحلة استكشافية إلى السودة",
    image: "/image2.jpeg", // Cable-car valley in Abha :contentReference[oaicite:1]{index=1}
    description:
      "رحلة جماعية لاستكشاف مرتفعات السودة والاستمتاع بالأجواء الباردة والمناظر الخضراء.",
    location: "أبها – السودة",
    date: "2025-03-20",
    status: "نشط",
    attendees: 75,
    category: "رحلة",
    childFriendly: true,
  },
  {
    id: 3,
    name: "مخيم التراث في رجال ألمع",
    image: "/image3.jpeg", // Rijal Almaa stone houses :contentReference[oaicite:2]{index=2}
    description:
      "مخيم ثقافي يعرض فنون العمارة والحرف التقليدية في قرية رجال ألمع التراثية.",
    location: "رجال ألمع",
    date: "2025-05-10",
    status: "قريباً",
    attendees: 0,
    category: "تراث",
    childFriendly: true,
  },
  {
    id: 4,
    name: "مهرجان أبها للتسوق والترفيه",
    image: "/image4.jpeg", // Abha street scene :contentReference[oaicite:3]{index=3}
    description:
      "فعالية سنوية تجمع بين التسوق والعروض الفنية والأنشطة العائلية في قلب مدينة أبها.",
    location: "أبها – شارع الفن",
    date: "2025-06-05",
    status: "قريباً",
    attendees: 0,
    category: "مهرجان",
    childFriendly: true,
  },
  {
    id: 5,
    name: "تجربة الطيران الشراعي في جبال السودة",
    image: "/image5.jpeg", // Mountain vista (paragliding spot) :contentReference[oaicite:4]{index=4}
    description:
      "نشاط مغامرة لعشاق الرياضات الجوية للاستمتاع بمشهد بانورامي كامل لمنطقة عسير من السماء.",
    location: "أبها – السودة",
    date: "2025-08-18",
    status: "قريباً",
    attendees: 0,
    category: "مغامرة",
    childFriendly: false,
  },
  {
    id: 6,
    name: "جولة تاريخية في قرية الحبلة المعلّقة",
    image: "/image6.jpeg", // Habala cliff houses :contentReference[oaicite:5]{index=5}
    description:
      "جولة ميدانية للتعرف على قصة قرية الحبلة المعلّقة واستكشاف منازلها الحجرية المطلة على الأخاديد.",
    location: "طريق الحبلة – أحد رفيدة",
    date: "2025-10-01",
    status: "مخطط",
    attendees: 0,
    category: "تاريخ",
    childFriendly: true,
  },
];

// Mock destinations data
export const mockDestinations: Destination[] = [
  {
    id: 1,
    name: "منتزه السودة",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "أحد أجمل المنتزهات في عسير، يشتهر بضباب دائم وأشجار العرعر الكثيفة",
    location: "أبها - السودة",
    rating: 4.8,
    category: "منتزه طبيعي",
    status: "نشط",
    childFriendly: true,
  },
  {
    id: 2,
    name: "قرية رجال ألمع التراثية",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "قرية أثرية رائعة، معروفة بمبانيها الحجرية الفريدة وألوانها الزاهية",
    location: "رجال ألمع",
    rating: 4.9,
    category: "تراث",
    status: "نشط",
    childFriendly: true,
  },
  {
    id: 3,
    name: "جبل بوليفارد",
    image: "/placeholder.svg?height=400&width=600",
    description: "منطقة ترفيهية حديثة توفر إطلالات رائعة ومطاعم ومقاهي",
    location: "أبها",
    rating: 4.6,
    category: "ترفيه",
    status: "نشط",
    childFriendly: true,
  },
  {
    id: 4,
    name: "مطل السحاب",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "مطل يقع على ارتفاع شاهق يوفر إطلالات بانورامية على السحب والوديان",
    location: "عسير",
    rating: 4.7,
    category: "مطل طبيعي",
    status: "قيد التطوير",
    childFriendly: false,
  },
  {
    id: 5,
    name: "ممشى الضباب",
    image: "/placeholder.svg?height=400&width=600",
    description: "ممشى جميل يقع في منطقة مرتفعة غالبًا ما يغطيه الضباب",
    location: "عسير",
    rating: 4.5,
    category: "ممشى",
    status: "نشط",
    childFriendly: true,
  },
];

// Mock experiences data
export const mockExperiences: Experience[] = [
  {
    id: 1,
    title: "تجربة أحمد - رحلة مذهلة إلى السودة",
    titleEn: "Ahmed's Experience - Amazing Trip to Assouda",
    description:
      "رحلة رائعة جداً! استمتعت بالطبيعة الخلابة والأجواء الباردة في السودة. المناظر كانت خيالية والضباب أضاف جمالاً خاصاً للمكان.",
    descriptionEn:
      "Amazing trip! I enjoyed the stunning nature and cold weather in Assouda. The views were fantastic and the fog added special beauty to the place.",
    author: "أحمد بن علي",
    authorEmail: "ahmed@example.com",
    location: "أبها - السودة",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    rating: 5,
    date: "2024-12-15",
    status: "approved",
    language: "both",
    category: "طبيعة",
    tags: ["عائلي", "طبيعة", "منتزه"],
    days: 4,
    totalCost: "1200 ريال",
    groupSize: "عائلة (4 أشخاص)",
    season: "شتاء",
    dailyDetails: [
      {
        day: 1,
        title: "الوصول واستكشاف السودة",
        locations: [
          {
            name: "منتزه السودة",
            time: "10:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.2741, lng: 42.3647 },
            description:
              "بدأنا اليوم بزيارة منتزه السودة الشهير. الطقس كان بارداً والضباب يغطي المكان مما أضاف جمالاً خاصاً.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "ننصح بإحضار ملابس دافئة حتى في الصيف",
            rating: 5,
          },
          {
            name: "مطعم السودة التراثي",
            time: "1:30 م",
            duration: "ساعة واحدة",
            coordinates: { lat: 18.2751, lng: 42.3657 },
            description:
              "تناولنا الغداء في مطعم تراثي رائع يقدم الأكلات الشعبية المحلية.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "جربوا الكبسة العسيرية والعسل المحلي",
            rating: 4,
          },
        ],
        weather: "بارد وضبابي (15°م)",
        totalDistance: "25 كم",
        highlights: ["الضباب الكثيف", "المناظر الطبيعية", "الطعام التراثي"],
      },
      {
        day: 2,
        title: "استكشاف التراث في رجال ألمع",
        locations: [
          {
            name: "قرية رجال ألمع التراثية",
            time: "9:00 ص",
            duration: "4 ساعات",
            coordinates: { lat: 18.1975, lng: 42.3186 },
            description:
              "زيارة مذهلة للقرية التراثية. المباني الحجرية والألوان الزاهية تحكي تاريخ المنطقة.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "أفضل وقت للتصوير في الصباح الباكر",
            rating: 5,
          },
          {
            name: "متحف رجال ألمع",
            time: "2:00 م",
            duration: "ساعتان",
            coordinates: { lat: 18.1985, lng: 42.3196 },
            description:
              "متحف رائع يعرض تاريخ وثقافة المنطقة بطريقة تفاعلية ممتعة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "الدخول مجاني والجولات الإرشادية متوفرة",
            rating: 4,
          },
        ],
        weather: "معتدل ومشمس (22°م)",
        totalDistance: "45 كم",
        highlights: ["العمارة التراثية", "المتحف التفاعلي", "الحرف اليدوية"],
      },
      {
        day: 3,
        title: "المغامرة في جبل بوليفارد",
        locations: [
          {
            name: "جبل بوليفارد",
            time: "11:00 ص",
            duration: "5 ساعات",
            coordinates: { lat: 18.2167, lng: 42.5056 },
            description:
              "يوم مليء بالأنشطة الترفيهية والمطاعم الرائعة مع إطلالات خلابة على المدينة.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "احجزوا في المطاعم مسبقاً خاصة في عطلة نهاية الأسبوع",
            rating: 5,
          },
          {
            name: "التلفريك",
            time: "4:00 م",
            duration: "ساعة واحدة",
            coordinates: { lat: 18.2177, lng: 42.5066 },
            description:
              "رحلة تلفريك ممتعة توفر مناظر بانورامية رائعة للمنطقة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "أفضل وقت للركوب قبل الغروب",
            rating: 5,
          },
        ],
        weather: "لطيف ومعتدل (20°م)",
        totalDistance: "30 كم",
        highlights: ["التلفريك", "المطاعم المتنوعة", "الأنشطة الترفيهية"],
      },
      {
        day: 4,
        title: "ختام الرحلة في مطل السحاب",
        locations: [
          {
            name: "مطل السحاب",
            time: "8:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.2891, lng: 42.3747 },
            description:
              "ختمنا الرحلة بزيارة مطل السحاب. تجربة لا تُنسى وكأننا نلامس السحب حقاً.",
            photos: [
              "/placeholder.svg?height=200&width=300",
              "/placeholder.svg?height=200&width=300",
            ],
            tips: "اذهبوا في الصباح الباكر لتجنب الزحام والاستمتاع بالضباب",
            rating: 5,
          },
          {
            name: "ممشى الضباب",
            time: "12:00 م",
            duration: "ساعتان",
            coordinates: { lat: 18.2901, lng: 42.3757 },
            description:
              "مشي هادئ في ممشى الضباب كان الختام المثالي لرحلتنا الرائعة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "مناسب لجميع الأعمار ومجهز بمرافق ممتازة",
            rating: 4,
          },
        ],
        weather: "بارد وضبابي (16°م)",
        totalDistance: "20 كم",
        highlights: ["مطل السحاب", "الممشى الطبيعي", "الهدوء والاسترخاء"],
      },
    ],
  },
  {
    id: 2,
    title: "تجربة نورة - ثقافة وتراث رجال ألمع",
    titleEn: "Noura's Experience - Culture and Heritage of Rijal Almaa",
    description:
      "تجربة ثقافية مميزة في قرية رجال ألمع التراثية. المباني الحجرية والألوان الزاهية تحكي تاريخ المنطقة بشكل جميل.",
    descriptionEn:
      "A unique cultural experience in the heritage village of Rijal Almaa. The stone buildings and bright colors beautifully tell the history of the region.",
    author: "نورة الشهراني",
    authorEmail: "noura@example.com",
    location: "رجال ألمع",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4,
    date: "2024-12-10",
    status: "pending",
    language: "both",
    category: "تراث",
    tags: ["تراث", "ثقافة", "قرية"],
    days: 3,
    totalCost: "800 ريال",
    groupSize: "مجموعة أصدقاء (3 أشخاص)",
    season: "شتاء",
    dailyDetails: [
      {
        day: 1,
        title: "اكتشاف التراث",
        locations: [
          {
            name: "قرية رجال ألمع التراثية",
            time: "9:00 ص",
            duration: "4 ساعات",
            coordinates: { lat: 18.1975, lng: 42.3186 },
            description:
              "يوم كامل في استكشاف القرية التراثية والتعرف على تاريخها العريق.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "احضروا كاميرا للتصوير",
            rating: 5,
          },
        ],
        weather: "معتدل (20°م)",
        totalDistance: "10 كم",
        highlights: ["التراث", "الهندسة المعمارية"],
      },
      {
        day: 2,
        title: "الحرف التراثية",
        locations: [
          {
            name: "ورش الحرف اليدوية",
            time: "10:00 ص",
            duration: "3 ساعات",
            coordinates: { lat: 18.1985, lng: 42.3196 },
            description: "تعلم الحرف التراثية من الحرفيين المحليين.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "يمكن شراء منتجات يدوية أصلية",
            rating: 4,
          },
        ],
        weather: "مشمس (22°م)",
        totalDistance: "5 كم",
        highlights: ["الحرف اليدوية", "التعلم"],
      },
      {
        day: 3,
        title: "الطعام التراثي",
        locations: [
          {
            name: "المطعم التراثي",
            time: "12:00 م",
            duration: "2 ساعة",
            coordinates: { lat: 18.1965, lng: 42.3176 },
            description: "تذوق الأطباق التراثية الأصيلة.",
            photos: ["/placeholder.svg?height=200&width=300"],
            tips: "جربوا العريكة والقرصان",
            rating: 5,
          },
        ],
        weather: "معتدل (21°م)",
        totalDistance: "8 كم",
        highlights: ["الطعام التراثي", "الضيافة"],
      },
    ],
  },
  {
    id: 3,
    title: "",
    titleEn: "John's Experience - Hiking Adventure in Asir Mountains",
    description: "",
    descriptionEn:
      "Had an incredible hiking experience in the Asir mountains. The trails were well-marked and the scenery was breathtaking. Perfect for adventure seekers!",
    author: "John Smith",
    authorEmail: "john@example.com",
    location: "Asir Mountains",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    rating: 5,
    date: "2025-01-08",
    status: "approved",
    language: "en",
    category: "مغامرة",
    tags: ["hiking", "adventure", "mountains"],
  },
  {
    id: 4,
    title: "تجربة سارة - ليلة في جبل بوليفارد",
    titleEn: "Sara's Experience - Night at Boulevard Mountain",
    description:
      "قضيت أمسية رومانسية في جبل بوليفارد. الأجواء كانت ساحرة والإطلالة على المدينة مذهلة. المطاعم متنوعة والخدمة ممتازة.",
    descriptionEn:
      "Spent a romantic evening at Boulevard Mountain. The atmosphere was magical and the city view was amazing. The restaurants are diverse and the service is excellent.",
    author: "سارة أحمد",
    authorEmail: "sara@example.com",
    location: "جبل بوليفارد، أبها",
    images: ["/placeholder.svg?height=300&width=400"],
    rating: 4,
    date: "2025-01-05",
    status: "rejected",
    language: "both",
    category: "ترفيه",
    tags: ["رومانسي", "مطاعم", "إطلالة"],
  },
  {
    id: 5,
    title: "تجربة خالد - رحلة تصوير في ممشى الضباب",
    titleEn: "",
    description:
      "كمصور محترف، وجدت في ممشى الضباب جنة لالتقاط الصور. الضباب يضفي سحراً خاصاً على المكان وخاصة عند شروق الشمس.",
    descriptionEn: "",
    author: "خالد المالكي",
    authorEmail: "khalid@example.com",
    location: "ممشى الضباب، عسير",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    rating: 5,
    date: "2025-01-03",
    status: "pending",
    language: "ar",
    category: "تصوير",
    tags: ["تصوير", "ضباب", "شروق"],
  },
];

// Combine events and destinations for the discover page
export const getAllActivities = () => {
  // Convert to unified format for discover page
  const activities = [
    ...mockEvents.map((event) => ({
      id: event.id,
      name: event.name,
      image: event.image,
      description: event.description,
      type: "event" as const,
    })),
  ];

  return activities;
};
