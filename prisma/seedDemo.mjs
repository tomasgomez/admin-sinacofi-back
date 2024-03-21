import {
    PrismaClient
} from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    /* User seed */
    const jbustos = await prisma.user.upsert({
        where: {
            dni: '19117638'
        },
        update: {},
        create: {
            dni: '19117638',
            password: 'hola123',
            passwordExpirationDate: "2024-12-10",
            publicName: 'J. BUSTOS',
            userGroup: '05 - Administrador de Instituciones',
            userProfile: 'Administrador',
            areaCode: '05',
            location: 'Santiago',
            region: 'Region Metropolitana',
            comunne: 'Santiago',
            status: 'Active',
            email: 'jbustos@sinacofi.cl',
            institutionCode: '0016 - BCI',
        }
    });

    /* User seed */
    const luisPereira = await prisma.user.upsert({
        where: {
            dni: '13442239'
        },
        update: {},
        create: {
            dni: '13442239',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'LUIS PEREIRA',
            userGroup: '03 - Tratador de Mensajes',
            userProfile: 'Usuario',
            areaCode: '10',
            location: 'Valparaíso',
            region: 'Valparaíso',
            comunne: 'Viña del Mar',
            status: 'Active',
            email: 'lpereira@sinacofi.cl',
            institutionCode: '0016 - BCI',
        }
    });

    /* User seed */
    const nicolasRoca = await prisma.user.upsert({
        where: {
            dni: '9480327'
        },
        update: {},
        create: {
            dni: '9480327',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'NICOLAS ROCA',
            userGroup: '03 - Tratador de Mensajes',
            userProfile: 'Usuario',
            areaCode: '10',
            location: 'Valparaíso',
            region: 'Valparaíso',
            comunne: 'Viña del Mar',
            status: 'Active',
            email: 'nroca@sinacofi.cl',
            institutionCode: '732 - LOS ANDES TARJETAS DE PREPAGO S.A.',
        }
    });

    /* User seed */
    const danielKokal = await prisma.user.upsert({
        where: {
            dni: '3077016'
        },
        update: {},
        create: {
            dni: '3077016',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'DANIEL KOKAL',
            userGroup: '03 - Tratador de Mensajes',
            userProfile: 'Usuario',
            areaCode: '10',
            location: 'Valparaíso',
            region: 'Valparaíso',
            comunne: 'Viña del Mar',
            status: 'Active',
            email: 'dkokal@sinacofi.cl',
            institutionCode: '350 - HIPOTECARIA SECURITY PRINCIPAL S.A',
        }
    });

    /* User seed */
    const luisP = await prisma.user.upsert({
        where: {
            dni: '3077015'
        },
        update: {},
        create: {
            dni: '3077015',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'LUIS P. UPR1',
            userGroup: '03 - Tratador de Mensajes',
            userProfile: 'Usuario',
            areaCode: '10',
            location: 'Valparaíso',
            region: 'Valparaíso',
            comunne: 'Viña del Mar',
            status: 'Active',
            email: 'lpupri@sinacofi.cl',
            institutionCode: '732 - LOS ANDES TARJETAS DE PREPAGO S.A.',
        }
    });

    /* User seed */
    const oveliz = await prisma.user.upsert({
        where: {
            dni: '16088932'
        },
        update: {},
        create: {
            dni: '16088932',
            password: 'password123',
            passwordExpirationDate: "2025-01-15",
            publicName: 'O. VÉLIZ',
            userGroup: '05 - Administrador de Instituciones',
            userProfile: 'Administrador',
            areaCode: '05',
            location: 'Santiago',
            region: 'Region Metropolitana',
            comunne: 'Santiago',
            status: 'Active',
            email: 'oveliz@sinacofi.cl',
            institutionCode: '0016 - BCI',
        }
    });

    /* Institution seed */
        const bciInstitution = await prisma.institution.upsert({
            where: {
                id: '0016'
            },
            update: {},
            create: {
                id: '0016',
                fullName: 'Banco BCI',
                rut: '99.999.999-K',
                name: 'BCI',
                areaCode: '037'
            }
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

    
