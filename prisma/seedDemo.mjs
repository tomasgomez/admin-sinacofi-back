import {
    PrismaClient
} from '@prisma/client';

import users from './users.js';

const prisma = new PrismaClient();

async function main() {

    /* User seed */
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await prisma.user.upsert({
            where: {
                dni: user.dni
            },
            update: {},
            create: {
                dni: user.dni,
                password: user.password,
                passwordExpirationDate: user.passwordExpirationDate,
                publicName: user.publicName,
                userGroup: user.userGroup,
                userProfile: user.userProfile,
                areaCode: user.areaCode,
                location: user.location,
                region: user.region,
                comunne: user.comunne,
                status: user.status,
                email: user.email,
                institutionCode: user.institutionCode,
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


