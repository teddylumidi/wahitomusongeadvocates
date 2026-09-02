import { insightArticles } from '@/data/insights';

export function Insights() {
  return (
    <section id="insights" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h2 className="text-3xl md:text-[40px] font-serif text-primary mb-10">Posts</h2>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[17px] md:text-lg text-secondary font-serif italic leading-relaxed mb-10">
            Our Legal Insights provide timely analysis, practical guidance, and informed commentary on developments in Kenyan law. From employment and commercial law to dispute resolution, regulatory compliance, and succession planning, our publications are designed to help individuals, businesses, and institutions navigate legal challenges with clarity, confidence, and strategic foresight.
          </p>
          <div className="mx-auto h-px w-64 bg-gray-300" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {insightArticles.map((article) => (
            <a key={article.slug} href={`${import.meta.env.BASE_URL}insights/${article.slug}`} className="group flex flex-col h-full">
              <h3 className="text-[22px] font-serif text-primary mb-4 group-hover:text-secondary transition-colors leading-[1.3]">
                {article.title}
              </h3>
              <p className="text-primary text-[15px] leading-[1.8] flex-grow">
                {article.excerpt}
              </p>
              <div className="text-[11px] font-medium tracking-[0.1em] text-primary group-hover:text-secondary transition-colors mt-6 underline underline-offset-4">
                READ MORE
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href={`${import.meta.env.BASE_URL}insights`} className="inline-block border border-gray-300 px-8 py-3 text-[11px] font-medium tracking-[0.1em] text-primary hover:border-secondary hover:text-secondary transition-colors">
            VIEW ALL POSTS
          </a>
        </div>
      </div>
    </section>
  );
}
