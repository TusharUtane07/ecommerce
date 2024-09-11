interface Testimonial {
  stars: number;
  img: string;
  name: string;
  position: string;
  description: string;
}

const testimonials: Testimonial[] = [
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "Tushar U",
    position: "Developer",
    description: "Amazing ecommerce app having great cart functionality with admin panel."
  },
  {
    stars: 4,
    img: '/assets/p1.jpg',
    name: "Amit S",
    position: "Product Manager",
    description: "The website is highly responsive and provides a seamless user experience. Well done!"
  },
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "Sara P",
    position: "Designer",
    description: "Beautiful design with intuitive UI. The color scheme and layout are on point."
  },
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "John D",
    position: "CEO",
    description: "Excellent execution! The admin panel is powerful yet easy to use. Highly recommended."
  },

];

export default testimonials;
