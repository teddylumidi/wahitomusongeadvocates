export type SitePageBlock =
  | { type: 'p' | 'h2' | 'h3' | 'quote'; text: string }
  | { type: 'ul'; items: string[] };

export type SitePage = {
  slug: string;
  title: string;
  eyebrow?: string;
  image?: string;
  blocks: SitePageBlock[];
};

export const sitePages: Record<string, SitePage> = {
  'about-me': {
    slug: 'about-me',
    title: 'ABOUT US',
    eyebrow: 'The firm',
    blocks: [
      {
        type: 'h2',
        text: 'WELCOME TO WAHITO MUSONGE & COMPANY ADVOCATES LLP',
      },
      {
        type: 'p',
        text: "We believe effective legal representation requires more than legal knowledge. It requires understanding our clients' objectives and delivering practical solutions. We partner with businesses and individuals across Kenya to resolve disputes, manage legal risk, and protect their interests with professionalism and integrity.",
      },
      { type: 'h2', text: 'Meet our team' },
      {
        type: 'p',
        text: 'Our comprehensive suite of professionals caters to a diverse team, ranging from seasoned architects to renowned engineers.',
      },
      { type: 'h3', text: 'Mary Wahito Njogu' },
      { type: 'p', text: 'Founding Partner' },
      { type: 'h3', text: 'Nerima Musonge' },
      { type: 'p', text: 'Managing Partner' },
      { type: 'h2', text: 'FAQs' },
      { type: 'h3', text: 'How do I know if I need legal representation?' },
      {
        type: 'p',
        text: 'Seeking legal advice at an early stage can often prevent disputes from escalating and help you make informed decisions. Whether you are entering into a commercial transaction, facing a legal dispute, managing employment matters, or planning your estate, obtaining timely legal counsel ensures that your rights and interests are protected from the outset.',
      },
      {
        type: 'h3',
        text: 'What areas of law does Wahito Musonge & Company Advocates LLP specialise in?',
      },
      {
        type: 'p',
        text: 'Our firm provides comprehensive legal services across a broad range of practice areas, including dispute resolution, employment and labour law, commercial and corporate advisory, property and conveyancing, family and succession law, tax law, debt recovery, banking and finance, regulatory compliance, data protection, insurance law, intellectual property, and mining law. We advise both private individuals and corporate clients on contentious and non-contentious matters, delivering practical solutions tailored to their unique objectives.',
      },
      { type: 'h3', text: 'How does the firm approach client matters?' },
      {
        type: 'p',
        text: "Every instruction begins with a thorough understanding of the client's objectives, legal position, and commercial realities. We adopt a strategic and solution-oriented approach, providing clear legal advice, proactive communication, and practical recommendations that are designed to protect our clients' interests while achieving the most favourable outcome possible.",
      },
      { type: 'h3', text: 'How can I schedule a consultation with the firm?' },
      {
        type: 'p',
        text: 'You may contact us by telephone, email, or through the enquiry form on our website to arrange a consultation. Once we receive your enquiry, a member of our team will promptly respond to discuss your legal needs and schedule a meeting at a mutually convenient time. We are committed to providing timely, confidential, and professional legal assistance from your very first interaction with our firm.',
      },
    ],
  },
  'mary-njogu-wahito': {
    slug: 'mary-njogu-wahito',
    title: 'Founding Partner',
    eyebrow: 'Our people',
    image: 'mary-wahito-njogu.jpeg',
    blocks: [
      {
        type: 'p',
        text: 'Mary Wahito Njogu is the Founding Partner of Wahito Musonge & Company Advocates LLP, an Advocate of the High Court of Kenya, Commissioner for Oaths, and Notary Public.',
      },
      {
        type: 'p',
        text: 'With extensive experience advising individuals, businesses, and institutions across a broad range of contentious and non-contentious legal matters.',
      },
      {
        type: 'p',
        text: 'Her practice is centred on dispute resolution, with particular expertise in civil, commercial, and criminal litigation, employment and labour law, property and conveyancing, family and succession law, insurance law, banking and finance, debt recovery, intellectual property, and mining law.',
      },
      {
        type: 'p',
        text: 'Mary has valuable experience in governance, management, and stakeholder engagement through her work with non-governmental organizations, equipping her with a multidisciplinary perspective that enhances her quality of legal counsel.',
      },
      {
        type: 'p',
        text: 'She has successfully represented clients before specialized tribunals, subordinate courts, High Court, and the Court of Appeal, earning a reputation for strategic advocacy, sound legal judgment, and practical, results-oriented solutions.',
      },
      {
        type: 'p',
        text: 'She holds a Bachelor of Laws (LL.B.) degree from the University of Nairobi and a Postgraduate Diploma in Law from the Kenya School of Law',
      },
      { type: 'h3', text: 'Contact' },
      { type: 'p', text: 'EMAIL: wahitokariukiadvocate@gmail.com' },
      { type: 'p', text: 'TEL. NO.: +254 727 150 932' },
      {
        type: 'quote',
        text: '"In matters of truth and justice, there is no difference between large and small problems, for issues concerning the treatment of people are all the same." ~Albert Einstein~',
      },
      {
        type: 'p',
        text: 'Wahito Musonge & Company Advocates LLP is a full-service law firm committed to providing strategic, commercially focused legal solutions to individuals, businesses, institutions, and public sector entities. We combine technical excellence with practical insight to help our clients navigate complex legal and regulatory landscapes with confidence.',
      },
      {
        type: 'p',
        text: 'Every engagement is approached with professionalism, integrity, and meticulous attention to detail, ensuring that our clients receive advice that is both legally sound and commercially practical.',
      },
      {
        type: 'p',
        text: "We believe exceptional legal representation extends beyond resolving disputes. It is about anticipating risk, protecting our clients' interests, and creating lasting value through trusted legal partnerships.",
      },
    ],
  },
  'managing-partner': {
    slug: 'managing-partner',
    title: 'Managing Partner',
    eyebrow: 'Our people',
    image: 'nerima-musonge.jpeg',
    blocks: [
      {
        type: 'p',
        text: 'Nerima Musonge is the Managing Partner of Wahito Musonge & Company Advocates LLP, an Advocate of the High Court of Kenya, and Commissioner for Oaths.',
      },
      {
        type: 'p',
        text: 'With a specific focus on corporate entities, employers, and private clients in complex disputes, regulatory compliance, and strategic commercial matters.',
      },
      {
        type: 'p',
        text: "Nerima's principal areas of practice include dispute resolution, employment and labour law, commercial litigation, tax law, and regulatory compliance. She also advises clients on commercial transactions, family and succession matters, constitutional and human rights litigation, debt recovery, data protection and privacy, aviation regulatory compliance, and mining law.",
      },
      {
        type: 'p',
        text: 'She holds a Bachelor of Laws (LL.B.) degree from the University of Nairobi and a Postgraduate Diploma in Law from the Kenya School of Law. She is a member of the Law Society of Kenya.',
      },
      { type: 'h3', text: 'Contact' },
      { type: 'p', text: 'EMAIL: nerimamusonge@gmail.com' },
      { type: 'p', text: 'TEL. NO.: +254 722 775 294' },
      {
        type: 'p',
        text: 'Her experience includes leading high-value and complex matters across multiple sectors. Notably, she successfully represented a taxpayer before the Tax Appeals Tribunal in proceedings involving tax assessments exceeding KShs. 787 million, securing a favourable outcome in a matter of significant legal and commercial importance.',
      },
      {
        type: 'p',
        text: 'Her practice is distinguished by a pragmatic, commercially focused approach that enables clients to navigate legal risk while achieving their business and personal objectives.',
      },
      {
        type: 'quote',
        text: '"Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen." ~Winston Churchill~',
      },
      {
        type: 'p',
        text: 'Wahito Musonge & Company Advocates LLP is a full-service law firm committed to providing strategic, commercially focused legal solutions to individuals, businesses, institutions, and public sector entities. We combine technical excellence with practical insight to help our clients navigate complex legal and regulatory landscapes with confidence.',
      },
      {
        type: 'p',
        text: 'Every engagement is approached with professionalism, integrity, and meticulous attention to detail, ensuring that our clients receive advice that is both legally sound and commercially practical.',
      },
      {
        type: 'p',
        text: "We believe exceptional legal representation extends beyond resolving disputes. It is about anticipating risk, protecting our clients' interests, and creating lasting value through trusted legal partnerships.",
      },
    ],
  },
  legalnuggets: {
    slug: 'legalnuggets',
    title: 'THE LEGAL NUGGETS INITIATIVE',
    eyebrow: 'Knowledge centre',
    blocks: [
      { type: 'h2', text: 'What is the Legal Nuggets Initiative?' },
      {
        type: 'p',
        text: 'It is a community whereby we educate the common mwananchi on legal matters in Kenya as part of our duty to society as Advocates.',
      },
      { type: 'h2', text: 'Stay Informed. Stay Protected.' },
      {
        type: 'p',
        text: 'The law is constantly evolving, and informed decisions begin with reliable legal knowledge. Our Legal Insights provide practical guidance, timely commentary, and expert analysis on developments that affect individuals, businesses, employers, and institutions across Kenya.',
      },
      { type: 'h3', text: 'Employment Law Updates' },
      {
        type: 'p',
        text: 'Stay informed on emerging employment legislation, workplace compliance requirements, disciplinary procedures, redundancy processes, and recent decisions from the Employment and Labour Relations Court.',
      },
      { type: 'h3', text: 'Commercial & Corporate Insights' },
      {
        type: 'p',
        text: 'Explore practical guidance on commercial transactions, contract drafting, regulatory obligations, corporate governance, and strategies for managing legal risk in business.',
      },
      { type: 'h3', text: 'Property & Conveyancing' },
      {
        type: 'p',
        text: 'Understand key legal considerations surrounding land transactions, property ownership, leases, due diligence, and developments in Kenyan property law.',
      },
      { type: 'h3', text: 'Tax & Regulatory Compliance' },
      {
        type: 'p',
        text: 'Keep up to date with tax obligations, regulatory requirements, compliance frameworks, and significant decisions affecting businesses and taxpayers.',
      },
      { type: 'h3', text: 'Family & Succession Law' },
      {
        type: 'p',
        text: "Access clear guidance on estate planning, succession, wills, probate, matrimonial property, and family law to help safeguard your family's future.",
      },
      { type: 'h3', text: 'Litigation & Dispute Resolution' },
      {
        type: 'p',
        text: 'Gain insights into court procedures, alternative dispute resolution, debt recovery, commercial litigation, and practical strategies for resolving disputes efficiently.',
      },
      { type: 'h2', text: 'Knowledge Center: Practical Legal Resources' },
      {
        type: 'p',
        text: 'Our Knowledge Centre is designed to make the law accessible through practical, easy-to-understand content prepared by our advocates.',
      },
      { type: 'h3', text: 'Articles & Publications' },
      {
        type: 'ul',
        items: [
          'In-depth legal analysis of emerging legal issues.',
          'Practical guides for individuals and businesses.',
          'Commentary on significant court decisions and legislative developments.',
        ],
      },
      { type: 'h3', text: 'Legal Alerts' },
      {
        type: 'ul',
        items: [
          'Updates on new legislation and regulatory changes.',
          'Timely insights to help you remain compliant and manage legal risk effectively.',
        ],
      },
      {
        type: 'quote',
        text: '“The law is most powerful when it transforms uncertainty into confidence and rights into lasting protection.”',
      },
      { type: 'p', text: 'Nerima Musonge' },
      { type: 'p', text: 'Managing Partner, Wahito Musonge & Co. Advocates LLP' },
      { type: 'h2', text: 'Read, Understand, and Digest' },
      { type: 'p', text: 'Previously Featured Topics On Our WhatsApp Community Platform' },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'PRIVACY POLICY',
    eyebrow: 'Effective Date: 1st January 2026',
    blocks: [
      { type: 'h2', text: '1. Introduction' },
      {
        type: 'p',
        text: 'Wahito Musonge & Company Advocates LLP ("the Firm", "we", "our" or "us") is committed to protecting the privacy, confidentiality, and security of the personal information entrusted to us.',
      },
      {
        type: 'p',
        text: 'As a law firm, we recognise that confidentiality is fundamental to the advocate-client relationship. We therefore process personal data responsibly, lawfully, and transparently, in accordance with the Constitution of Kenya, the Data Protection Act, 2019, the Data Protection (General) Regulations, 2021, and all other applicable laws.',
      },
      {
        type: 'p',
        text: 'This Privacy Policy explains how we collect, use, disclose, store, and protect your personal information when you visit our website, communicate with us, engage our legal services, or otherwise interact with the Firm.',
      },
      { type: 'h2', text: '2. About Us' },
      {
        type: 'p',
        text: 'Wahito Musonge & Company Advocates LLP is a Kenyan law firm providing legal services in, among other areas:',
      },
      {
        type: 'ul',
        items: [
          'Dispute Resolution',
          'Corporate & Commercial Law',
          'Employment & Labour Law',
          'Family, Children & Succession Law',
          'Property & Conveyancing',
          'Tax Law',
          'Intellectual Property',
          'Data Protection & Privacy',
          'Constitutional & Human Rights Law',
          'Banking & Finance',
          'Mining Law',
        ],
      },
      { type: 'h2', text: '3. Scope of this Policy' },
      {
        type: 'p',
        text: 'This Privacy Policy applies to visitors to our website, prospective clients, existing and former clients, witnesses, opposing parties, job applicants, suppliers and consultants, business partners, and persons who communicate with us by telephone, email, social media, or through our website.',
      },
      { type: 'h2', text: '4. Personal Information We Collect' },
      {
        type: 'p',
        text: 'Depending on your interaction with us, we may collect identity information, contact information, professional information, financial information, and case information. This may include your full name, National ID or Passport Number, KRA PIN, date of birth, nationality, email address, telephone number, postal address, physical address, employer, position, business details, bank account information, payment details, transaction records, court pleadings, contracts, legal opinions, correspondence, witness statements, supporting documents, and information relating to disputes.',
      },
      { type: 'h2', text: '5. Information We Collect Automatically' },
      {
        type: 'p',
        text: 'When you visit our website, certain technical information may be collected automatically, including IP address, browser type, device information, operating system, pages visited, time spent on our website, referral websites, and cookies and similar technologies.',
      },
      { type: 'h2', text: '6. How We Collect Your Information' },
      {
        type: 'p',
        text: 'We collect information directly from you; through our website forms; through email correspondence; during consultations; from publicly available sources; from government registries; from courts and tribunals; from your authorised representatives; and, where permitted by law, from third parties.',
      },
      { type: 'h2', text: '7. Why We Process Your Information' },
      {
        type: 'ul',
        items: [
          'Providing legal services',
          'Evaluating potential instructions',
          'Complying with legal obligations',
          'Conflict checks and client due diligence',
          'Responding to enquiries',
          'Preparing legal documents and representing clients',
          'Managing our business operations',
          'Improving our website',
          'Preventing fraud and protecting legal rights',
        ],
      },
      { type: 'h2', text: '8. Legal Basis for Processing' },
      {
        type: 'p',
        text: 'Under the Data Protection Act, we process personal data where you have provided consent; processing is necessary for the performance of a contract; processing is required by law; processing protects your legitimate interests; processing is necessary for the administration of justice; or processing serves our legitimate interests, provided such interests do not override your rights.',
      },
      { type: 'h2', text: '9. Cookies' },
      {
        type: 'p',
        text: 'Our website uses cookies to improve user experience, understand website traffic, remember user preferences, and enhance website security. You may disable cookies through your browser settings, although certain website features may no longer function correctly.',
      },
      { type: 'h2', text: '10. Confidentiality' },
      {
        type: 'p',
        text: 'Confidentiality lies at the heart of our legal practice. Information shared with the Firm in the course of a professional engagement is treated with the highest degree of confidentiality, subject only to disclosure where authorised by the client, required by law, ordered by a court of competent jurisdiction, or required by professional or regulatory obligations.',
      },
      { type: 'h2', text: '11. Sharing Personal Information' },
      {
        type: 'p',
        text: 'We do not sell or rent personal information. Where necessary, we may disclose information to courts, tribunals, government agencies, regulators, advocates instructed on your behalf, external consultants, expert witnesses, valuers, investigators, auditors, banks, technology service providers, and professional advisers. All disclosures are made only where legally justified or necessary for the provision of legal services.',
      },
      { type: 'h2', text: '12. International Transfers' },
      {
        type: 'p',
        text: 'Where your information is transferred outside Kenya, we shall ensure appropriate safeguards are implemented in accordance with Kenyan data protection laws.',
      },
      { type: 'h2', text: '13. Data Security' },
      {
        type: 'p',
        text: 'We maintain appropriate technical and organisational safeguards, including secure document storage, password protection, encrypted communications where appropriate, access controls, secure cloud storage, and staff confidentiality obligations. Although no system is completely secure, we continually review and improve our security measures.',
      },
      { type: 'h2', text: '14. Data Retention' },
      {
        type: 'p',
        text: 'We retain personal information only for as long as necessary to provide legal services, comply with legal obligations and professional requirements, resolve disputes, and protect our legal interests. Upon expiry of the applicable retention period, personal data will be securely destroyed or anonymised.',
      },
      { type: 'h2', text: '15. Your Rights' },
      {
        type: 'ul',
        items: [
          'Be informed about the collection of your personal data',
          'Access your personal information',
          'Request correction of inaccurate information',
          'Object to processing',
          'Request deletion where legally permissible',
          'Request restriction of processing',
          'Withdraw consent where processing is based on consent',
          'Lodge a complaint with the Office of the Data Protection Commissioner',
        ],
      },
      { type: 'h2', text: '16. Third-Party Websites' },
      {
        type: 'p',
        text: 'Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their respective privacy policies.',
      },
      { type: 'h2', text: "17. Children's Privacy" },
      {
        type: 'p',
        text: 'Our website is not intended to collect personal information directly from children. Where we process information relating to children as part of legal instructions, such processing shall be undertaken strictly in accordance with applicable law and only where necessary for the provision of legal services.',
      },
      { type: 'h2', text: '18. Changes to this Privacy Policy' },
      {
        type: 'p',
        text: 'We reserve the right to amend this Privacy Policy at any time. Updated versions will be published on this website together with the revised effective date.',
      },
      { type: 'h2', text: '19. Contact Us' },
      {
        type: 'p',
        text: 'Should you have any questions regarding this Privacy Policy or the processing of your personal information, you may contact us using the details provided on our Contact page. If you believe your rights under the Data Protection Act have been infringed, you may also lodge a complaint with the Office of the Data Protection Commissioner in accordance with applicable law.',
      },
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions of Website Use',
    eyebrow: 'Effective Date: 27 June 2026',
    blocks: [
      {
        type: 'p',
        text: 'Welcome to the website of Wahito Musonge & Company Advocates LLP ("the Firm", "we", "our", or "us"). These Terms and Conditions govern your access to and use of this website. By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.',
      },
      { type: 'h2', text: '1. Purpose of this Website' },
      {
        type: 'p',
        text: 'This website has been established to provide general information about the Firm, its advocates, areas of practice, legal publications, events, and related services. The website is intended solely for informational purposes and should not be construed as providing legal advice or creating any legal obligation between you and the Firm.',
      },
      { type: 'h2', text: '2. No Legal Advice' },
      {
        type: 'p',
        text: 'The information contained on this website, including Legal Nuggets, publications, articles, newsletters, updates, guides, opinions, blog posts, downloadable materials, and other content, is provided solely for general informational purposes. It does not constitute legal advice, should not be relied upon as legal advice, and should not be used as a substitute for obtaining independent legal advice tailored to your specific circumstances.',
      },
      { type: 'h2', text: '3. No Advocate–Client Relationship' },
      {
        type: 'p',
        text: 'Your use of this website does not create an advocate-client relationship between you and the Firm. An advocate-client relationship shall only arise where the Firm has completed all necessary conflict checks, agreed to accept instructions, confirmed an engagement, and, where applicable, executed an engagement letter.',
      },
      { type: 'h2', text: '4. Website Enquiries' },
      {
        type: 'p',
        text: 'Any enquiry submitted through this website is treated as a request for information only. Until the Firm formally accepts instructions, you should avoid sending confidential, commercially sensitive, or privileged information through the website or its contact forms.',
      },
      { type: 'h2', text: '5. Professional Independence' },
      {
        type: 'p',
        text: "Nothing contained on this website shall limit the Firm's professional independence or its obligation to comply with the law, the Advocates Act, the Law Society of Kenya Code of Standards of Professional Practice and Ethical Conduct, or any other applicable professional or regulatory obligations.",
      },
      { type: 'h2', text: '6. Conflict of Interest' },
      {
        type: 'p',
        text: 'Before accepting any legal instruction, the Firm reserves the right to conduct conflict checks. The Firm may decline instructions where a conflict of interest exists or may reasonably arise.',
      },
      { type: 'h2', text: '7. Intellectual Property' },
      {
        type: 'p',
        text: 'Unless otherwise indicated, all content appearing on this website, including text, articles, Legal Nuggets, publications, legal updates, graphics, logos, branding, photographs, videos, downloads, page layouts, software, and design elements, is the intellectual property of Wahito Musonge & Company Advocates LLP or is used under licence and is protected under the Copyright Act and other applicable intellectual property laws.',
      },
      { type: 'h2', text: '8. Permitted Use' },
      {
        type: 'ul',
        items: [
          'You may browse the website.',
          'You may download materials for personal, non-commercial use.',
          'You may share links to our publications.',
          'You may cite our publications with proper attribution.',
          'You may not copy substantial portions of our publications or reproduce our content for commercial purposes.',
          'You may not modify materials, remove copyright notices, republish articles as your own, or scrape website content without permission.',
        ],
      },
      { type: 'h2', text: '9. Legal Nuggets, Articles & Publications' },
      {
        type: 'p',
        text: 'Our Legal Nuggets and other publications reflect legal developments and commentary available at the date of publication. The law may subsequently change through legislation, judicial decisions, or regulatory action. Accordingly, the Firm does not warrant that publications remain current after publication and accepts no responsibility for reliance placed upon outdated material.',
      },
      { type: 'h2', text: '10. User Conduct' },
      {
        type: 'ul',
        items: [
          'Use this website for unlawful purposes.',
          'Interfere with website security.',
          'Introduce malicious software or attempt unauthorised access.',
          'Misuse contact forms or transmit defamatory, offensive or unlawful material.',
          'Violate applicable laws.',
        ],
      },
      { type: 'h2', text: '11. Cybersecurity' },
      {
        type: 'p',
        text: 'Users shall not knowingly introduce viruses, malware, ransomware, spyware, bots, or other harmful technologies into this website. The Firm reserves the right to suspend access where necessary to preserve website security.',
      },
      { type: 'h2', text: '12. Artificial Intelligence & Technology' },
      {
        type: 'p',
        text: 'The Firm may utilise secure technology, including artificial intelligence-assisted systems, document automation, legal research platforms, and practice management software in delivering legal services. Such technologies are employed only to improve efficiency and never replace the independent professional judgment of an Advocate. Appropriate safeguards are implemented to preserve confidentiality and protect client information.',
      },
      { type: 'h2', text: '13. Third-Party Links' },
      {
        type: 'p',
        text: 'This website may contain links to third-party websites for convenience. The Firm neither endorses nor accepts responsibility for the content, availability, accuracy, or privacy practices of third-party websites.',
      },
      { type: 'h2', text: '14. Disclaimer of Warranties' },
      {
        type: 'p',
        text: 'This website is provided on an "as is" and "as available" basis. While reasonable efforts are made to ensure accuracy, the Firm makes no representation or warranty that information is complete, accurate, current, that the website will always remain available, or that it will be free from errors or interruptions.',
      },
      { type: 'h2', text: '15. Limitation of Liability' },
      {
        type: 'p',
        text: 'To the fullest extent permitted by Kenyan law, the Firm shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or economic loss arising out of use of this website, inability to access the website, reliance upon website information, third-party websites, technical interruptions, cyber incidents, or data loss. Nothing in these Terms excludes liability where exclusion would be unlawful.',
      },
      { type: 'h2', text: '16. Indemnity' },
      {
        type: 'p',
        text: 'You agree to indemnify and hold harmless Wahito Musonge & Company Advocates LLP, its partners, advocates, consultants, employees, and agents against any claims, liabilities, damages, costs, or expenses arising from your breach of these Terms or your unlawful use of this website.',
      },
      { type: 'h2', text: '17. Privacy' },
      {
        type: 'p',
        text: 'Use of this website is also governed by our Privacy Policy. By using this website, you acknowledge that you have read and understood our Privacy Policy.',
      },
      { type: 'h2', text: '18. Cookies' },
      {
        type: 'p',
        text: 'This website may use cookies and similar technologies to improve functionality, analyse website traffic, and enhance user experience. Users may disable cookies through browser settings, although certain website features may not function correctly.',
      },
      { type: 'h2', text: '19. Availability of the Website' },
      {
        type: 'p',
        text: 'The Firm reserves the right to modify the website, suspend access, discontinue services, remove content, or undertake maintenance at any time and without prior notice.',
      },
      { type: 'h2', text: '20. Force Majeure' },
      {
        type: 'p',
        text: 'The Firm shall not be liable for failure or delay in making this website available where this results from circumstances beyond its reasonable control, including natural disasters, cyber-attacks, internet outages, governmental action, strikes, pandemics, or failures of third-party service providers.',
      },
      { type: 'h2', text: '21. Amendments' },
      {
        type: 'p',
        text: 'The Firm reserves the right to amend these Terms and Conditions at any time. Revised Terms shall become effective upon publication on this website. Continued use of the website constitutes acceptance of the revised Terms.',
      },
      { type: 'h2', text: '22. Severability and Waiver' },
      {
        type: 'p',
        text: 'Should any provision of these Terms be found to be unlawful or unenforceable, the remaining provisions shall continue in effect. Failure by the Firm to enforce any provision shall not constitute a waiver of that provision or any other right.',
      },
      { type: 'h2', text: '23. Governing Law and Jurisdiction' },
      {
        type: 'p',
        text: 'These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any dispute arising from or relating to the use of this website shall be subject to the exclusive jurisdiction of the courts of the Republic of Kenya.',
      },
      { type: 'h2', text: '24. Contact Information' },
      {
        type: 'p',
        text: 'If you have any questions regarding these Terms and Conditions or your use of this website, please contact Wahito Musonge & Company Advocates LLP using the contact details available on the Contact page.',
      },
      { type: 'p', text: 'Last Updated: 27 June 2026' },
    ],
  },
  'website-disclaimer': {
    slug: 'website-disclaimer',
    title: 'Website Disclaimer',
    eyebrow: 'Effective Date: 27 June 2026',
    blocks: [
      {
        type: 'p',
        text: 'The information contained on this website is provided by Wahito Musonge & Company Advocates LLP ("the Firm") for general informational purposes only. By accessing and using this website, you acknowledge and agree to the terms of this Disclaimer.',
      },
      { type: 'h2', text: '1. Information Purposes Only' },
      {
        type: 'p',
        text: 'The content published on this website, including articles, legal updates, Legal Nuggets, newsletters, publications, guides, frequently asked questions, downloadable resources, and other materials, is intended solely to provide general information on legal issues. Such information is not intended to constitute legal advice and should not be relied upon as a substitute for obtaining professional legal advice tailored to your specific circumstances.',
      },
      { type: 'h2', text: '2. No Advocate-Client Relationship' },
      {
        type: 'p',
        text: 'Accessing this website, communicating with the Firm through the website, submitting an enquiry, subscribing to updates, downloading publications, or reading any material published on this website does not create an advocate–client relationship. An advocate–client relationship shall only arise where the Firm has completed any necessary conflict checks, agreed to accept your instructions, confirmed its engagement, and, where applicable, entered into a formal engagement agreement.',
      },
      { type: 'h2', text: '3. No Legal Advice' },
      {
        type: 'p',
        text: 'Every legal matter is unique and depends upon its particular facts, applicable law, and procedural requirements. Accordingly, you should not make legal, commercial, financial, or personal decisions based solely on information contained on this website. The Firm strongly recommends that you obtain independent legal advice before taking or refraining from taking any action based on information available through this website.',
      },
      { type: 'h2', text: '4. Legal Nuggets & Publications' },
      {
        type: 'p',
        text: "The Firm's Legal Nuggets, articles, insights, and other publications are intended to promote legal awareness and encourage informed discussion of legal developments. They are educational in nature and should not be interpreted as definitive statements of the law or as legal opinions applicable to any particular matter.",
      },
      { type: 'h2', text: '5. No Guarantee of Results' },
      {
        type: 'p',
        text: 'Past successes, representative matters, case summaries, publications, or examples of legal work appearing on this website are provided for illustrative purposes only. They do not guarantee, predict, or imply similar outcomes in future matters, as every case depends upon its own facts, evidence, applicable law, and judicial determination.',
      },
      { type: 'h2', text: '6. Accuracy of Information' },
      {
        type: 'p',
        text: 'While reasonable care is taken to ensure that the information published on this website is accurate and current at the time of publication, the Firm makes no representation or warranty regarding the completeness, accuracy, reliability, suitability, or availability of the website or its contents. The Firm reserves the right to amend, update, remove, or replace website content at any time without prior notice.',
      },
      { type: 'h2', text: '7. Third-Party Websites' },
      {
        type: 'p',
        text: 'This website may contain links to third-party websites for convenience or reference. The Firm does not control, endorse, or accept responsibility for their content, security, privacy practices, or availability. Users access third-party websites entirely at their own risk.',
      },
      { type: 'h2', text: '8. Professional Privilege & Confidentiality' },
      {
        type: 'p',
        text: 'Communications submitted through this website, including contact forms or general enquiries, may not automatically attract legal professional privilege. Users should refrain from submitting confidential or sensitive information until the Firm has confirmed its acceptance of instructions.',
      },
      { type: 'h2', text: '9. Limitation of Liability' },
      {
        type: 'p',
        text: 'To the fullest extent permitted by the laws of Kenya, Wahito Musonge & Company Advocates LLP, its partners, advocates, consultants, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, special, or economic loss arising from access to or use of this website, reliance upon website information, errors or omissions, temporary unavailability, cybersecurity incidents, or third-party websites.',
      },
      { type: 'h2', text: '10. Intellectual Property' },
      {
        type: 'p',
        text: "Unless otherwise stated, all content appearing on this website, including publications, Legal Nuggets, articles, logos, graphics, branding, photographs, and design elements, is the intellectual property of Wahito Musonge & Company Advocates LLP and is protected by applicable intellectual property laws.",
      },
      { type: 'h2', text: '11. Jurisdiction' },
      {
        type: 'p',
        text: 'This Disclaimer shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any dispute arising from or relating to this website shall be subject to the exclusive jurisdiction of the courts of Kenya.',
      },
      { type: 'h2', text: '12. Changes to this Disclaimer' },
      {
        type: 'p',
        text: 'The Firm reserves the right to amend this Disclaimer at any time without prior notice. Any revisions shall take effect immediately upon publication on this website.',
      },
      { type: 'h2', text: '13. Contact Us' },
      {
        type: 'p',
        text: 'If you have any questions regarding this Disclaimer or the use of this website, please contact Wahito Musonge & Company Advocates LLP using the contact details provided on our Contact page.',
      },
    ],
  },
};

export function getSitePage(slug: string) {
  return sitePages[slug];
}