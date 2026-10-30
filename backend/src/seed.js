// Default website content. Everything here can be edited from the admin dashboard.
// Facts come from the school's 2026-2027 parents' letter (BABYEYI 2026-2027) and
// the NESA / RTB accredited-school lists. Placeholder images use Unsplash and
// can be replaced with the school's own photos from the admin Media page.
const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  hero: '/uploads/campus-hero.jpg', // school building (own photo)
  campus: '/uploads/campus.jpg',
  workshop: '/uploads/st-04.jpg',
  computers: u('photo-1519389950473-47ba0277781c'),
  automobile: '/uploads/st-13.jpg',
  manufacturing: '/uploads/st-22.jpg',
  electricity: '/uploads/st-26.jpg',
  welding: '/uploads/st-19.jpg',
  carpentry: '/uploads/st-28.jpg',
  tailoring: '/uploads/st-01.jpg',
  students: '/uploads/st-09.jpg',
  classroom: '/uploads/st-22.jpg',
  calendar: u('photo-1506784983877-45594efa4cbe'),
  chapel: u('photo-1438032005730-c779502df39b'),
  sports: u('photo-1431324155629-1a6deb1dec8d'),
  dining: u('photo-1567521464027-f127ff144326'),
  library: u('photo-1521587760476-6c12a4b040da'),
  coding: u('photo-1555066931-4365d14bab8c'),
  team: '/uploads/st-25.jpg',
  graduation: '/uploads/st-05.jpg',
};

const now = new Date().toISOString();
const item = (obj, i) => ({ id: obj.id || obj.slug || `item-${i}`, order: i, createdAt: now, updatedAt: now, ...obj });

