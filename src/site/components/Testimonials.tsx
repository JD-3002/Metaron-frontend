"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Mehta",
    text: "I sold my apartment within a week - the process was seamless!",
  },
  {
    name: "Priya Shah",
    text: "Loved the interface and how professional the experience felt.",
  },
  {
    name: "Rahul Patel",
    text: "Quick, transparent, and easy to use. Highly recommend!",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-primary mb-10 text-3xl font-bold">What Our Clients Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl border border-blue-100 p-6 shadow-md"
            >
              <p className="mb-3 text-gray-700 italic">&ldquo;{t.text}&rdquo;</p>
              <h4 className="text-accent font-semibold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
