import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      tier: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        "Up to 50 notes",
        "Basic formatting",
        "3 tags",
        "Mobile access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      tier: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For power users",
      features: [
        "Unlimited notes",
        "Advanced formatting",
        "Unlimited tags",
        "Voice recording",
        "Version history (30 days)",
        "Collaboration (up to 3 people)",
      ],
      cta: "Try Free for 7 Days",
      popular: true,
    },
    {
      tier: "Team",
      price: "$19.99",
      period: "/month",
      description: "For teams and businesses",
      features: [
        "Everything in Pro",
        "Unlimited collaboration",
        "Admin controls",
        "Version history (1 year)",
        "Priority support",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for you. All plans include core
          features.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl p-8 border flex flex-col ${
              plan.popular
                ? "border-primary bg-primary/5 relative"
                : "border-border bg-secondary"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.tier}</h3>
              <div className="flex items-end justify-center gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.description}
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`w-full ${
                plan.popular
                  ? "bg-primary text-white dark:text-black hover:bg-primary/90"
                  : "bg-secondary text-foreground dark:text-white border border-border hover:bg-accent/10"
              }`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
