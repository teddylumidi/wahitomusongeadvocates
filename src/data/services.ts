export type ServiceSection = {
  heading: string;
  paragraphs: string[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  tagline?: string;
  intro: string[];
  sections: ServiceSection[];
  reasons?: ServiceSection[];
  closingHeading?: string;
  closingText?: string;
};

export const services: Service[] = [
  {
    slug: 'dispute-resolution',
    title: 'Dispute Resolution',
    description:
      'Disputes require more than legal representation. They require strategy, sound judgment, and decisive action. Our Dispute Resolution practice provides comprehensive representation in civil, commercial, employment, tax, constitutional, and regulatory disputes before courts, specialised tribunals, and alternative dispute resolution forums. We are committed to protecting our clients’ interests through practical, efficient, and results-oriented advocacy while exploring opportunities for timely and cost-effective resolution.',
    tagline: 'Strategic Advocacy. Practical Solutions. Results that Matter.',
    intro: [
      'Disputes have the potential to disrupt businesses, strain relationships, and expose individuals and organisations to significant financial and legal risk. At Wahito Musonge & Company Advocates LLP, we provide strategic dispute resolution services designed to protect our clients’ interests while pursuing timely, practical, and commercially sound outcomes.',
      'Our advocates represent individuals, businesses, financial institutions, employers, insurers, and public and private organisations in disputes before courts of law, specialised tribunals, and alternative dispute resolution forums throughout Kenya. Whether resolving a matter through negotiation or advocating before the courts, we approach every instruction with meticulous preparation, sound legal analysis, and an unwavering commitment to excellence.',
      'We recognise that successful dispute resolution is not measured solely by winning cases, but by achieving outcomes that advance our clients’ legal, commercial, and personal objectives.',
    ],
    sections: [
      {
        heading: 'Civil Litigation',
        paragraphs: [
          'We represent clients in a broad range of civil disputes, including contractual claims, negligence, recovery of damages, injunctions, judicial review proceedings, and other civil matters before courts across Kenya.',
        ],
      },
      {
        heading: 'Commercial Litigation',
        paragraphs: [
          'Our advocates advise and represent businesses in disputes involving commercial contracts, shareholder disagreements, partnership disputes, debt obligations, insolvency matters, and other complex commercial conflicts.',
        ],
      },
      {
        heading: 'Criminal Litigation',
        paragraphs: [
          'We provide strategic legal representation in criminal proceedings, safeguarding our clients’ constitutional rights throughout investigations, trial proceedings, appeals, bail applications, and related criminal processes.',
        ],
      },
      {
        heading: 'Debt Recovery',
        paragraphs: [
          'We assist businesses, financial institutions, landlords, and individuals in recovering outstanding debts through negotiated settlements, demand processes, litigation, and the enforcement of court judgments.',
        ],
      },
      {
        heading: 'Insurance Disputes',
        paragraphs: [
          'We advise insurers, insured parties, brokers, and businesses on disputes relating to policy interpretation, liability, indemnity, repudiation of claims, recovery proceedings, and insurance litigation.',
        ],
      },
      {
        heading: 'Tax Litigation',
        paragraphs: [
          'We represent taxpayers in disputes before the Kenya Revenue Authority, the Tax Appeals Tribunal, and the superior courts, advising on objections, appeals, tax assessments, customs disputes, VAT, income tax, and other tax-related matters.',
        ],
      },
      {
        heading: 'Constitutional & Human Rights Litigation',
        paragraphs: [
          'We represent individuals, organisations, and institutions in constitutional petitions involving the enforcement of fundamental rights and freedoms, judicial review, fair administrative action, and other public law disputes.',
        ],
      },
      {
        heading: 'Arbitration, Mediation, & Negotiation',
        paragraphs: [
          'Where litigation is not the most appropriate solution, we represent clients in arbitration, mediation, and negotiated settlements, providing efficient and confidential alternatives to court proceedings.',
        ],
      },
    ],
    reasons: [
      {
        heading: 'Strategic Representation',
        paragraphs: [
          'Every dispute is approached with a carefully considered legal strategy tailored to our client’s objectives and the unique circumstances of the matter.',
        ],
      },
      {
        heading: 'Practical Solutions',
        paragraphs: [
          'We focus on achieving outcomes that are not only legally sound but also commercially and practically beneficial to our clients.',
        ],
      },
      {
        heading: 'Skilled Advocacy',
        paragraphs: [
          'Our advocates combine meticulous preparation with persuasive advocacy before courts, tribunals, and alternative dispute resolution forums.',
        ],
      },
      {
        heading: 'Client-Centered Service',
        paragraphs: [
          'We believe in responsive communication, transparency, and working closely with our clients throughout every stage of the dispute resolution process.',
        ],
      },
    ],
    closingHeading: 'Speak with our Dispute Resolution Team',
    closingText:
      'Whether you are seeking to enforce your legal rights, defend a claim, recover a debt, or resolve a commercial dispute, our team is ready to provide clear, strategic, and practical legal advice.',
  },
  {
    slug: 'corporate-commercial',
    title: 'Corporate & Commercial',
    description:
      'Businesses operate in an increasingly complex legal and regulatory environment that demands proactive legal counsel. Our Corporate & Commercial practice advises businesses, entrepreneurs, financial institutions, investors, and public entities on commercial transactions, corporate governance, regulatory compliance, contract negotiation, banking and finance, tax, intellectual property, data protection, insurance, and mining. We work closely with our clients to manage legal risk, facilitate growth, and support informed commercial decision-making.',
    tagline: 'Strategic Legal Counsel for Businesses, Investors, and Entrepreneurs.',
    intro: [
      'In today’s dynamic business environment, organisations require more than legal advice. They require trusted legal partners who understand the commercial realities of doing business. We provide strategic legal counsel that enables businesses to manage risk, maintain regulatory compliance, facilitate commercial transactions, and pursue sustainable growth.',
      'We advise entrepreneurs, start-ups, established businesses, financial institutions, investors, and private organisations across a broad spectrum of corporate and commercial matters. Whether establishing a business, negotiating complex commercial agreements, navigating regulatory obligations, or protecting valuable business assets, we provide practical, commercially focused solutions tailored to our clients’ objectives.',
      'Our approach combines legal precision, commercial awareness, and proactive risk management, allowing our clients to make informed decisions with confidence.',
    ],
    sections: [
      {
        heading: 'Commercial Law',
        paragraphs: [
          'We advise businesses on a wide range of commercial transactions, contractual obligations, business operations, and legal risks, providing practical legal solutions that support sound commercial decision-making.',
        ],
      },
      {
        heading: 'Company Advisory',
        paragraphs: [
          'We provide ongoing legal advisory services to companies on corporate governance, shareholder relations, directors’ duties, restructuring, business succession, and general corporate compliance throughout the business lifecycle.',
        ],
      },
      {
        heading: 'Contract Drafting & Review',
        paragraphs: [
          'Well-drafted contracts minimise risk and provide certainty. We prepare, review, negotiate, and advise on commercial agreements to ensure our clients’ rights and commercial interests are adequately protected.',
        ],
      },
      {
        heading: 'Banking & Finance',
        paragraphs: [
          'We advise lenders, borrowers, investors, and businesses on secured lending, financing arrangements, securities, debt restructuring, and banking transactions, helping clients navigate an increasingly regulated financial environment.',
        ],
      },
      {
        heading: 'Tax Advisory',
        paragraphs: [
          'Our tax advisory services assist businesses in understanding their tax obligations, structuring transactions efficiently, and managing tax risks while maintaining compliance with Kenya’s evolving tax framework.',
        ],
      },
      {
        heading: 'Intellectual Property',
        paragraphs: [
          'Innovation is a valuable commercial asset. We advise clients on the protection, registration, licensing, commercialisation, and enforcement of trademarks, copyrights, and other intellectual property rights.',
        ],
      },
      {
        heading: 'Data Protection & Privacy',
        paragraphs: [
          'We assist organisations in complying with Kenya’s data protection laws through compliance audits, privacy policies, contractual documentation, governance frameworks, employee training, and advisory services relating to the lawful processing of personal data.',
        ],
      },
      {
        heading: 'Mining Law',
        paragraphs: [
          'We advise investors, mining companies, landowners, and other stakeholders on mining licences, regulatory compliance, commercial agreements, mineral rights, land access arrangements, and legal issues affecting Kenya’s extractive industry.',
        ],
      },
      {
        heading: 'Regulatory Compliance',
        paragraphs: [
          'Businesses operate within an increasingly complex regulatory landscape. We assist clients in identifying legal obligations, implementing compliance frameworks, managing regulatory risk, and responding to investigations and enforcement action by regulatory authorities.',
        ],
      },
    ],
    reasons: [
      {
        heading: 'Commercially Focussed Advice',
        paragraphs: [
          'We provide practical legal solutions that align with our clients’ commercial objectives while effectively managing legal and regulatory risk.',
        ],
      },
      {
        heading: 'Proactive Risk Management',
        paragraphs: [
          'Our approach emphasises prevention as much as resolution, helping businesses anticipate legal challenges before they become costly disputes.',
        ],
      },
      {
        heading: 'Trusted Business Partner',
        paragraphs: [
          'We work closely with our clients to understand their industries, operations, and strategic objectives, enabling us to deliver tailored legal advice that adds long-term value.',
        ],
      },
      {
        heading: 'Responsive & Practical Service',
        paragraphs: [
          'We pride ourselves on delivering timely, commercially sensible, and solution-oriented legal advice that supports informed business decision-making.',
        ],
      },
    ],
    closingHeading: 'Speak with our Corporate & Commercial Team',
    closingText:
      'Whether you are establishing a business, negotiating a commercial transaction, strengthening corporate governance, or navigating regulatory requirements, our advocates are ready to provide strategic legal guidance tailored to your business needs.',
  },
  {
    slug: 'employment-labour-law',
    title: 'Employment & Labour Law',
    description:
      'The workplace continues to evolve alongside an ever-changing legal landscape. We advise employers, employees, and organisations on all aspects of employment and labour law, including workplace policies, employment contracts, disciplinary processes, restructuring, redundancy, regulatory compliance, workplace investigations, and employment litigation. Our objective is to foster legally compliant workplaces while effectively resolving employment disputes when they arise.',
    tagline: 'Practical Employment Solutions. Strategic Workplace Advice.',
    intro: [
      'The modern workplace is governed by an evolving legal and regulatory framework that demands careful compliance, sound governance, and proactive risk management. We partner with employers, employees, and organisations to navigate the complexities of employment and labour law with clarity, confidence, and commercial insight.',
      'We advise clients across the full spectrum of employment matters, from drafting employment contracts and developing workplace policies to managing disciplinary processes, restructuring exercises, and employment disputes. Our objective is not only to resolve workplace conflicts but also to help clients build legally compliant, productive, and resilient workplaces.',
      'Whether you are an employer seeking to strengthen your human resource practices or an employee seeking to protect your legal rights, we provide practical, solution-oriented advice tailored to your unique circumstances and aligned with Kenyan employment law.',
    ],
    sections: [
      {
        heading: 'Employment Contracts',
        paragraphs: [
          'We prepare, review, and advise on employment contracts, consultancy agreements, executive service agreements, fixed-term contracts, and other employment documentation to ensure compliance with Kenyan law while protecting the interests of both employers and employees.',
        ],
      },
      {
        heading: 'HR Policies & Compliance',
        paragraphs: [
          'Strong workplace policies are the foundation of effective human resource management. We assist organisations in developing, reviewing, and implementing legally compliant HR manuals, workplace policies, employee handbooks, and internal procedures that reflect best practice and minimise legal risk.',
        ],
      },
      {
        heading: 'Workplace Investigations',
        paragraphs: [
          'We advise and support employers in conducting fair, confidential, and legally compliant workplace investigations involving allegations of misconduct, harassment, discrimination, fraud, and other disciplinary concerns, while safeguarding procedural fairness and organisational integrity.',
        ],
      },
      {
        heading: 'Disciplinary & Grievance Processes',
        paragraphs: [
          'We guide employers through disciplinary hearings and grievance procedures to ensure compliance with the Employment Act, principles of natural justice, and fair labour practices. We also advise employees on their rights throughout disciplinary and grievance proceedings.',
        ],
      },
      {
        heading: 'Redundancy & Restructuring',
        paragraphs: [
          'Organisational restructuring requires careful legal planning. We advise employers on redundancy processes, workforce restructuring, business reorganisations, and separation arrangements to ensure statutory compliance while reducing the risk of future disputes.',
        ],
      },
      {
        heading: 'Employment Litigation',
        paragraphs: [
          'Our advocates represent employers and employees before the Employment and Labour Relations Court and other relevant forums in disputes involving unfair termination, discrimination, workplace injuries, breach of contract, employee benefits, disciplinary action, and other employment-related claims.',
        ],
      },
      {
        heading: 'Collective Labour Relations',
        paragraphs: [
          'We advise employers, trade unions, and organisations on collective bargaining agreements, trade union recognition, industrial relations, labour negotiations, strikes, and other matters arising within the framework of collective labour law.',
        ],
      },
      {
        heading: 'Occupational Health & Safety Advisory',
        paragraphs: [
          'We assist organisations in understanding and meeting their legal obligations relating to workplace health and safety, helping employers develop compliance frameworks that promote safe working environments while reducing legal and operational risks.',
        ],
      },
    ],
    reasons: [
      {
        heading: 'Preventive Legal Advice',
        paragraphs: [
          'We believe the most effective employment disputes are those prevented before they arise. Our advice is designed to help clients identify legal risks early and implement practical solutions that promote compliance and reduce workplace conflict.',
        ],
      },
      {
        heading: 'Balanced Commercial Perspective',
        paragraphs: [
        'We understand that employment decisions have legal, financial, and operational implications. Our advice balances compliance with the practical realities of managing people and running a successful organisation.',
        ],
      },
      {
        heading: 'Experienced Workplace Representation',
        paragraphs: [
          'Where disputes cannot be resolved amicably, we provide strategic and effective representation before the Employment and Labour Relations Court and other appropriate forums.',
        ],
      },
      {
        heading: 'Partnership Beyond Disputes',
        paragraphs: [
          'We work alongside our clients as trusted advisers, supporting their employment and human resource needs through every stage of the employment relationship, from recruitment to separation.',
        ],
      },
    ],
    closingHeading: 'Speak with our Employment & Labour Law Team',
    closingText:
      'Whether you require advice on employment contracts, workplace policies, disciplinary processes, regulatory compliance, or employment disputes, our advocates are ready to provide practical, strategic, and commercially focused legal support.',
  },
  {
    slug: 'family-children-succession',
    title: 'Family, Children, & Succession',
    description:
      'Family matters often involve deeply personal and life-changing decisions that require both legal expertise and thoughtful guidance. We advise clients on divorce, matrimonial property, child custody, adoption, guardianship, maintenance, succession, probate, estate administration, wills, and estate planning. Our approach is characterised by professionalism, discretion, and a commitment to achieving solutions that safeguard our clients’ interests while promoting the welfare of their families.',
    tagline: 'Trusted Legal Guidance Through Life’s Most Personal Matters.',
    intro: [
      'Family relationships often involve significant legal, financial, and emotional considerations. Whether planning for the future, navigating the breakdown of a marriage, protecting the interests of a child, or administering the estate of a loved one, these matters require legal representation that is both compassionate and strategically sound.',
      'We provide thoughtful, discreet, and solution-oriented legal services across all aspects of family, children, and succession law. We work closely with individuals and families to resolve disputes efficiently, preserve important relationships where possible, and protect the rights and interests of those we represent.',
      'Our advocates understand that no two families are alike. We therefore provide tailored legal advice that reflects each client’s unique circumstances while remaining firmly grounded in the law and focused on achieving practical, lasting solutions.',
    ],
    sections: [
      {
        heading: 'Divorce & Separation',
        paragraphs: [
          'We advise and represent clients in divorce, judicial separation, annulment, and related proceedings. We provide practical guidance on the legal consequences of the dissolution of marriage while seeking solutions that minimise conflict and protect our clients’ long-term interests.',
        ],
      },
      {
        heading: 'Matrimonial Property',
        paragraphs: [
          'We assist clients in identifying, protecting, valuing, and fairly distributing matrimonial property arising from marriage, separation, or divorce. Our advice is tailored to safeguard our clients’ proprietary rights while ensuring compliance with the applicable legal framework.',
        ],
      },
      {
        heading: 'Child Custody, Maintenance, & Parental Responsibility',
        paragraphs: [
          'The best interests of the child remain central to every matter involving children. We advise and represent clients in disputes relating to custody, maintenance, parental responsibility, visitation, guardianship, relocation, and other issues affecting children’s welfare, always advocating for outcomes that promote stability and the child’s overall well-being.',
        ],
      },
      {
        heading: 'Adoption',
        paragraphs: [
          'We guide prospective adoptive parents through every stage of the adoption process, including local and step-parent adoptions. We ensure compliance with the applicable legal requirements while providing clear guidance throughout the process to facilitate a smooth and legally secure transition for the child and family.',
        ],
      },
      {
        heading: 'Guardianship',
        paragraphs: [
          'We advise families and individuals on applications for guardianship and related protective orders where a child or vulnerable person requires legal care, representation, or decision-making support.',
        ],
      },
      {
        heading: 'Will & Estate Planning',
        paragraphs: [
          'Effective estate planning provides certainty and protects loved ones. We assist clients in preparing wills, establishing succession plans, advising on estate preservation, and structuring arrangements that ensure their wishes are clearly documented and legally enforceable.',
        ],
      },
      {
        heading: 'Probate & Estate Administration',
        paragraphs: [
          'We advise executors, administrators, beneficiaries, and dependants on obtaining grants of representation, administering estates, confirming grants, distributing estate assets, and fulfilling the legal obligations associated with estate administration.',
        ],
      },
      {
        heading: 'Succession Disputes',
        paragraphs: [
          'Disputes concerning estates can be legally complex and emotionally sensitive. We represent clients in contested succession proceedings involving wills, inheritance claims, dependency claims, revocation of grants, estate administration disputes, and other matters arising under succession law, while pursuing fair and practical resolutions.',
        ],
      },
    ],
    reasons: [
      {
        heading: 'Compassionate Yet Objective Advice',
        paragraphs: [
          'We appreciate the personal nature of family and succession matters and provide clear, measured legal guidance that empowers our clients to make informed decisions during difficult circumstances.',
        ],
      },
      {
        heading: 'Tailored Legal Solutions',
        paragraphs: [
          'Every family is different. We take the time to understand our clients’ circumstances and develop legal strategies that reflect their unique needs, priorities, and long-term interests.',
        ],
      },
      {
        heading: 'Discreet & Professional Representation',
        paragraphs: [
          'Family disputes often involve highly sensitive issues. We handle every matter with the utmost confidentiality, professionalism, and respect for our clients’ privacy.',
        ],
      },
      {
        heading: 'Practical Resolutions of Disputes',
        paragraphs: [
          'Where appropriate, we encourage negotiation and alternative dispute resolution to minimise conflict, preserve family relationships, and achieve lasting solutions. When litigation becomes necessary, we advocate firmly to protect our clients’ rights and interests.',
        ],
      },
    ],
    closingHeading: 'Speak with our Family, Children, & Succession Team',
    closingText:
      'Whether you are planning for the future, navigating a family dispute, seeking to protect the interests of a child, or administering the estate of a loved one, our advocates are committed to providing trusted legal guidance with professionalism, discretion, and care.',
  },
  {
    slug: 'property-real-estate',
    title: 'Property & Real Estate',
    description:
      'Property transactions and land-related disputes require careful legal oversight to protect valuable investments. We advise individuals, developers, lenders, investors, and businesses on acquisitions, disposals, leases, conveyancing, land use, real estate development, financing, and property disputes. Through meticulous due diligence and practical legal advice, we help clients navigate property transactions with confidence and certainty.',
    intro: [
      'Property transactions and land-related disputes require careful legal oversight to protect valuable investments. We advise individuals, developers, lenders, investors, and businesses on acquisitions, disposals, leases, conveyancing, land use, real estate development, financing, and property disputes. Through meticulous due diligence and practical legal advice, we help clients navigate property transactions with confidence and certainty.',
    ],
    sections: [],
  },
  {
    slug: 'regulatory-public-law',
    title: 'Regulatory & Public Law',
    description:
      'Navigating regulatory obligations is essential for both businesses and individuals operating in today’s legal environment. Our Regulatory & Public Law practice advises clients on constitutional and administrative law, tax compliance, data protection, regulatory investigations, licensing, governance, and public law matters. We assist clients in understanding their legal obligations, managing regulatory risk, and responding effectively to an evolving legislative and regulatory landscape.',
    intro: [
      'Navigating regulatory obligations is essential for both businesses and individuals operating in today’s legal environment. Our Regulatory & Public Law practice advises clients on constitutional and administrative law, tax compliance, data protection, regulatory investigations, licensing, governance, and public law matters. We assist clients in understanding their legal obligations, managing regulatory risk, and responding effectively to an evolving legislative and regulatory landscape.',
    ],
    sections: [],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}