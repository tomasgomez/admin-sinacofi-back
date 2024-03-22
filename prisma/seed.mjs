import {
    PrismaClient
} from '@prisma/client';

// require users
import {
    users
} from './seedUsers.mjs';

// require areas
import {
    areas
} from './seedAreas.mjs';

import {
    institutions
} from './seedInstitutions.mjs';

const prisma = new PrismaClient();

async function main() {

    /* User seed */
    // for (let i = 0; i < users.length; i++) {
    //     const user = users[i];
    //     await prisma.user.upsert({
    //         where: {
    //             dni: user.dni
    //         },
    //         update: {},
    //         create: {
    //             dni: user.dni,
    //             password: user.password,
    //             passwordExpirationDate: user.passwordExpirationDate,
    //             publicName: user.publicName,
    //             userGroup: user.userGroup,
    //             userProfile: user.userProfile,
    //             areaCode: user.areaCode,
    //             location: user.location,
    //             region: user.region,
    //             comunne: user.comunne,
    //             status: user.status,
    //             email: user.email,
    //             institutionCode: user.institutionCode,
    //         }
    //     });
    // }

    /* Area seed */
    // for (let i = 0; i < areas.length; i++) {
    //     const area = areas[i];
    //     await prisma.area.upsert({
    //         where: {
    //             id: area.id
    //         },
    //         update: {},
    //         create: {
    //             id: area.id,
    //             name: area.name,
    //             description: area.description,
    //             distributionPath: area.distributionPath,
    //             pathPams: area.pathPams,
    //             pathSams: area.pathSams,
    //             ftiiCode: area.ftiiCode,
    //             conectivityType: area.conectivityType,
    //             institutionCode: area.institutionCode,
    //             isActive: area.isActive
    //         }
    //     });
    // }

    /* Institution seed */
    for (let i = 0; i < institutions.length; i++) {
        const institution = institutions[i];
        await prisma.institution.upsert({
            where: {
                id: institution.id
            },
            update: {},
            create: {
                id: institution.id,
                fullName: institution.fullName,
                rut: institution.rut,
                name: institution.name,
                areaCode: institution.areaCode
            }
        });
    }
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


