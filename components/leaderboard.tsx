import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export default async function Leaderboard() {
  const leaderboard = await prisma.user.findMany({
    orderBy: {
      clicks: "desc",
    },
    take: 5,
  });

  return (
    <section className="w-full max-w-xl space-y-3">
      <h2 className="text-2xl font-bold">Clasificación</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="pb-2 text-left">Puesto</th>
            <th scope="col" className="pb-2 text-right">Clics</th>
            <th scope="col" className="pb-2 text-right">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan={2} className="py-2 text-center text-muted-foreground">
                Todavía no hay resultados.
              </td>
            </tr>
          ) : (
            leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td className="py-1 text-left">{index + 1}</td>
                <td className="py-1 text-right">{user.clicks}</td>
                <td className="py-1 text-right">{Intl.DateTimeFormat("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(user.conseguidoEn)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}