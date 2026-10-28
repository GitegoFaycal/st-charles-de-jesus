// Field schemas that drive the admin forms.
// Types: text, textarea, number, boolean, date, select, image, file,
//        lines (array of strings, one per line), paragraphs (array of strings separated by blank lines),
//        list (array of objects with `fields`), object (nested `fields`).

const img = (key, label) => ({ key, label, type: 'image' })
const text = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra })
const area = (key, label, extra = {}) => ({ key, label, type: 'textarea', ...extra })
const lines = (key, label, help) => ({ key, label, type: 'lines', help: help || 'One item per line' })
const list = (key, label, fields, itemLabel) => ({ key, label, type: 'list', fields, itemLabel })

export const SECTIONS = {
  settings: {
    title: 'Site settings',
    description: 'School identity, contacts, social links and the announcement bar.',
    fields: [
      text('name', 'School name'),
      text('shortName', 'Short name (shown in the header)'),
      text('abbreviation', 'Abbreviation'),
      text('tagline', 'Tagline'),
      text('motto', 'Motto'),
      text('mottoMeaning', 'Motto meaning'),
      img('logo', 'Logo'),
      lines('phones', 'Phone numbers'),
      text('email', 'Email'),
      text('pobox', 'P.O. Box'),
      text('address', 'Physical address'),
      text('mapQuery', 'Google Maps search text (for the map on the Contacts page)'),
      { key: 'mapCoordinates', label: 'Exact school location (GPS) for the Contacts map', type: 'geo' },
      text('officeHours', 'Office hours'),
      {
        key: 'socials', label: 'Social media links (leave empty to hide)', type: 'object',
        fields: [text('facebook', 'Facebook URL'), text('instagram', 'Instagram URL'), text('youtube', 'YouTube URL'), text('twitter', 'X / Twitter URL'), text('tiktok', 'TikTok URL'), text('whatsapp', 'WhatsApp link')],
      },
      {
        key: 'portals', label: 'Portals (leave empty to show "coming soon")', type: 'object',
        fields: [text('studentPortal', 'Student portal URL'), text('parentPortal', 'Parent portal URL'), text('studentEmail', 'Student email login URL')],
      },
      area('announcement', 'Announcement bar text (home page)'),
      { key: 'announcementActive', label: 'Show announcement bar', type: 'boolean' },
    ],
  },
  home: {
    title: 'Home page',
    description: 'Hero, intro, quick links, "why join", stats, head teacher quote and section headings.',
    fields: [
      { key: 'hero', label: 'Hero', type: 'group', fields: [
        text('heroLine1', 'Line 1 (small, e.g. THE)'),
        text('heroLine2', 'Line 2 (big)'),
        text('heroLine3', 'Line 3 (small)'),
        area('heroSubtitle', 'Subtitle'),
        img('heroImage', 'Background image'),
        { key: 'heroVideo', label: 'Background video (MP4, optional)', type: 'file' },
        text('heroCtaText', 'Button text'),
        text('heroCtaLink', 'Button link'),
      ] },
      { key: 'intro', label: 'Intro section', type: 'group', fields: [
        area('introHeading', 'Heading'), area('introText', 'Text'), text('introLinkText', 'Link text'), text('introLink', 'Link'),
      ] },
      list('quickLinks', 'Quick link tiles', [text('title', 'Title'), text('icon', 'Icon (book, admissions, school, calendar, graduation, wrench, users, news, trophy, gallery, phone)'), text('link', 'Link')], 'Tile'),
      { key: 'why', label: '"Why join" section', type: 'group', fields: [
        text('whyTitle', 'Title'), area('whyText', 'Text'), img('whyImage', 'Image'), text('whyLinkText', 'Link text'), text('whyLink', 'Link'),
      ] },
      list('stats', 'Stats', [text('value', 'Value'), text('label', 'Label')], 'Stat'),
      { key: 'programs', label: 'Programmes section', type: 'group', fields: [text('programsHeading', 'Heading'), area('programsIntro', 'Intro text')] },
      { key: 'headTeacher', label: "Head teacher quote (name, title and photo are taken from the Head teacher's message page)", type: 'group', fields: [
        area('headTeacherQuote', 'Quote'),
      ] },
      list('partners', 'Affiliations / partner logos (shown under the news)', [text('name', 'Name'), img('logo', 'Logo (optional)'), text('link', 'Website (optional)')], 'Partner'),
      { key: 'headings', label: 'Other headings', type: 'group', fields: [
        text('newsHeading', 'News heading'), area('newsIntro', 'News intro text (yellow band)'), text('testimonialsHeading', 'Testimonials heading'), text('ctaHeading', 'Call-to-action heading'), area('ctaText', 'Call-to-action text'),
      ] },
    ],
  },
  about: {
    title: 'About page',
    fields: [
      text('title', 'Title'), text('subtitle', 'Subtitle'), img('heroImage', 'Header image'),
      { key: 'intro', label: 'Intro paragraphs', type: 'paragraphs' },
      img('image', 'Side image'),
      area('mission', 'Mission'), area('vision', 'Vision'),
      list('values', 'Values', [text('title', 'Title'), area('text', 'Text')], 'Value'),
      text('patronTitle', 'Patron section title'), area('patronText', 'Patron text'),
      area('accreditationText', 'Accreditation text'),
    ],
  },
  headTeacherMessage: {
    title: "Head teacher's message",
    fields: [text('name', 'Name'), text('title', 'Title'), img('photo', 'Photo'), { key: 'paragraphs', label: 'Message (separate paragraphs with a blank line)', type: 'paragraphs' }, text('signature', 'Signature line')],
  },
  admissions: {
    title: 'Admissions & fees',
    fields: [
      text('academicYear', 'Academic year'), area('intro', 'Intro'), img('heroImage', 'Header image'),
      lines('whoCanApply', 'Who can apply'),
      list('steps', 'Application steps', [text('title', 'Title'), area('text', 'Text')], 'Step'),
      lines('documents', 'Documents to bring'),
      lines('requiredItems', 'Required items (all students)'),
      lines('boardingItems', 'Additional items for boarders'),
      list('materials', 'Learning materials by trade', [text('trade', 'Trade'), area('items', 'Materials')], 'Trade'),
      lines('notes', 'Good-to-know notes'),
      lines('programsForForm', 'Programme options in the application form'),
      { key: 'fees', label: 'Fees', type: 'object', fields: [
        area('note', 'Note shown above the fees'),
        list('terms', 'Terms', [
          text('name', 'Term name'), { key: 'day', label: 'Total day (RWF)', type: 'number' }, { key: 'boarding', label: 'Total boarding (RWF)', type: 'number' },
          list('items', 'Breakdown', [text('label', 'Item'), { key: 'day', label: 'Day', type: 'number' }, { key: 'boarding', label: 'Boarding', type: 'number' }], 'Line'),
        ], 'Term'),
        list('otherCosts', 'Other costs', [text('label', 'Item'), text('amount', 'Amount')], 'Cost'),
        list('bankAccounts', 'Bank accounts', [text('bank', 'Bank'), text('number', 'Account number'), text('name', 'Account name')], 'Account'),
        { key: 'feesLetterUrl', label: 'Requirements / fees letter (PDF)', type: 'file' },
      ] },
    ],
  },
  studentLife: {
    title: 'Student life & calendar',
    fields: [
      text('title', 'Title'), area('intro', 'Intro'), img('heroImage', 'Header image'),
      list('highlights', 'Highlights', [text('title', 'Title'), area('text', 'Text'), img('image', 'Image')], 'Highlight'),
      list('dailySchedule', 'Daily schedule', [text('time', 'Time'), text('activity', 'Activity')], 'Slot'),
      area('calendarNote', 'Calendar note'),
      list('terms', 'Terms', [text('name', 'Name'), text('start', 'Start'), text('end', 'End'), text('notes', 'Notes')], 'Term'),
      { key: 'handbookUrl', label: "Students' handbook (PDF)", type: 'file' },
      { key: 'diningMenuUrl', label: 'Dining menu (PDF)', type: 'file' },
    ],
  },
  alumni: { title: 'Alumni page', fields: [text('title', 'Title'), area('intro', 'Intro'), img('image', 'Header image'), lines('benefits', 'Benefits')] },
  careers: { title: 'Work with us page', fields: [text('title', 'Title'), area('intro', 'Intro'), img('image', 'Header image')] },
  policiesPage: { title: 'Policies page intro', fields: [text('title', 'Title'), area('intro', 'Intro')] },
}

