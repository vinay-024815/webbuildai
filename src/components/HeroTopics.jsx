import topicsData from "../content/topics.json";
import { Container } from "../ui";

export function HeroTopics() {
  return (
    <Container className="mt-14">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {topicsData.map((t) => (
          <li key={t.name}>
            <a className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-white px-4 py-7 text-center text-ink shadow-lg transition hover:-translate-y-1 hover:shadow-2xl" href={t.href}>
              <span className="text-base font-semibold md:text-lg">{t.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
