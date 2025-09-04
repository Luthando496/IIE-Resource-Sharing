"use client";
import { Book, Upload, Search, Users, Menu, X, ChevronRight } from 'lucide-react'; // Using Lucide for icons
import { ContentCardProps } from "./page";

 
const ContentCard = ({ title, description, link, image, icon, category }: ContentCardProps) => (
  
  <a href={link} className={`block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-secondary`}>
    {image && (
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/3A374F/C7C3D4?text=No+Image'; }}
      />
    )}
    <div className="p-6">
      {category && (
        <span className={`text-xs text-white font-semibold uppercase tracking-wider text- mb-2 block`}>
          {category}
        </span>
      )}
      <h3 className={`text-xl primary-text font-semibold mb-2 text-`}>{title}</h3>
      <p className={`secondary-text text-sm mb-4`}>{description}</p>
      <span className={`inline-flex text-white items-center text- text-sm font-medium`}>
        Learn More <ChevronRight size={16} className="ml-1" />
      </span>
    </div>
  </a>
);

export default ContentCard;