import {
    PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const juanRodriguez = await prisma.user.upsert({
        where: {
            dni: '111111111'
        },
        update: {},
        create: {
            dni: '111111111',
            password: 'hola123',
            passwordExpirationDate: "2024-12-10",
            publicName: 'Juan Rodriguez',
            userGroup: '05 - Administrador de Instituciones',
            userProfile: 'Administrador',
            areaCode: '05',
            location: 'Santiago',
            region: 'Region Metropolitana',
            comunne: 'Santiago',
            status: 'Active',
            email: 'juanrodriguez@sinacofi.com',
            institutionCode: '0035 - BCI',
        }
    })

    console.log({
        juanRodriguez
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })