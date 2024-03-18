-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "institutionCode" TEXT NOT NULL,
    "distributionPath" TEXT NOT NULL,
    "pathPams" TEXT NOT NULL,
    "pathSams" TEXT NOT NULL,
    "ftiiCode" TEXT NOT NULL,
    "conectivityType" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AreaToInstitution" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AreaToInstitution_AB_unique" ON "_AreaToInstitution"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaToInstitution_B_index" ON "_AreaToInstitution"("B");

-- AddForeignKey
ALTER TABLE "_AreaToInstitution" ADD CONSTRAINT "_AreaToInstitution_A_fkey" FOREIGN KEY ("A") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToInstitution" ADD CONSTRAINT "_AreaToInstitution_B_fkey" FOREIGN KEY ("B") REFERENCES "Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