module.exports = {
  settings: {
    name: 'Saint Charles de Jesus TSS',
    shortName: 'St Charles de Jesus',
    abbreviation: 'SCJ TSS',
    tagline: 'Skills for life. Faith for the journey.',
    motto: 'Uburere · Ubumenyi · Guhanga',
    mottoMeaning: 'Education · Knowledge · Creativity',
    logo: '/images/logo.png',
    phones: ['+250 790 002 398', '+250 788 620 254'],
    email: 'vtskillsk@yahoo.fr',
    pobox: 'P.O. Box 5001 Kigali',
    address: 'Kagarama Sector, Kicukiro District, Kigali City, Rwanda',
    mapQuery: 'Kagarama, Kicukiro, Kigali, Rwanda',
    mapCoordinates: '-1.998636, 30.120315', // GPS pin of the school (Kagarama); editable in Admin > Site settings
    officeHours: 'Monday – Friday, 7:30 AM – 5:00 PM',
    socials: { facebook: '', instagram: '', youtube: '', twitter: '', tiktok: '', whatsapp: '' },
    portals: {
      studentPortal: '',
      parentPortal: '',
      studentEmail: '',
    },
    announcement: 'Admissions for the 2026–2027 academic year are open. Apply online or visit the school in Kagarama.',
    announcementActive: true,
  },

  home: {
    heroLine1: 'THE',
    heroLine2: 'WORKSHOP',
    heroLine3: 'of Skills & Faith',
    heroTypedWords: ['of Skills & Faith', 'of Innovation', 'of Opportunity'],
    heroSubtitle:
      'A private Catholic technical secondary school in Kagarama, Kicukiro, forming skilled, disciplined and creative young professionals for Rwanda.',
    heroImage: IMG.hero,
    heroVideo: '/uploads/campus-hero.mp4', // slow pan from the roof, rendered from the campus photo
    heroCtaText: 'Apply Now',
    heroCtaLink: '/admissions/apply',
    introHeading: 'Saint Charles de Jesus TSS delivers hands-on, competency-based technical education',
    introText:
      'Accredited by the Rwanda TVET Board and inspected by NESA, we train students from Level 1 to Level 5 in Software Development, Computer Systems and Architecture, Automobile Technology, Manufacturing Technology and essential Level 1 trades. Every programme pairs classroom theory with real workshop practice so our graduates leave ready for work, further study and self-employment.',
    introLinkText: 'Learn more',
    introLink: '/about',
    quickLinks: [
      { title: 'Our Programmes', icon: 'book', link: '/academics/programmes' },
      { title: 'Admissions', icon: 'admissions', link: '/admissions' },
      { title: 'Discover SCJ TSS', icon: 'school', link: '/student-life' },
      { title: 'School Calendar', icon: 'calendar', link: '/student-life/calendar' },
    ],
    whyTitle: 'Why join Saint Charles de Jesus...',
    whyText:
      'Saint Charles de Jesus TSS is a mixed day and boarding school in the Catholic tradition, located in Kagarama, Kicukiro District, Kigali City. We are small enough to know every learner by name and well-equipped enough to train them to national standards. Our workshops for automobile, manufacturing, electricity, welding, carpentry and tailoring, together with modern computer laboratories, let students practise the skills employers are looking for, while our chapel, clubs and sports build character, faith and teamwork.',
    whyImage: IMG.campus,
    whyLinkText: 'Learn more',
    whyLink: '/student-life',
    stats: [
      { value: '9', label: 'Accredited trades' },
      { value: 'L1 – L5', label: 'RTB qualification levels' },
      { value: 'Day & Boarding', label: 'Mixed school' },
      { value: '2', label: 'Modern computer labs' },
    ],
    programsHeading: 'Our Programmes',
    programsIntro:
      'Technical Secondary School (TSS) programmes run from Level 3 to Level 5 over three years. Level 1 short courses give fast, practical entry into a trade.',
    // Name, title and photo are shown from headTeacherMessage below.
    headTeacherQuote:
      'At Saint Charles de Jesus we believe that every young person carries a gift. Our task is to give that gift the skills, the discipline and the faith it needs to serve Rwanda and the world. We provide a safe, nurturing and inclusive environment where learners grow in knowledge, in creativity and in character.',
    newsHeading: 'Happening at Saint Charles de Jesus',
    newsIntro:
      'Stay up to date with the latest news and events happening at Saint Charles de Jesus TSS. We keep you informed about everything going on in our workshops, classrooms and playing fields, so check back often.',
    // Affiliations row under the news. Add a logo image from the Media page to replace the text badge.
    partners: [
      { name: 'Rwanda TVET Board', logo: '', link: 'https://rtb.gov.rw' },
      { name: 'NESA', logo: '', link: 'https://nesa.gov.rw' },
      { name: 'MINEDUC', logo: '', link: 'https://www.mineduc.gov.rw' },
      { name: 'Archdiocese of Kigali', logo: '', link: '' },
    ],
    testimonialsHeading: 'What our students say',
    ctaHeading: 'Ready to build your future with your own hands?',
    ctaText: 'Applications for the 2026–2027 academic year are open for Level 1 and Level 3 entry, and for transfers into Level 4 and Level 5.',
  },

  about: {
    title: 'About Saint Charles de Jesus TSS',
    subtitle: 'A Catholic technical secondary school in the heart of Kicukiro',
    heroImage: IMG.campus,
    intro: [
      'Saint Charles de Jesus TSS is a private, Catholic technical secondary school located in Kagarama Sector, Kicukiro District, Kigali City. We belong to the family of Catholic schools of the Archdiocese of Kigali and are accredited by the Rwanda TVET Board (RTB) and listed by the National Examination and School Inspection Authority (NESA) as a mixed day and boarding TSS.',
      'The school began as a vocational training centre (Charles de Jesus VTC) offering Level 1 trades to young people of Kicukiro, and has grown into a full Technical Secondary School offering Level 3 to Level 5 programmes in Software Development, Computer Systems and Architecture, Automobile Technology and Manufacturing Technology, alongside Level 1 courses in Welding, Tailoring, Carpentry, Domestic Electricity and Automobile.',
      'Our name honours Saint Charles de Foucauld, known in religious life as Brother Charles of Jesus. The heart and cross at the centre of our crest are his emblem, and his example of humble work, hospitality and brotherhood shapes the way we teach and live together.',
    ],
    mission:
      'To form competent, disciplined and creative technicians rooted in Christian values, through quality competency-based training that leads to employment, entrepreneurship and further studies.',
    vision:
      'To be a leading Catholic TVET school in Rwanda, recognised for graduates who combine technical excellence with integrity and service to the community.',
    values: [
      { title: 'Uburere (Education)', text: 'We form the whole person: mind, hands and heart.' },
      { title: 'Ubumenyi (Knowledge)', text: 'We pursue mastery of theory and practice to national standards.' },
      { title: 'Guhanga (Creativity)', text: 'We encourage innovation, problem-solving and entrepreneurship.' },
      { title: 'Faith & Service', text: 'We live the Gospel through respect, honesty and care for others.' },
      { title: 'Discipline', text: 'We value punctuality, responsibility and hard work.' },
      { title: 'Unity', text: 'We are one family of students, staff, parents and alumni.' },
    ],
    patronTitle: 'Our patron: Saint Charles de Foucauld (Brother Charles of Jesus)',
    patronImage: '/uploads/patron-charles-de-foucauld.jpg',
    patronText:
      'Charles de Foucauld (1858 – 1916) was a French army officer and explorer who, after a profound conversion, became a priest and lived among the Tuareg people of the Sahara as a "universal brother". He died at Tamanrasset in 1916, was beatified in 2005 and canonised on 15 May 2022. His emblem, the Sacred Heart surmounted by a cross, appears on our school crest. Like him, we strive to make faith visible through simple, skilled and generous work.',
    accreditationText:
      'Saint Charles de Jesus TSS appears on the NESA list of accredited schools operating in Kicukiro District (October 2024) with accredited trades in Automobile Technology (L3–L5), Manufacturing Technology (L3–L5), Domestic Electricity (L1), Carpentry (L1), Welding (L1) and Tailoring (L1), and on the Rwanda TVET Board list of accredited TVET schools.',
    image: IMG.team,
  },

  headTeacherMessage: {
    name: 'The Head Teacher',
    title: 'Head Teacher, Saint Charles de Jesus TSS',
    photo: '/uploads/head-teacher.jpg',
    paragraphs: [
      'Dear parents, students and friends of Saint Charles de Jesus TSS, welcome to our school.',
      'Technical and vocational education is the engine of Rwanda\'s development. Every day in our workshops and laboratories, young people learn to code, to repair engines, to weld, to build, to sew and to wire homes, and in doing so they learn that work done well is a form of prayer and a service to their community.',
      'We are a mixed day and boarding school, and we take seriously our duty to provide a safe, nurturing and inclusive environment. Our teachers are qualified trainers who follow the competency-based curriculum of the Rwanda TVET Board, and our chaplaincy, clubs and sports make sure that character grows together with skill.',
      'I invite you to visit us in Kagarama, to meet our students and to see what they are able to make. Together, in the spirit of our motto, Uburere, Ubumenyi, Guhanga, we will build a future that our children can be proud of.',
    ],
    signature: 'The Head Teacher',
  },

  admissions: {
    intro:
      'Saint Charles de Jesus TSS welcomes students into Level 1 short courses and into Level 3 of our three-year TSS programmes. Transfers into Level 4 and Level 5 are considered on a case-by-case basis for students coming from other accredited TVET schools in the same trade.',
    heroImage: IMG.classroom,
    academicYear: '2026 – 2027',
    whoCanApply: [
      'Level 3 (TSS entry): students who have completed Ordinary Level (S3) and sat the national examination, choosing SOD, CSA, AUT or MAT.',
      'Level 4 and Level 5 transfers: students who passed the previous level in the same trade at an RTB-accredited school.',
      'Level 1 short courses (Welding, Tailoring, Carpentry, Domestic Electricity, Automobile): open to youth and adults who wish to acquire a practical trade quickly.',
      'Both day and boarding places are available for girls and boys.',
    ],
    steps: [
      { title: 'Enquire', text: 'Call +250 790 002 398 / +250 788 620 254 or email vtskillsk@yahoo.fr, or submit the online application form.' },
      { title: 'Submit documents', text: 'Bring the required documents to the school office in Kagarama, Kicukiro, or attach scanned copies to your online application.' },
      { title: 'Placement interview', text: 'The academic office reviews results and meets the student and parent to confirm the trade and level.' },
      { title: 'Registration & payment', text: 'Pay the registration fee and first-term fees to the school bank account and present the bank slip.' },
      { title: 'Welcome day', text: 'Receive the school uniform, timetable and boarding allocation. Classes begin on the first day of the term.' },
    ],
    documents: [
      'Copy of the national examination results slip or previous level certificate',
      'Copy of the last school report',
      'Copy of ID card or birth certificate',
      '2 passport-size photographs (photos can also be taken at the school for 500 RWF)',
      'Transfer letter for students joining Level 4 or Level 5',
      'Mutuelle de santé / medical insurance card',
    ],
    fees: {
      note: 'Fees are per term in Rwandan Francs (RWF) as published in the school requirements letter for 2026 – 2027. Externe = day student, Interne = boarding student.',
      terms: [
        {
          name: 'Term 1',
          day: 218500,
          boarding: 275500,
          items: [
            { label: 'Registration (Kwiyandikisha)', day: 5000, boarding: 5000 },
            { label: 'Tuition (Minerval)', day: 135000, boarding: 135000 },
            { label: 'Restaurant', day: 40000, boarding: 90000 },
            { label: 'Insurance (Ubwishingizi)', day: 3000, boarding: 3000 },
            { label: 'Mattress (Matelas)', day: 0, boarding: 4000 },
            { label: 'Blanket (Ikiringiti)', day: 0, boarding: 3000 },
            { label: 'Student card (Ikarita)', day: 1500, boarding: 1500 },
            { label: 'Haircut (Kwiyogoshesha)', day: 4000, boarding: 4000 },
            { label: 'Equipment maintenance (Isanwa ry\'ibikoresho)', day: 30000, boarding: 30000 },
          ],
        },
        {
          name: 'Term 2',
          day: 175000,
          boarding: 236000,
          items: [
            { label: 'Tuition (Minerval)', day: 135000, boarding: 135000 },
            { label: 'Restaurant', day: 40000, boarding: 90000 },
            { label: 'Mattress (Matelas)', day: 0, boarding: 4000 },
            { label: 'Blanket (Ikiringiti)', day: 0, boarding: 3000 },
            { label: 'Haircut (Kwiyogoshesha)', day: 0, boarding: 4000 },
          ],
        },
        {
          name: 'Term 3',
          day: 175000,
          boarding: 236000,
          items: [
            { label: 'Tuition (Minerval)', day: 135000, boarding: 135000 },
            { label: 'Restaurant', day: 40000, boarding: 90000 },
            { label: 'Mattress (Matelas)', day: 0, boarding: 4000 },
            { label: 'Blanket (Ikiringiti)', day: 0, boarding: 3000 },
            { label: 'Haircut (Kwiyogoshesha)', day: 0, boarding: 4000 },
          ],
        },
      ],
      otherCosts: [
        { label: 'School uniform: 2 trousers + 1 shirt', amount: '22,000 RWF' },
        { label: 'School T-shirts (2)', amount: '14,000 RWF' },
        { label: 'Workshop overall (Isarubeti)', amount: '15,000 RWF' },
        { label: 'Sweater (Umupira w\'imbeho)', amount: '15,000 RWF' },
        { label: 'Fostering file / portfolio', amount: '3,500 RWF' },
        { label: 'Table utensils (Ibikoresho byo ku meza)', amount: '5,000 RWF' },
        { label: 'Breakfast (Ifunguro rya mu gitondo)', amount: '9,000 RWF' },
        { label: 'Building maintenance (Gusana inyubako)', amount: '5,000 RWF' },
        { label: 'Driving practice (highway code lessons are free)', amount: '160,000 RWF' },
      ],
      bankAccounts: [
        { bank: 'BPR Bank', number: '407212930310125', name: 'CHARLES DE JESUS VTC' },
        { bank: 'Equity Bank', number: '4025200051480', name: 'ST CHARLES DE JESUS TSS' },
      ],
      feesLetterUrl: '',
    },
    requiredItems: [
      'Passport photos (can be taken at school, 500 RWF)',
      'School uniform bought at school: 2 trousers and 1 shirt, 2 T-shirts, 1 workshop overall',
      'Sweater',
      'Sports shoes',
      '2 pairs of black shoes including workshop shoes (AUT, MAT, Welding, Carpentry, Electricity), white socks (2 pairs) and black socks',
      'Fostering file (portfolio)',
      'Paper: 2 reams per year',
      'Hygienic paper: 10 pieces per year',
      'Mop (Umukoropesho)',
      'Table utensils',
      'Hoe (Isuka)',
    ],
    boardingItems: [
      '2 pairs of bed sheets and a mosquito net',
      'Medical insurance card',
      'Bucket, flip-flops and padlock',
      'Hygiene kit: soap, toothpaste, toothbrush, body lotion, and sanitary pads and a wrap (igitenge) for girls',
    ],
    materials: [
      { trade: 'SOD (L3 / L4 / L5)', items: '2 register notebooks, 12 / 13 / 11 notebooks of 200 pages, 2 notebooks of 96 pages, scientific calculator, mathematical set, drawing book' },
      { trade: 'CSA (L3 / L4 / L5)', items: '12 / 17 / 17 notebooks of 200 pages, 3 notebooks of 96 pages, scientific calculator, mathematical set (drawing), 2 / 3 / 1 register notebooks, drawing book' },
      { trade: 'AUT (L3 / L4 / L5)', items: '2 register notebooks, 12 / 13 / 11 notebooks of 200 pages, 4 / 2 / 2 notebooks of 96 pages, scientific calculator, mathematical set, drawing book' },
      { trade: 'MAT (L3 / L4 / L5)', items: '2 register notebooks, 12 / 13 / 11 notebooks of 200 pages, 4 / 2 / 2 notebooks of 96 pages, scientific calculator, mathematical set, drawing book' },
      { trade: 'Level 1: Welding', items: '2 register notebooks, 4 notebooks of 200 pages, tape measure, welding goggles' },
      { trade: 'Level 1: Tailoring', items: '2 register notebooks, 4 notebooks of 200 pages, tailor\'s tape measure' },
      { trade: 'Level 1: Carpentry', items: '2 register notebooks, 4 notebooks of 200 pages, tape measure' },
      { trade: 'Level 1: Electricity', items: '2 register notebooks, 4 notebooks of 200 pages, tape measure' },
      { trade: 'Level 1: Automobile', items: '2 register notebooks, 4 notebooks of 200 pages' },
    ],
    notes: [
      'Highway-code (traffic rules) lessons are offered to students free of charge; practical driving costs 160,000 RWF.',
      'Students sitting the provisional driving test pay their own registration, and pay the examination fees when taking the definitive permit test.',
      'Industrial attachment (internship / stage) costs are paid by the student.',
      'Visits to students are made by parents or by other persons who have informed the school administration.',
    ],
    programsForForm: ['SOD – Software Development', 'CSA – Computer Systems & Architecture', 'AUT – Automobile Technology', 'MAT – Manufacturing Technology', 'L1 – Welding', 'L1 – Tailoring', 'L1 – Carpentry', 'L1 – Domestic Electricity', 'L1 – Automobile'],
  },

  studentLife: {
    title: 'Discover Saint Charles de Jesus',
    intro:
      'Life at Saint Charles de Jesus is busy, practical and joyful. Mornings begin with assembly and prayer, days are shared between classrooms, computer labs and workshops, and afternoons belong to sports, clubs and study. Boarders live on campus in supervised dormitories with three meals a day; day students join from across Kicukiro.',
    heroImage: IMG.students,
    highlights: [
      { title: 'Workshops & labs', text: 'Real tools, real projects. Students build, repair, code and sew under qualified trainers.', image: IMG.workshop },
      { title: 'Boarding life', text: 'Supervised dormitories, evening study, weekend activities and a caring matron and patron team.', image: IMG.dining },
      { title: 'Faith & chaplaincy', text: 'Mass, prayer groups and retreats are open to all; students of every faith are welcome and respected.', image: IMG.chapel },
      { title: 'Sports', text: 'Football, volleyball, basketball and athletics, with inter-class and inter-school competitions.', image: IMG.sports },
    ],
    dailySchedule: [
      { time: '06:00', activity: 'Wake-up, hygiene and breakfast (boarders)' },
      { time: '07:20', activity: 'Assembly and morning prayer' },
      { time: '07:40 – 12:40', activity: 'Lessons: theory classes, laboratories and workshops' },
      { time: '12:40 – 13:40', activity: 'Lunch' },
      { time: '13:40 – 16:20', activity: 'Lessons and practical sessions' },
      { time: '16:30 – 18:00', activity: 'Sports, clubs and personal projects' },
      { time: '19:00 – 21:00', activity: 'Supper and evening study (boarders)' },
    ],
    calendarNote:
      'Dates below are indicative and follow the Rwanda national school calendar. Always confirm with the school office before travelling.',
    terms: [
      { name: 'Term 1', start: 'September 2026', end: 'December 2026', notes: 'Registration, orientation week, first assessments' },
      { name: 'Term 2', start: 'January 2027', end: 'April 2027', notes: 'Industrial attachment preparation, inter-school sports' },
      { name: 'Term 3', start: 'April 2027', end: 'July 2027', notes: 'National practical and theory examinations, graduation' },
    ],
    handbookUrl: '',
    diningMenuUrl: '',
  },

  alumni: {
    title: 'Alumni',
    intro:
      'Graduates of Saint Charles de Jesus work as software developers, network technicians, mechanics, machine operators, electricians, welders, carpenters and tailors across Kigali and beyond, and many have started their own workshops and businesses. Our alumni network keeps former students connected to the school and to each other.',
    image: IMG.graduation,
    benefits: [
      'Invitations to career talks, mentoring and alumni days',
      'Access to the school workshops for short refresher sessions',
      'A directory of alumni businesses for the school community',
      'Opportunities to support current students through internships and scholarships',
    ],
  },

  careers: {
    title: 'Work With Us',
    intro:
      'We are always interested in hearing from qualified TVET trainers, teachers of general subjects, boarding staff and support staff who share our values. Send your CV, copies of qualifications and a short cover letter to vtskillsk@yahoo.fr or deliver them to the school office in Kagarama.',
    image: IMG.team,
  },

  policiesPage: {
    title: 'Policies & Procedures',
    intro:
      'Our policies exist to keep every learner safe, respected and focused on learning. Parents and students receive the full rules and regulations at registration and agree to them when joining the school.',
  },

  programs: [
    {
      slug: 'software-development', code: 'SOD', name: 'Software Development', category: 'TSS', level: 'Level 3 – Level 5', duration: '3 years', image: IMG.coding,
      summary: 'Design, build and maintain web, desktop and mobile applications using modern programming languages and databases.',
      description: 'The Software Development programme follows the Rwanda TVET Board competency-based curriculum. Students progress from computer fundamentals and programming logic in Level 3 to databases, web and mobile development in Level 4, and system analysis, project management and a capstone software project in Level 5. Graduates sit the national TVET examinations and receive a Level 5 TVET certificate.',
      modules: ['Computer fundamentals and office applications', 'Programming logic, C and Python', 'Web development: HTML, CSS, JavaScript, PHP', 'Database design and SQL', 'Object-oriented programming with Java', 'Mobile application development', 'Software analysis, design and testing', 'Entrepreneurship, English, Kinyarwanda and mathematics'],
      careers: ['Junior software developer', 'Web developer', 'Database assistant', 'IT support technician', 'Freelance app developer', 'Further study at IPRC / university'],
    },
    {
      slug: 'computer-systems-architecture', code: 'CSA', name: 'Computer Systems & Architecture', category: 'TSS', level: 'Level 3 – Level 5', duration: '3 years', image: IMG.computers,
      summary: 'Assemble, repair, network and secure computer systems for homes, offices and institutions.',
      description: 'Computer Systems and Architecture trains hardware and network technicians. Students learn to assemble and troubleshoot computers, install operating systems, configure local and wide area networks, manage servers and protect systems against threats. Practical work takes place in the school\'s computer laboratories and on live installations.',
      modules: ['Computer hardware and maintenance', 'Operating systems installation and administration', 'Computer networking and cabling', 'Server administration', 'Network security basics', 'Electronics fundamentals', 'Technical drawing and documentation', 'Entrepreneurship, English, Kinyarwanda and mathematics'],
      careers: ['Computer maintenance technician', 'Network technician', 'ICT support officer', 'Internet service provider field technician', 'Computer shop owner'],
    },
    {
      slug: 'automobile-technology', code: 'AUT', name: 'Automobile Technology', category: 'TSS', level: 'Level 3 – Level 5', duration: '3 years', image: IMG.automobile,
      summary: 'Diagnose, service and repair petrol and diesel vehicles, from engines to electrical systems.',
      description: 'Our Automobile Technology programme is accredited by NESA at Level 3 to Level 5. In the automobile workshop students strip and rebuild engines, service braking, steering and suspension systems, diagnose electrical and electronic faults and learn modern diagnostic tools. Highway-code lessons are included free of charge and students may add practical driving.',
      modules: ['Engine technology and overhaul', 'Fuel, cooling and lubrication systems', 'Transmission and drivetrain', 'Brakes, steering and suspension', 'Automotive electrical and electronic systems', 'Vehicle diagnosis and servicing', 'Workshop safety and tools', 'Entrepreneurship, English, Kinyarwanda and mathematics'],
      careers: ['Automobile mechanic', 'Service technician in a garage or dealership', 'Fleet maintenance technician', 'Garage owner', 'Spare parts specialist'],
    },
    {
      slug: 'manufacturing-technology', code: 'MAT', name: 'Manufacturing Technology', category: 'TSS', level: 'Level 3 – Level 5', duration: '3 years', image: IMG.manufacturing,
      summary: 'Machining, fabrication and production technology for Rwanda\'s growing industry.',
      description: 'Manufacturing Technology (also called Manufacturing and Production Technology) prepares machine operators and production technicians. Students learn bench fitting, turning, milling, welding and fabrication, CAD drawing, and quality control, and complete industrial attachment in local manufacturing companies.',
      modules: ['Bench work and fitting', 'Lathe turning and milling', 'Welding and metal fabrication', 'Engineering drawing and CAD', 'Materials and measurements', 'Production planning and quality control', 'Maintenance of machines', 'Entrepreneurship, English, Kinyarwanda and mathematics'],
      careers: ['Machine operator', 'Production technician', 'Fabrication workshop technician', 'Maintenance technician', 'Small-scale manufacturer'],
    },
    {
      slug: 'welding-level-1', code: 'WEL', name: 'Welding', category: 'Level 1', level: 'Level 1', duration: '1 year', image: IMG.welding,
      summary: 'Arc and gas welding for construction, furniture and fabrication.',
      description: 'The Level 1 Welding course gives trainees the safety knowledge and hand skills to perform arc and gas welding, cutting and basic metal fabrication. Trainees make gates, doors, windows and furniture during the course.',
      modules: ['Workshop safety and PPE', 'Arc welding (SMAW)', 'Gas welding and cutting', 'Metal measurement and marking', 'Basic fabrication projects'],
      careers: ['Welder', 'Metal fabrication workshop assistant', 'Self-employed artisan'],
    },
    {
      slug: 'tailoring-level-1', code: 'TAI', name: 'Tailoring', category: 'Level 1', level: 'Level 1', duration: '1 year', image: IMG.tailoring,
      summary: 'Garment cutting and sewing for men, women and children.',
      description: 'The Level 1 Tailoring course covers taking measurements, drafting patterns, cutting and machine sewing of everyday garments, school uniforms and simple fashion pieces. Trainees leave able to work in a tailoring shop or start their own.',
      modules: ['Sewing machine operation and maintenance', 'Measurement and pattern drafting', 'Cutting and sewing of shirts, skirts and trousers', 'Finishing and quality', 'Costing and selling garments'],
      careers: ['Tailor', 'Garment factory operator', 'Self-employed designer'],
    },
    {
      slug: 'carpentry-level-1', code: 'CAR', name: 'Carpentry', category: 'Level 1', level: 'Level 1', duration: '1 year', image: IMG.carpentry,
      summary: 'Wood joinery and furniture making with hand and power tools.',
      description: 'Trainees in the Level 1 Carpentry course learn to measure, cut and join timber safely to produce furniture, doors and simple structures, using both hand tools and machines in the school carpentry workshop.',
      modules: ['Timber and tools', 'Measuring, marking and cutting', 'Wood joints', 'Furniture projects: tables, chairs, beds', 'Finishing: sanding, varnishing, painting'],
      careers: ['Carpenter', 'Furniture workshop assistant', 'Construction site joiner'],
    },
    {
      slug: 'domestic-electricity-level-1', code: 'ELE', name: 'Domestic Electricity', category: 'Level 1', level: 'Level 1', duration: '1 year', image: IMG.electricity,
      summary: 'Safe installation and maintenance of electrical systems in homes and small buildings.',
      description: 'The Level 1 Domestic Electricity course teaches trainees to install lighting and socket circuits, distribution boards and earthing in houses, and to find and repair faults safely according to Rwandan standards.',
      modules: ['Electrical safety', 'Tools, cables and accessories', 'Reading simple wiring diagrams', 'House wiring installation', 'Fault finding and repair'],
      careers: ['Domestic electrician', 'Electrical installation assistant', 'Solar home-system installer'],
    },
    {
      slug: 'automobile-level-1', code: 'AUT-L1', name: 'Automobile (Level 1)', category: 'Level 1', level: 'Level 1', duration: '1 year', image: IMG.automobile,
      summary: 'Basic vehicle servicing and maintenance.',
      description: 'A one-year entry course into vehicle maintenance: routine servicing, tyre and brake work, basic engine checks and workshop safety. A stepping stone to the full Automobile Technology programme.',
      modules: ['Workshop safety', 'Vehicle systems overview', 'Routine servicing', 'Tyres, brakes and batteries', 'Basic diagnostics'],
      careers: ['Garage assistant', 'Service station technician'],
    },
  ].map(item),

  news: [
    {
      slug: 'welcome-to-the-2026-2027-academic-year', title: 'Welcome to the 2026 – 2027 academic year', date: '2026-09-14', image: IMG.students,
      excerpt: 'Our gates open for a new year of learning. Here is what new and returning students need to know for the first week of Term 1.',
      body: 'Saint Charles de Jesus TSS welcomes all new and returning students for the 2026 – 2027 academic year.\n\nBoarding students report on the Sunday before classes begin with their bedding, hygiene kit and medical insurance card. Day students report on the first morning of the term by 07:20 for assembly.\n\nNew students collect their uniforms, workshop overalls and timetables from the bursar\'s office after presenting the bank slip for Term 1 fees. Orientation sessions during the first week introduce the workshops, computer laboratories, the chapel and the school rules.\n\nWe wish every learner a year of growth in skills, knowledge and creativity.',
    },
    {
      slug: 'school-requirements-and-fees-for-2026-2027', title: 'School requirements and fees for 2026 – 2027 published', date: '2026-08-20', image: IMG.classroom,
      excerpt: 'The list of requirements, learning materials per trade and the fee structure per term is now available for parents.',
      body: 'The school administration has published the list of requirements for students of Saint Charles de Jesus TSS for the 2026 – 2027 academic year.\n\nThe document lists the uniform items sold at school, the learning materials required for each trade and level, the items that boarding students must bring, and the fees per term for day (externe) and boarding (interne) students.\n\nFees are paid to the school accounts at BPR Bank (407212930310125, Charles de Jesus VTC) or Equity Bank (4025200051480, St Charles de Jesus TSS). The full fee structure is on our Admissions page.',
    },
    {
      slug: 'inside-our-workshops-where-skills-are-made', title: 'Inside our workshops: where skills are made', date: '2026-06-05', image: IMG.workshop,
      excerpt: 'From engine overhauls to welded gates and hand-sewn uniforms, a look at a typical practical week across our trades.',
      body: 'Practical training is the heart of a TSS. In a typical week, Automobile Technology students strip and rebuild an engine, Manufacturing Technology students turn and mill components on the lathe, Level 1 welders produce window frames, carpenters finish a set of school benches, electricity trainees wire a demonstration house and tailoring trainees sew uniforms for the new intake.\n\nIn the computer laboratories, SOD students build web applications for the school while CSA students install and secure the school network.\n\nEvery product made in our workshops is assessed against RTB competency standards and many are used by the school or sold to the community, giving students a real taste of production.',
    },
    {
      slug: 'level-5-students-prepare-for-national-assessments', title: 'Level 5 students prepare for national assessments', date: '2026-05-12', image: IMG.coding,
      excerpt: 'Our final-year students are completing capstone projects and industrial attachment reports ahead of the national TVET examinations.',
      body: 'Level 5 students in Software Development, Computer Systems and Architecture, Automobile Technology and Manufacturing Technology are in the final stretch of their programmes.\n\nEach student presents a capstone project and an industrial attachment report before sitting the national theory and practical examinations organised by the Rwanda TVET Board.\n\nTeachers are running revision sessions and mock practical assessments in the evenings and on Saturdays. We wish all candidates success.',
    },
  ].map(item),

  testimonials: [
    { name: 'Byiringiro Christian', role: 'Level 5, Software Development', photo: '/uploads/byiringiro-christian.jpg', quote: 'I came to Saint Charles de Jesus knowing nothing about programming. Today I build websites and mobile apps, and I have already done an internship with a company in Kigali. The teachers push us to practise every day.' },
    { name: 'Bryan', role: 'Level 4, Automobile Technology', photo: '/uploads/bryan.jpg', quote: 'The workshop is the best part of the school. We work on real vehicles, not only drawings, and the trainers show us how garages in Kigali actually work. I want to open my own garage one day.' },
    { name: 'Christian', role: 'Level 5, Manufacturing Technology', photo: '/uploads/christian.jpg', quote: 'Learning to use the lathe and the welding machines gave me confidence. During my industrial attachment I could already produce parts on my own. The discipline here prepares you for the workplace.' },
    { name: 'Claude', role: 'Level 3, Computer Systems & Architecture', photo: '/uploads/claude.jpg', quote: 'I like that we learn both the theory and the practice. In my first year I have already assembled a computer and installed a small network in the lab. Boarding life is friendly and the school feels like a family.' },
  ].map(item),

  staff: [
    { name: 'The Head Teacher', role: 'Head Teacher', department: 'Administration', photo: '', bio: 'Leads the school and represents it to parents, the Archdiocese, RTB and NESA. Update this profile from the admin dashboard.' },
    { name: 'Deputy Head Teacher', role: 'Deputy Head Teacher in charge of Studies', department: 'Administration', photo: '', bio: 'Coordinates the academic programme, timetables, assessments and national examinations.' },
    { name: 'Deputy Head Teacher', role: 'Deputy Head Teacher in charge of Discipline', department: 'Administration', photo: '', bio: 'Responsible for student welfare, discipline and boarding life.' },
    { name: 'Bursar', role: 'Bursar', department: 'Administration', photo: '', bio: 'Handles fees, bank slips, uniforms and school supplies.' },
    { name: 'Head of ICT Trades', role: 'Head of Department: SOD & CSA', department: 'ICT', photo: '', bio: 'Leads the Software Development and Computer Systems and Architecture teams and the computer laboratories.' },
    { name: 'Head of Engineering Trades', role: 'Head of Department: AUT & MAT', department: 'Engineering', photo: '', bio: 'Leads the Automobile and Manufacturing Technology workshops.' },
    { name: 'Head of Level 1 Trades', role: 'Head of Department: Welding, Carpentry, Electricity, Tailoring', department: 'Level 1', photo: '', bio: 'Coordinates the Level 1 short courses and their workshops.' },
    { name: 'School Chaplain', role: 'Chaplain', department: 'Chaplaincy', photo: '', bio: 'Animates the spiritual life of the school: Mass, prayer groups, retreats and pastoral care.' },
  ].map(item),

  facilities: [
    { title: 'Computer laboratories', text: 'Two networked computer labs with internet access for SOD and CSA practice, research and digital literacy.', image: IMG.computers },
    { title: 'Automobile workshop', text: 'Engines, vehicles, lifting equipment and diagnostic tools for Automobile Technology.', image: IMG.automobile },
    { title: 'Manufacturing workshop', text: 'Lathes, milling, drilling and fitting benches for Manufacturing Technology.', image: IMG.manufacturing },
    { title: 'Welding, carpentry & electricity workshops', text: 'Dedicated spaces and tools for the Level 1 trades, with safety equipment for every trainee.', image: IMG.welding },
    { title: 'Tailoring room', text: 'Industrial and domestic sewing machines, cutting tables and pattern-making space.', image: IMG.tailoring },
    { title: 'Classrooms & library', text: 'Bright classrooms for theory lessons and a reading room for study and research.', image: IMG.library },
    { title: 'Boarding & dining', text: 'Separate dormitories for girls and boys, a dining hall serving three meals a day and a sick bay.', image: IMG.dining },
    { title: 'Chapel & sports ground', text: 'A chapel for Mass and prayer, and grounds for football, volleyball and basketball.', image: IMG.sports },
  ].map(item),

  clubs: [
    { name: 'ICT & Innovation Club', text: 'Coding challenges, robotics ideas and tech talks for students of every trade.' },
    { name: 'Entrepreneurship Club', text: 'Business plans, small enterprises and Made-in-Rwanda product exhibitions.' },
    { name: 'Anti-Genocide / Unity Club', text: 'Promotes unity, reconciliation and Ndi Umunyarwanda values.' },
    { name: 'Environment Club', text: 'Tree planting, waste management and the school garden.' },
    { name: 'Choir & Liturgy Group', text: 'Animates school Masses and celebrations with music.' },
    { name: 'Debate & Culture Club', text: 'Public speaking in English, French and Kinyarwanda, drama and traditional dance.' },
    { name: 'Anti-drug & Health Club', text: 'Peer education on health, hygiene and a drug-free life.' },
    { name: 'Scouts', text: 'Outdoor skills, service and leadership.' },
  ].map(item),

  sports: [
    { name: 'Football', text: 'Boys\' and girls\' teams competing in inter-class and district tournaments.' },
    { name: 'Volleyball', text: 'A school favourite with afternoon training sessions.' },
    { name: 'Basketball', text: 'Open to all levels, with coaching from staff.' },
    { name: 'Athletics', text: 'Track and cross-country events, including the annual school sports day.' },
    { name: 'Traditional dance', text: 'Intore and Rwandan cultural dance troupe performing at school events.' },
  ].map(item),

  events: [
    { title: 'Term 1 begins', date: '2026-09-14', text: 'Boarders report the day before. Orientation week for new students.' },
    { title: 'Parents\' meeting', date: '2026-10-24', text: 'Parents meet class teachers and the administration to review progress and school life.' },
    { title: 'Term 1 ends', date: '2026-12-18', text: 'End-of-term assessments and reports.' },
    { title: 'Term 2 begins', date: '2027-01-11', text: 'Industrial attachment preparation for Level 4 and Level 5.' },
    { title: 'School sports day', date: '2027-03-12', text: 'Athletics and team finals on the school grounds.' },
    { title: 'Term 3 begins', date: '2027-04-19', text: 'Revision and mock practical assessments.' },
    { title: 'National TVET examinations', date: '2027-06-21', text: 'Level 5 theory and practical examinations.' },
    { title: 'Graduation & prize day', date: '2027-07-09', text: 'Celebration of graduates and best performers.' },
  ].map(item),

  faqs: [
    { question: 'Where is the school located?', answer: 'In Kagarama Sector, Kicukiro District, Kigali City. Our postal address is P.O. Box 5001 Kigali.' },
    { question: 'Is the school day or boarding?', answer: 'Both. Saint Charles de Jesus TSS is a mixed school with day (externe) and boarding (interne) places for girls and boys.' },
    { question: 'Which programmes do you offer?', answer: 'Level 3 to Level 5: Software Development (SOD), Computer Systems and Architecture (CSA), Automobile Technology (AUT) and Manufacturing Technology (MAT). Level 1: Welding, Tailoring, Carpentry, Domestic Electricity and Automobile.' },
    { question: 'How much are the fees?', answer: 'For 2026 – 2027: Term 1 is 218,500 RWF (day) or 275,500 RWF (boarding); Terms 2 and 3 are 175,000 RWF (day) or 236,000 RWF (boarding). See the Admissions page for the full breakdown.' },
    { question: 'How do I pay?', answer: 'By bank deposit to BPR Bank account 407212930310125 (Charles de Jesus VTC) or Equity Bank account 4025200051480 (St Charles de Jesus TSS). Present the bank slip at the bursar\'s office.' },
    { question: 'Can I join Level 4 or Level 5 from another school?', answer: 'Yes, if you passed the previous level in the same trade at an RTB-accredited school. Bring your transfer letter and results.' },
    { question: 'Is the school Catholic? Can non-Catholics apply?', answer: 'We are a Catholic school of the Archdiocese of Kigali, and students of all faiths are welcome and respected.' },
    { question: 'Can parents visit students?', answer: 'Yes. Visits to students are made by parents, or by other persons who have informed the school administration in advance.' },
  ].map(item),

  gallery: [
    { caption: 'Computer laboratory', image: IMG.computers },
    { caption: 'Automobile workshop', image: IMG.automobile },
    { caption: 'Welding practice', image: IMG.welding },
    { caption: 'Students on campus', image: IMG.students },
    { caption: 'Tailoring room', image: IMG.tailoring },
    { caption: 'Sports day', image: IMG.sports },
  ].map(item),

  policies: [
    { title: 'Child protection and safeguarding', text: 'Every member of staff is responsible for the safety and dignity of students. Any concern can be reported confidentially through the "Report a concern" form on our website or directly to the Head Teacher.' },
    { title: 'Discipline and conduct', text: 'Students follow the school rules on punctuality, uniform, respect for others and care of school property. Serious misconduct is handled by the discipline committee with parents involved.' },
    { title: 'Anti-bullying and anti-harassment', text: 'Bullying, harassment and discrimination of any kind are not tolerated. Reports are investigated promptly and victims are supported.' },
    { title: 'Workshop and laboratory safety', text: 'Personal protective equipment is compulsory in every workshop. Students are trained in safe use of tools and machines before practical work begins.' },
    { title: 'Attendance and visits', text: 'Attendance is compulsory. Visits to students are made by parents, or by other persons who have informed the school administration.' },
    { title: 'Fees and refunds', text: 'Fees are paid per term in advance to the school bank accounts. Registration fees are not refundable.' },
    { title: 'Health and hygiene', text: 'All students must hold valid medical insurance. The school keeps a sick bay and refers serious cases to nearby health facilities.' },
    { title: 'ICT acceptable use', text: 'School computers and internet are for learning. Access to inappropriate content and misuse of school equipment are prohibited.' },
  ].map(item),

  vacancies: [],

  inquiries: [],
  applications: [],
  concerns: [],
  users: [],
};
