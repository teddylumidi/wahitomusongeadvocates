import { insightArticles } from '@/data/insights';

export function Insights() {
  return (
    <section id="insights" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Legal Insights</h2>
            <div className="w-16 h-0.5 bg-secondary mb-6"></div>
            <p className="text-lg text-primary/70 max-w-2xl">
              Thought leadership and updates on the evolving legal landscape in Kenya, authored by our partners.
            </p>
          </div>
          <a href={`${import.meta.env.BASE_URL}#insights`} className="text-sm font-semibold tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-2 group whitespace-nowrap">
            VIEW ALL ARTICLES 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightArticles.map((article) => (
              <a key={article.slug} href={`${import.meta.env.BASE_URL}insights/${article.slug}`} className="group bg-white border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-200">
                <img 
                  src={`${import.meta.env.BASE_URL}images/${article.image}`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-secondary mb-4 uppercase">
                  <span>FEATURED INSIGHT</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-primary/70 text-sm leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>
                <div className="text-sm font-semibold tracking-widest text-primary group-hover:text-secondary transition-colors mt-auto">
                  READ MORE
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
