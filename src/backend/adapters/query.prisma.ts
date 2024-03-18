import { prisma } from "./prisma/client";


export async function query(userId: string): Promise<string> {
    console.log("PRISMAAAAAAAA")
    console.log(prisma)
    var user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

    return userId
}