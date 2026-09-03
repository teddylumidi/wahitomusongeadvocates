export function WhatsAppButton() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <a
      href="https://wa.me/254722775294?text=Hello%20Wahito%20Musonge%20%26%20Company%20Advocates%20LLP"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wahito Musonge Advocates on WhatsApp at 0722 775 294"
      className="group fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full bg-[#25D366] p-2.5 text-white shadow-[0_12px_35px_rgba(0,0,0,0.28)] ring-2 ring-white transition-all duration-300 hover:-translate-y-1 hover:pr-5 hover:shadow-[0_16px_40px_rgba(37,211,102,0.38)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/35 sm:bottom-7 sm:right-7"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:pl-2 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pl-2 group-focus-visible:opacity-100">
        0722 775 294
      </span>
      <span className="h-12 w-12 overflow-hidden rounded-full bg-white sm:h-14 sm:w-14">
        <img
          src={`${baseUrl}images/whatsapp-icon.jfif`}
          alt=""
          className="h-full w-full scale-[1.45] object-cover"
        />
      </span>
    </a>
  );
}