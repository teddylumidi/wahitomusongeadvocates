export type InsightBlock = {
  type: 'p' | 'h2' | 'h3' | 'li' | 'quote';
  text: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  blocks: InsightBlock[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: 'legal-mistakes-startups-kenya',
    title: '5 Legal Mistakes Startups Make in Kenya—And How to Avoid Them',
    date: 'May 9, 2025',
    image: 'insight-startups.jpg',
    excerpt:
      'Kenya’s startup scene is thriving—with young entrepreneurs launching bold ventures in fintech, e-commerce, agritech, and more. But for every success story, there are many others that fail—not because of lack of funding or ideas—but due to avoidable legal mistakes.',
    blocks: [
      {
        type: 'p',
        text: 'Kenya’s startup scene is thriving—with young entrepreneurs launching bold ventures in fintech, e-commerce, agritech, and more. But for every success story, there are many others that fail—not because of lack of funding or ideas—but due to avoidable legal mistakes.',
      },
      {
        type: 'p',
        text: 'At Wahito Musonge and Company Advocates LLP, we advise startups across Kenya on how to grow safely, avoid disputes, and stay compliant. Below, we break down the most common legal missteps startups make—and how to fix them before they cost you your business.',
      },
      {
        type: 'h2',
        text: 'Mistake #1: Operating Without Registering a Legal Entity',
      },
      {
        type: 'p',
        text: 'Many startups begin operations under informal arrangements—using personal bank accounts, handshake partnerships, or unregistered business names. While this may seem convenient, it exposes the founders to significant risks, including personal liability, lack of credibility with investors, and tax penalties.',
      },
      {
        type: 'p',
        text: 'Solution: Register your startup early. We assist clients in choosing the right business structure, prepare incorporation documents, and obtain the relevant documents that assist with registration.',
      },
      {
        type: 'h2',
        text: 'Mistake #2: Failing to Create a Founders’ Agreement',
      },
      {
        type: 'p',
        text: 'Many co-founders jump into business without defining their roles, equity, exit terms, or what happens if one wants to leave or dies. A founders’ agreement should address equity ownership, decision-making rights, roles and responsibilities, dispute resolution, exit clauses, and succession.',
      },
      {
        type: 'p',
        text: 'Solution: We draft customized agreements that protect everyone involved and reduce the chances of internal disputes that could put your startup at risk.',
      },
      {
        type: 'h2',
        text: 'Mistake #3: Ignoring Intellectual Property Protection',
      },
      {
        type: 'p',
        text: 'Startups often neglect to protect their brand, content, code, or products—until someone copies them. Register your business name, logo, and core intellectual property early so your startup owns what it develops.',
      },
      {
        type: 'h2',
        text: 'Mistake #4: Using Borrowed or AI-Generated Contracts—or None at All',
      },
      {
        type: 'p',
        text: 'Copy-pasting contracts from the internet—or having none at all—exposes startups to legal risk. Whether you are dealing with suppliers, clients, or employees, unclear terms can result in non-payment, scope creep, or lawsuits.',
      },
      {
        type: 'p',
        text: 'Solution: We prepare contracts tailored to your business model and values—contracts that hold up in court and build trust with your clients, partners, employees, and investors.',
      },
      {
        type: 'h2',
        text: 'Mistake #5: Failing to Comply with Tax and Regulatory Requirements',
      },
      {
        type: 'p',
        text: 'Non-compliance with tax, NSSF, Social Health Insurance Fund, or licensing requirements can attract heavy penalties or closure notices. We assist clients with tax evaluation, registration, filings, and the operational licences required for their sector.',
      },
      {
        type: 'h2',
        text: 'Conclusion: Protect Your Startup from the Start',
      },
      {
        type: 'p',
        text: 'Legal mistakes do not just slow your growth—they can destroy your startup. Getting your legal foundation right is key to survival and scaling.',
      },
      {
        type: 'p',
        text: 'We offer business registration and KRA compliance assistance, startup agreements and policies, intellectual property protection, contract drafting, tax advisory, and licensing support. Book a startup consultation today and build your business on a solid legal foundation.',
      },
    ],
  },
  {
    slug: 'inheritance-mistakes-kenya',
    title: '8 Common Mistakes that Delay Inheritance in Kenya and How to Avoid Them',
    date: 'May 7, 2025',
    image: 'insight-inheritance.jpg',
    excerpt:
      'Inheritance disputes in Kenya can drag on for years—causing emotional stress, family rifts, and even total loss of property. Many delays are caused by avoidable mistakes.',
    blocks: [
      {
        type: 'p',
        text: 'Inheritance disputes in Kenya can drag on for years—causing emotional stress, family rifts, and even total loss of property. For many families, the true tragedy is the legal chaos left behind due to avoidable mistakes.',
      },
      {
        type: 'p',
        text: 'At Wahito Musonge and Company Advocates LLP, we have handled numerous succession cases, and the patterns are clear: small oversights often lead to long, expensive delays.',
      },
      {
        type: 'h2',
        text: 'Mistake #1: Dying Without a Will (Intestacy)',
      },
      {
        type: 'p',
        text: 'When someone dies without a valid will, the estate is distributed based on the Law of Succession Act, which often leads to lengthy court processes, family disputes over property, and dependants being left out. Write a valid will early to speed up distribution and reduce family conflict.',
      },
      {
        type: 'h2',
        text: 'Mistake #2: Failing to Petition for a Grant of Letters of Administration',
      },
      {
        type: 'p',
        text: 'Without a grant, you cannot legally manage or distribute the deceased’s estate. Assets may deteriorate, land may be grabbed or fraudulently sold, and family members may face criminal proceedings for intermeddling with estate property.',
      },
      {
        type: 'h2',
        text: 'Mistake #3: Leaving Out Beneficiaries',
      },
      {
        type: 'p',
        text: 'Omitting a spouse, child—including those born out of wedlock—or dependant leads to court objections and delays. Be thorough and disclose dependants properly to avoid objections or nullification of the process.',
      },
      {
        type: 'h2',
        text: 'Mistake #4: Competing Petitions by Family Members',
      },
      {
        type: 'p',
        text: 'When family members rush to court separately, duplication of cases, confusion, and delays follow. A family meeting and joint petition, supported by family mediation where needed, can streamline representation.',
      },
      {
        type: 'h2',
        text: 'Mistake #5: Poor Documentation of Assets',
      },
      {
        type: 'p',
        text: 'If you cannot prove what the deceased owned, it is difficult to claim or distribute it. We assist clients with asset tracing, searches at the land registry, and preparation of inventories.',
      },
      {
        type: 'h2',
        text: 'Mistake #6: Attempting to Do It Alone',
      },
      {
        type: 'p',
        text: 'Succession law is highly procedural, and small errors cause big delays. We prepare clear, accurate, and court-ready filings from the start.',
      },
      {
        type: 'h2',
        text: 'Mistake #7: Delaying Confirmation of the Grant',
      },
      {
        type: 'p',
        text: 'Even after receiving the initial grant, failing to file for confirmation within six months can stall the process indefinitely. We help draft distribution proposals, secure consents from beneficiaries, and transfer titles smoothly.',
      },
      {
        type: 'h2',
        text: 'Mistake #8: Selling Property Before Confirmation',
      },
      {
        type: 'p',
        text: 'It is illegal to sell property before the grant is confirmed. Buyers risk losing their money, while sellers risk criminal charges and civil suits. Wait until after confirmation and verify ownership before purchasing land or other property.',
      },
      {
        type: 'h2',
        text: 'Conclusion: Protect Your Legacy',
      },
      {
        type: 'p',
        text: 'Succession does not have to be a battlefield. Whether you are planning your estate, filing for succession, or resolving disputes, the right legal support can make all the difference between a peaceful process and years in court.',
      },
      {
        type: 'p',
        text: 'We offer will drafting and estate planning, succession petitions and representation, family dispute resolution and mediation, asset tracing, and land transfers. Book a confidential consultation today.',
      },
    ],
  },
  {
    slug: 'land-encroachment-kenya',
    title: 'What to Do If Someone Has Encroached on Your Land in Kenya',
    date: 'May 5, 2025',
    image: 'insight-land.jpg',
    excerpt:
      'Nothing is more frustrating than discovering that a neighbor, a stranger—or even a relative—has illegally built, cultivated, or fenced off part of your land without your consent or knowledge.',
    blocks: [
      {
        type: 'p',
        text: 'Land disputes are one of the most common and emotionally charged legal issues in Kenya. Nothing is more frustrating than discovering that a neighbor, a stranger—or even a relative—has illegally built, cultivated, or fenced off part of your land without your consent or knowledge.',
      },
      {
        type: 'p',
        text: 'Encroachment is not only a violation of your property rights; it can also lead to years of lost use, emotional stress, and potential financial loss. Kenyan law provides clear steps to reclaim your land and assert your rights.',
      },
      {
        type: 'h2',
        text: 'What Is Land Encroachment?',
      },
      {
        type: 'p',
        text: 'Land encroachment happens when someone enters or occupies a portion of land without legal ownership, consent, or authority. This can include a wall crossing your boundary, a structure on your plot, farming or grazing without permission, or squatters settling on an unutilized part of your land.',
      },
      {
        type: 'h2',
        text: 'Step 1: Confirm Ownership and Boundaries',
      },
      {
        type: 'p',
        text: 'Before taking legal action, establish proof of ownership and verify the actual boundaries of your land. Obtain your title deed, conduct a search at the Land Registry, hire a licensed surveyor to access the Registry Index Map, and involve the local land registrar if boundaries are unclear.',
      },
      {
        type: 'p',
        text: 'Always keep copies of receipts, maps, survey reports, and correspondence. They are critical as evidence in court.',
      },
      {
        type: 'h2',
        text: 'Step 2: Issue a Demand or Notice to Vacate',
      },
      {
        type: 'p',
        text: 'Once you have confirmed the encroachment, an advocate can issue a written demand letter or notice to vacate. The notice should describe the land and extent of encroachment, state your legal claim and ownership, demand cessation, and give a deadline for action.',
      },
      {
        type: 'h2',
        text: 'Step 3: File a Suit in Court',
      },
      {
        type: 'p',
        text: 'If the encroacher refuses to vacate, you may proceed to file a case seeking a declaration of ownership, eviction orders, permanent injunctions, and special damages for losses incurred. In some cases, courts may also award compensation for wrongful use of the land.',
      },
      {
        type: 'h2',
        text: 'Step 4: Explore Criminal Remedies in Certain Cases',
      },
      {
        type: 'p',
        text: 'If the encroachment involved forgery of documents, fraud, or threats, the matter may also amount to a criminal offence. Report suspected fraud or land grabbing to the police or the Directorate of Criminal Investigations.',
      },
      {
        type: 'h2',
        text: 'Don’t Delay: Limitation Periods Apply',
      },
      {
        type: 'p',
        text: 'Under the Limitation of Actions Act, you must file a suit for recovery of land within 12 years of the encroachment. If you delay too long, the encroacher may claim rights through adverse possession.',
      },
      {
        type: 'h2',
        text: 'How to Prevent Future Encroachment',
      },
      {
        type: 'li',
        text: 'Fence your land with proper boundary beacons.',
      },
      {
        type: 'li',
        text: 'Regularly inspect your property, especially if it is idle or far from your residence.',
      },
      {
        type: 'li',
        text: 'Engage a caretaker or security to monitor undeveloped plots.',
      },
      {
        type: 'li',
        text: 'Register sales or transfers promptly and correctly.',
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: 'Land encroachment is a serious violation, but you do not have to handle it alone. Whether you need help verifying your title, issuing a legal demand, or pursuing eviction through court, legal guidance can make all the difference.',
      },
      {
        type: 'p',
        text: 'We help individuals and families resolve land disputes, file eviction and trespass suits, recover encroached land, and draft and secure land sale agreements.',
      },
    ],
  },
];