import testimonialsJson from "../../cms-export/testimonials.json";

export const testimonials = testimonialsJson as {
  name: string;
  role: string;
  quote: string;
  product: string;
}[];
