export function WhatsAppButton() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <a
      href="https://wa.me/254722775294?text=Hello%20Wahito%20Musonge%20%26%20Company%20Advocates%20LLP"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wahito Musonge Advocates on WhatsApp at 0722 775 294"
      className="fixed bottom-5 right-4 z-50 block h-16 w-16 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-7 sm:right-7 sm:h-[72px] sm:w-[72px]"
    >
      <img
        src={`${baseUrl}images/whatsapp-icon.png`}
        alt=""
        className="h-full w-full object-contain"
      />
    </a>
  );
}