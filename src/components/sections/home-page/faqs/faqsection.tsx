"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface FaqItem {
  id: number;
  number: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    number: "01",
    question: "What is SEDS Sri Lanka?",
    answer:
      "SEDS Sri Lanka is the local branch of the Students for the Exploration and Development of Space (SEDS) - a global student-run organization dedicated to promoting space exploration, research, and education.",
  },
  {
    id: 2,
    number: "02",
    question: "How do I join SEDS Sri Lanka?",
    answer:
      "You can join SEDS Sri Lanka by filling out our membership form on our website, attending our events, or contacting our membership coordinators directly.",
  },
  {
    id: 3,
    number: "03",
    question: "Do I need to be studying science or engineering to join?",
    answer:
      "No, SEDS welcomes students from all academic backgrounds who share a passion for space exploration and technology.",
  },
  {
    id: 4,
    number: "04",
    question: "What kind of projects can I participate in?",
    answer:
      "You can participate in various projects including CubeSat development, high-altitude balloon missions, rover building, astronomy research, and educational outreach programs.",
  },
  {
    id: 5,
    number: "05",
    question: "Are there international opportunities through SEDS?",
    answer:
      "Yes, SEDS provides international networking opportunities, conferences, and collaborative projects with other SEDS chapters worldwide.",
  },
  {
    id: 6,
    number: "06",
    question: "Is there a membership fee?",
    answer:
      "No, membership in SEDS Sri Lanka is completely free for all students.",
  },
  {
    id: 7,
    number: "07",
    question: "Can high school students join?",
    answer:
      "Yes, we welcome high school students who are passionate about space and technology to join our community.",
  },
  {
    id: 8,
    number: "08",
    question: "How does SEDS Sri Lanka support student careers?",
    answer:
      "We provide career guidance, networking opportunities, hands-on project experience, and connections to industry professionals in the space sector.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <Card className="bg-background border-input p-8 cursor-pointer transition-colors duration-300 hover:border-primary/20">
      <div onClick={onToggle} className="flex justify-between items-start">
        <div className="flex items-start gap-6 flex-1">
          {/* Question Number - Light iPhone-style when open, transparent when closed */}
          <div
            className={`flex-shrink-0 transition-all duration-300 ${
              isOpen
                ? "bg-primary/10 text-primary border border-primary/20 rounded-2xl shadow-sm"
                : "text-muted-foreground"
            } px-4 py-3 min-w-[60px] text-center`}
          >
            <span className="font-bold text-lg">{faq.number}</span>
          </div>

          <div className="flex-1">
            <CardTitle
              className={`text-lg font-semibold mb-0 transition-colors duration-300 ${
                isOpen ? "text-primary" : "text-foreground"
              }`}
            >
              {faq.question}
            </CardTitle>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </CardDescription>
            </div>
          </div>
        </div>

        <span
          className={`text-xl ml-4 transition-all duration-300 flex-shrink-0 ${
            isOpen ? "text-primary rotate-90" : "text-muted-foreground rotate-0"
          }`}
        >
          {isOpen ? "×" : "+"}
        </span>
      </div>
    </Card>
  );
};

const FAQSection = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(1); // First question open by default

  const handleToggle = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <section className="relative w-full py-16 text-foreground">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 mx-auto w-full px-6 max-w-7xl">
        <Card
          className="text-center mb-12 p-8 w-full"
          style={{
            backgroundImage: `url(/faqimg/faq-bg.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <CardTitle className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            We know you might have a lot of questions about SEDS Sri Lanka. Who
            we are, what we do, and how you can be part <br />
            of our journey.
          </CardDescription>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="space-y-6 w-full">
            {faqItems.slice(0, 4).map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItemId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
          <div className="space-y-6 w-full">
            {faqItems.slice(4, 8).map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItemId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
