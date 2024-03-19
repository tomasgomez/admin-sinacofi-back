import {
    PrismaClient
} from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    /* User seed */
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
    });

    /* User seed */
    const mariaLopez = await prisma.user.upsert({
        where: {
            dni: '222222222'
        },
        update: {},
        create: {
            dni: '222222222',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'Maria Lopez',
            userGroup: '03 - Usuario Común',
            userProfile: 'Usuario',
            areaCode: '10',
            location: 'Valparaíso',
            region: 'Valparaíso',
            comunne: 'Viña del Mar',
            status: 'Active',
            email: 'marialopez@example.com',
            institutionCode: '0035 - BCI',
        }
    });

    /* User seed */
    const pedroGonzalez = await prisma.user.upsert({
        where: {
            dni: '333333333'
        },
        update: {},
        create: {
            dni: '333333333',
            password: 'securePassword123',
            passwordExpirationDate: "2025-02-20",
            publicName: 'Pedro Gonzalez',
            userGroup: '02 - Supervisor',
            userProfile: 'Supervisor',
            areaCode: '07',
            location: 'Concepción',
            region: 'Biobío',
            comunne: 'Concepción',
            status: 'Active',
            email: 'pedrogonzalez@example.com',
            institutionCode: '0035 - BCI',
        }
    });

    /* Area seed */
    const areaTID = await prisma.area.upsert({
        where: {
            id: '05'
        },
        update: {},
        create: {
            id: '05',
            name: 'AREA TID',
            description: 'TID Area',
            distributionPath: 'TID',
            pathPams: 'TID PAMs',
            pathSams: 'SAMs',
            ftiiCode: 'TID_FTII',
            conectivityType: 'TIP_BROW',
            institutionCode: '0035 - BCI'
        }
    });

    /* Area seed */
    const riesgosArea = await prisma.area.upsert({
        where: {
            id: '25'
        },
        update: {},
        create: {
            id: '25',
            name: 'RIESGOS',
            description: 'Riesgos',
            distributionPath: 'Riesgos',
            pathPams: 'Riesgos PAMs',
            pathSams: 'Riesgos SAMs',
            ftiiCode: 'RIESGOS_FTII',
            conectivityType: 'TIP_FTRA',
            institutionCode: '0035 - BCI'
        }
    });

    /* Area seed */
    const contabilidadArea = await prisma.area.upsert({
        where: {
            id: '12'
        },
        update: {},
        create: {
            id: '12',
            name: 'CONTABILIDAD',
            description: 'Contabilidad',
            distributionPath: 'Contabilidad',
            pathPams: 'Contabilidad PAMs',
            pathSams: 'Contabilidad SAMs',
            ftiiCode: 'CONTABILIDAD_FTII',
            conectivityType: 'TIP_FTRA',
            institutionCode: '0035 - BCI'
        }
    });

    /* Institution seed */
    const bciInstitution = await prisma.institution.upsert({
        where: {
            id: '0035'
        },
        update: {},
        create: {
            id: '0035',
            fullName: 'Banco BCI',
            rut: '99.999.999-K',
            name: 'BCI',
            areaCode: '037'
        }
    });

    /* Institution seed */
    const bancoSantander = await prisma.institution.upsert({
        where: {
            id: '0037'
        },
        update: {},
        create: {
            id: '0037',
            fullName: 'BSantander',
            rut: '97036000-K',
            name: 'Banco Santander',
            areaCode: '140, Piso 2, Santiago, Región Metropolitana, Chile'
        }
    });

    /* Institution seed */
    const hsbcBank = await prisma.institution.upsert({
        where: {
            id: '0031'
        },
        update: {},
        create: {
            id: '0031',
            fullName: 'HSBC Bank',
            rut: '97951000-4',
            name: 'HSBC Bank',
            areaCode: 'Av. Andres Bello 2711 - Piso 9, Santiago, Región Metropolitana, Chile'
        }
    });

    /* Institution seed */
    const scotiabank = await prisma.institution.upsert({
        where: {
            id: '0016'
        },
        update: {},
        create: {
            id: '0016',
            fullName: 'Scotiabank',
            rut: '97018000-1',
            name: 'Scotiabank',
            areaCode: 'Av. Costanera Sur 2710, Santiago, Región Metropolitana, Chile'
        }
    });



    console.log({
        juanRodriguez,
        mariaLopez,
        pedroGonzalez,
        areaTID,
        riesgosArea,
        contabilidadArea,
        bciInstitution,
        bancoSantander,
        hsbcBank,
        scotiabank
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });