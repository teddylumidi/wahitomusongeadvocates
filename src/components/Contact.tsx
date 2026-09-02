import { useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/xaeyobye';

export function Contact() {
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') ?? '');
    const lastName = String(formData.get('lastName') ?? '');
    const email = String(formData.get('email') ?? '');
    const inquiry = String(formData.get('inquiry') ?? '');
    const message = String(formData.get('message') ?? '');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          inquiry,
          message,
          _subject: `Website enquiry: ${inquiry}`,
          _replyto: email,
          _gotcha: String(formData.get('_gotcha') ?? ''),
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      if (
        !response.ok ||
        (typeof result === 'object' &&
          result !== null &&
          'success' in result &&
          result.success === false)
      ) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setFormStatus('success');
      form.reset();
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-start">
          
          <div>
            <h2 className="text-3xl md:text-[40px] font-serif text-secondary leading-[1.2]">
              Book an Appointment<br />/ Make an Enquiry
            </h2>
          </div>

          <div>
            <p className="text-[15px] text-primary leading-[1.8] mb-6 font-sans">
              Whether you require strategic legal advice, representation in a dispute, or guidance on a complex legal matter, our team is committed to providing timely, practical, and client-focused solutions.
            </p>
            <p className="text-[15px] text-primary leading-[1.8] mb-10 font-sans">
              Get in touch with us today to discuss how we can help protect your interests and achieve your objectives.
            </p>

            {formStatus === 'success' ? (
              <div className="bg-gray-50 border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-primary mb-2">Enquiry Sent</h3>
                <p className="text-[15px] text-primary leading-[1.8] font-sans">
                  Thank you for contacting us. Your enquiry has been sent and our team will be in touch soon.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-[11px] font-medium tracking-[0.1em] text-primary underline underline-offset-4 hover:text-secondary transition-colors uppercase"
                >
                  SEND ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-[13px] font-bold text-primary mb-2 font-sans">First name (required)</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      required
                      className="w-full border border-gray-300 p-3 text-[15px] focus:outline-none focus:border-secondary transition-colors bg-white rounded-sm font-sans"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[13px] font-bold text-primary mb-2 font-sans">Last name (required)</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      required
                      className="w-full border border-gray-300 p-3 text-[15px] focus:outline-none focus:border-secondary transition-colors bg-white rounded-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-bold text-primary mb-2 font-sans">Email (required)</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full border border-gray-300 p-3 text-[15px] focus:outline-none focus:border-secondary transition-colors bg-white rounded-sm font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-[13px] font-bold text-primary mb-2 font-sans">Select the relevant service category (required)</label>
                  <select 
                    id="inquiry" 
                    name="inquiry"
                    required
                    className="w-full border border-gray-300 p-3 text-[15px] focus:outline-none focus:border-secondary transition-colors bg-white rounded-sm appearance-none font-sans"
                    style={{ background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center' }}
                  >
                    <option value="">Select one option</option>
                    <option value="Commercial Law">Commercial Law</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Tax Law">Tax Law</option>
                    <option value="Conveyancing">Conveyancing</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Compliance and Regulatory">Compliance and Regulatory</option>
                    <option value="Commissioning">Commissioning</option>
                    <option value="Notarization">Notarization</option>
                    <option value="Succession Law">Succession Law</option>
                    <option value="Property Law">Property Law</option>
                    <option value="Corporate Advisory">Corporate Advisory</option>
                    <option value="Debt Recovery">Debt Recovery</option>
                    <option value="Data Protection Law">Data Protection Law</option>
                    <option value="Intellectual Property Law">Intellectual Property Law</option>
                    <option value="Mining Law">Mining Law</option>
                    <option value="Banking and Finance Law">Banking and Finance Law</option>
                    <option value="Constitutional Law">Constitutional Law</option>
                    <option value="Employment and Labor Law">Employment and Labor Law</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-bold text-primary mb-2 font-sans">Message (required)</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-gray-300 p-3 text-[15px] focus:outline-none focus:border-secondary transition-colors bg-white resize-none rounded-sm font-sans"
                  ></textarea>
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input
                    id="_gotcha"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  aria-busy={formStatus === 'submitting'}
                  className="bg-black text-white px-8 py-3 text-[13px] font-medium hover:bg-black/80 transition-colors disabled:opacity-70 mt-2 rounded-sm font-sans"
                >
                  {formStatus === 'submitting' ? 'SENDING...' : 'Submit'}
                </button>

                {formStatus === 'error' && (
                  <p className="text-sm text-red-600 mt-4 font-sans" role="alert">
                    We couldn’t send your enquiry right now. Please try again, or contact us directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}