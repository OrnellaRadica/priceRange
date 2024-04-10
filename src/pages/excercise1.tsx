import { Range } from "@/components/Range";

export default function Excercise1({ min, max }: { min: number; max: number }) {
  return <Range min={min} max={max} />;
}

export async function getStaticProps() {
  const res = await fetch("http://demo9514593.mockable.io/excercise1");
  const data = await res.json();

  return { props: { min: data.min, max: data.max } };
}
