import HardwareCard from './HardwareCard';
import { hardware } from '../data/hardware';

export default function HardwareSection() {
  return (
    <section className="px-4 py-10 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white">
            What people are running
          </h2>
          <p className="text-xl text-white/70">
            Start with one. Most of us end up with three or four (it's weirdly fun).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {hardware.map((item) => (
            <HardwareCard
              key={item.id}
              name={item.name}
              price={item.price}
              badge={item.badge}
              description={item.shortDescription}
              color={item.color}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