export const COLLECTIONS = {
  programs: {
    title: 'Programmes', singular: 'Programme', titleKey: 'name', subtitleKey: 'level',
    fields: [
      text('name', 'Name'), text('code', 'Code (e.g. SOD)'), text('slug', 'URL slug (auto if empty)'),
      { key: 'category', label: 'Category', type: 'select', options: ['TSS', 'Level 1'] },
      text('level', 'Level (e.g. Level 3 – Level 5)'), text('duration', 'Duration'), img('image', 'Image'),
      area('summary', 'Short summary'), area('description', 'Full description', { rows: 8 }),
      lines('modules', 'What you will learn'), lines('careers', 'Career paths'),
    ],
  },
  news: {
    title: 'News', singular: 'Article', titleKey: 'title', subtitleKey: 'date',
    fields: [text('title', 'Title'), text('slug', 'URL slug (auto if empty)'), { key: 'date', label: 'Date', type: 'date' }, img('image', 'Image'), area('excerpt', 'Excerpt'), area('body', 'Body (blank line between paragraphs)', { rows: 12 })],
  },
  testimonials: { title: 'Testimonials', singular: 'Testimonial', titleKey: 'name', subtitleKey: 'role', fields: [text('name', 'Name'), text('role', 'Role / class'), img('photo', 'Photo'), area('quote', 'Quote')] },
  staff: { title: 'Staff', singular: 'Staff member', titleKey: 'name', subtitleKey: 'role', fields: [text('name', 'Name'), text('role', 'Role'), text('department', 'Department'), img('photo', 'Photo'), area('bio', 'Short bio')] },
  facilities: { title: 'Facilities', singular: 'Facility', titleKey: 'title', fields: [text('title', 'Title'), area('text', 'Description'), img('image', 'Image')] },
  clubs: { title: 'Clubs & societies', singular: 'Club', titleKey: 'name', fields: [text('name', 'Name'), area('text', 'Description')] },
  sports: { title: 'Sports', singular: 'Sport', titleKey: 'name', fields: [text('name', 'Name'), area('text', 'Description')] },
  events: { title: 'Calendar events', singular: 'Event', titleKey: 'title', subtitleKey: 'date', fields: [text('title', 'Title'), { key: 'date', label: 'Date', type: 'date' }, area('text', 'Details')] },
  faqs: { title: 'FAQs', singular: 'Question', titleKey: 'question', fields: [text('question', 'Question'), area('answer', 'Answer')] },
  gallery: { title: 'Gallery', singular: 'Photo', titleKey: 'caption', fields: [img('image', 'Image'), text('caption', 'Caption')] },
  policies: { title: 'Policies', singular: 'Policy', titleKey: 'title', fields: [text('title', 'Title'), area('text', 'Text')] },
  vacancies: { title: 'Vacancies', singular: 'Vacancy', titleKey: 'title', subtitleKey: 'deadline', fields: [text('title', 'Position'), text('department', 'Department'), text('deadline', 'Deadline'), area('text', 'Description & requirements')] },
}

export const SUBMISSIONS = {
  inquiries: { title: 'Contact messages', columns: ['name', 'email', 'phone', 'subject'] },
  applications: { title: 'Applications', columns: ['studentName', 'program', 'level', 'boarding', 'guardianPhone'] },
  concerns: { title: 'Reported concerns', columns: ['category', 'email'] },
}
