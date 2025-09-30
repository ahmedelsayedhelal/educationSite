import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { number: 250, label: "Top Instructors" },
  { number: 1000, label: "Courses" },
  { number: 15, label: "Categories" },
  { number: 2400, label: "Students" },
];

export default function State() {
  return (
    <section className="bg-gray-50 py-16 mt-0">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <StatCard key={i} number={stat.number} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ number, label }) {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.5, 
  });

  return (
    <div
      ref={ref}
      className="p-6 bg-white rounded-lg shadow hover:shadow-lg h-40"
    >
      <h2 className="text-3xl font-bold text-blue-600">
        {inView ? <CountUp start={0} end={number} duration={1.5} /> : 0}+
      </h2>
      <p className="mt-2 text-gray-700">{label}</p>
    </div>
  );
}
