
import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignWork {
  id: number;
  title: string;
  category: string;
  image: string;
}

const designWorks: DesignWork[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Poster Design",
    category: "Print",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Logo Collection",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "UI/UX Mockups",
    category: "Digital",
    image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Marketing Materials",
    category: "Print",
    image: "https://images.unsplash.com/photo-1586717799252-bd134f5c0b78?w=600&h=400&fit=crop"
  },
];

const categories = ["All", "Branding", "Social Media", "Print", "Digital"];

export const DesignPortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<DesignWork | null>(null);

  const filteredWorks = activeCategory === "All" 
    ? designWorks 
    : designWorks.filter(work => work.category === activeCategory);

  return (
    <section id="design" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Design <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A showcase of my graphic design work including branding, social media graphics, print materials, and digital designs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background/50 text-foreground/70 hover:bg-background hover:text-foreground border border-border/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work, index) => (
            <div
              key={work.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(work)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-primary text-sm font-medium mb-1">{work.category}</span>
                <h3 className="text-white text-lg font-semibold">{work.title}</h3>
              </div>

              {/* Glassmorphism Border Effect */}
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-12 text-foreground/50">
            No designs found in this category.
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div 
              className="relative max-w-4xl max-h-[90vh] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <span className="text-primary text-sm font-medium">{selectedImage.category}</span>
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
