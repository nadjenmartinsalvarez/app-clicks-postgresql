import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  let body: unknown;
  
  body = await request.json();


  if (
    typeof body !== "object" || body === null || !("clicks" in body) || typeof body.clicks !== "number" || body.clicks < 0
  ) {
    return Response.json({ error: "Puntuación inválida" }, { status: 400 });
  }

  const result = await prisma.user.create({
    data: {
      clicks: body.clicks,
      conseguidoEn: new Date(),
    },
  });

  return Response.json({ id: result.id }, { status: 201 });
}