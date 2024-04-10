import { Range } from "@/components/Range";

export default function Excercise2({ steps }: { steps: number[] }) {
  const sorted = steps.sort((a, b) => a - b);
  return <Range steps={sorted} />;
}

export async function getStaticProps() {
  const res = await fetch("http://demo9514593.mockable.io/excercise2");
  const data = await res.json();

  return { props: { steps: data } };
}
