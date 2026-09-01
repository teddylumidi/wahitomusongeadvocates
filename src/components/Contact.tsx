import { useState } from 'react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get('firstName') ?? '');
    const lastName = String(formData.get('lastName') ?? '');
    const email = String(formData.get('email') ?? '');
    const inquiry = String(formData.get('inquiry') ?? '');
    const message = String(formData.get('message') ?? '');
    const subject = `Website enquiry: ${inquiry}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Nature of inquiry: ${inquiry}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href =
      `mailto:nerimamusonge@gmail.com,wahitokariukiadvocate@gmail.com` +
      `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus('success');
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white">Book an Appointment / Make an Enquiry</h2>
            <div className="w-16 h-0.5 bg-secondary mb-8"></div>
            <p className="text-white/80 leading-relaxed mb-12 max-w-md">
              Whether you require strategic legal advice, representation in a dispute, or guidance on a complex legal matter, our team is committed to providing timely, practical, and client-focused solutions.
            </p>

            <div className="space-y-8 text-white/90">
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-secondary mb-2 uppercase">Location</h4>
                <p className="font-serif text-lg">Nairobi, Kenya</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-secondary mb-2 uppercase">Email</h4>
                <a href="mailto:nerimamusonge@gmail.com" className="font-serif text-lg hover:text-secondary transition-colors">nerimamusonge@gmail.com</a>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-secondary mb-2 uppercase">Telephone</h4>
                <a href="tel:+254722775294" className="font-serif text-lg hover:text-secondary transition-colors">+254 722 775 294</a>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-widest text-secondary mb-2 uppercase">Also reach Mary Wahito Njogu</h4>
                <a href="mailto:wahitokariukiadvocate@gmail.com" className="font-serif text-lg hover:text-secondary transition-colors">wahitokariukiadvocate@gmail.com</a>
                <p className="font-serif text-lg">+254 727 150 932</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 text-primary">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500 min-h-[400px]">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif mb-2">Email Draft Opened</h3>
                <p className="text-primary/70">
                  Your request is addressed to both Nerima Musonge and Mary Wahito Njogu. Your email app should now be open with the message ready to send.
                </p>
                <a
                  href="mailto:nerimamusonge@gmail.com,wahitokariukiadvocate@gmail.com"
                  className="mt-8 text-sm font-semibold tracking-widest text-secondary hover:text-primary transition-colors"
                >
                  OPEN EMAIL DRAFT AGAIN
                </a>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 text-sm font-semibold tracking-widest text-primary/60 hover:text-primary transition-colors"
                >
                  EDIT REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="firstName" className="block text-xs font-semibold tracking-widest text-primary/70 mb-2">FIRST NAME</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      required
                      className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-secondary transition-colors bg-transparent rounded-none"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="lastName" className="block text-xs font-semibold tracking-widest text-primary/70 mb-2">LAST NAME</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      required
                      className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-secondary transition-colors bg-transparent rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold tracking-widest text-primary/70 mb-2">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    id="email" 
                      name="email"
                    required
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-secondary transition-colors bg-transparent rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-xs font-semibold tracking-widest text-primary/70 mb-2">NATURE OF INQUIRY</label>
                  <select 
                    id="inquiry" 
                    name="inquiry"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-secondary transition-colors bg-transparent rounded-none"
                  >
                    <option>Commercial Law</option>
                    <option>Family Law</option>
                    <option>Tax Law</option>
                    <option>Conveyancing</option>
                    <option>Criminal Law</option>
                    <option>Compliance and Regulatory</option>
                    <option>Commissioning</option>
                    <option>Notarization</option>
                    <option>Succession Law</option>
                    <option>Property Law</option>
                    <option>Corporate Advisory</option>
                    <option>Debt Recovery</option>
                    <option>Data Protection Law</option>
                    <option>Intellectual Property Law</option>
                    <option>Mining Law</option>
                    <option>Banking and Finance Law</option>
                    <option>Constitutional Law</option>
                    <option>Employment and Labor Law</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold tracking-widest text-primary/70 mb-2">MESSAGE</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    required
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-secondary transition-colors bg-transparent resize-none rounded-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary text-white py-4 text-sm font-semibold tracking-widest hover:bg-secondary transition-colors disabled:opacity-70 mt-4"
                >
                  {formStatus === 'submitting' ? 'SENDING...' : 'SUBMIT REQUEST'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
