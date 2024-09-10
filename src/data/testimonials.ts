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
  {
    stars: 4,
    img: '/assets/p1.jpg',
    name: "Emily R",
    position: "Marketing Manager",
    description: "The app is great, though some features took a bit of time to figure out."
  },
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "Kevin L",
    position: "Business Analyst",
    description: "I appreciate the attention to detail in every aspect of this app. It's top-notch!"
  },
  {
    stars: 4,
    img: '/assets/p1.jpg',
    name: "Jessica F",
    position: "Content Strategist",
    description: "The content management system is very user-friendly. Great job!"
  },
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "Vikram N",
    position: "CTO",
    description: "The technology stack used in this project is impressive and provides great scalability."
  },
  {
    stars: 5,
    img: '/assets/p1.jpg',
    name: "Sophia G",
    position: "HR Manager",
    description: "Wonderful app! The user interface is very smooth and responsive."
  },
  {
    stars: 4,
    img: '/assets/p1.jpg',
    name: "David H",
    position: "Operations Head",
    description: "The app is functional and reliable. It meets our business needs effectively."
  }
];

export default testimonials;
