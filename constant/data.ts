import {
  BG1,
  BG2,
  BG3,
  BG4,
  Slider1,
  Slider2,
  Slider3,
  Slider4,
} from "@/assets";
import { StaticImageData } from "next/image";
interface SliderItem {
  image: StaticImageData;
  thumbImg: StaticImageData;
  title1: string;
  title2: string;
  text: string;
}
export const HeroSectionSlider: SliderItem[] = [
  {
    image: BG1,
    thumbImg: BG2,
    title1: "From Our Farms",
    title2: "To Your Hands",
    text: "Welcome To TenTwenty Farms",
  },
  {
    image: BG2,
    thumbImg: BG3,
    title1: "Nature's Best",
    title2: "Food Today",
    text: "Sustainable Agriculture",
  },
  {
    image: BG3,
    thumbImg: BG4,
    title1: "Growing Tomorrow's",
    title2: "Food Today",
    text: "Taste the Difference of Freshness",
  },
  {
    image: BG4,
    thumbImg: BG1,
    title1: "Quality Food",
    title2: "For Your Family",
    text: "Farm to Table",
  },
];

interface ProductItem {
  id: number;
  title: string;
  location: string;
  sliderImage: StaticImageData;
}

export const Products: ProductItem[] = [
  {
    id: 1,
    title: "Client 1",
    location: "Dubai",
    sliderImage: Slider1,
  },
  {
    id: 2,
    title: "Client 2",
    location: "Abu Dhabi",
    sliderImage: Slider2,
  },
  {
    id: 3,
    title: "Client 3",
    location: "San Francisco",
    sliderImage: Slider3,
  },
  {
    id: 4,
    title: "Client 4",
    location: "Russia",
    sliderImage: Slider4,
  },
];

export const NavItems = [
  {
    id: 1,
    name: "About",
    link: "#",
  },
  {
    id: 2,
    name: "News",
    link: "#",
  },
  {
    id: 3,
    name: "Services",
    link: "#",
  },
  {
    id: 4,
    name: "Our Team",
    link: "#",
  },
  {
    id: 5,
    name: "Make Enquiry",
    link: "#",
  },
];
