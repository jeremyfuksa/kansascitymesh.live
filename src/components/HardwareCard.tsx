interface HardwareCardProps {
  name: string;
  price: string;
  badge: string;
  description: string;
  color: string;
  image?: string;
}

export default function HardwareCard({ name, price, badge, description, color, image }: HardwareCardProps) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color} rounded-t-2xl z-10`}></div>
      
      {/* Image */}
      {image && (
        <div className="aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl mb-1 text-white">{name}</h3>
            <span className="text-2xl text-white/90">{price}</span>
          </div>
          <span className={`px-3 py-1 bg-gradient-to-r ${color} text-white rounded-lg text-sm font-medium`}>
            {badge}
          </span>
        </div>
        
        <p className="text-white/60 text-[15px] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}