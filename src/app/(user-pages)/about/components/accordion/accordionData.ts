interface IAccordionData {
    id: number;
    title: string;
    description: string;
}

export const accordionData: Array<IAccordionData> = [
    {
        id: 1,
        title: "How do I book a golf cart on Cart Scoot?",
        description:
            "For booking a car, you need to sign up as a rider via email or your mobile phone. Then, go to the page 'map' and choose a driver or send a request for all the drivers.",
    },
    {
        id: 2,
        title: "Can I cancel or modify my golf cart booking?",
        description:
            "We offer a convenient modern website where you can cancel your golf cart booking throw your personal panel.",
    },
    {
        id: 3,
        title: "What safety measures are implemented for the golf carts?",
        description:
            "At Cart Scoot, safety is our top priority. We ensure that all golf carts available for rent meet stringent safety standards. Our partners regularly inspect and maintain their carts to guarantee their reliability. Additionally, we recommend wearing seat belts while driving and adhering to all golf course safety guidelines.",
    },
    {
        id: 4,
        title: "What should I do to be a driver in Cart Scoot?",
        description:
            "To become a driver, you have to sign up, apply your documents and wait for the answer from our administration.",
    },
];
