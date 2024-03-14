
export class User {
    id: string; // User code id
    dni: string; // RUT without dot and hyphen (example: 12345678K)
    password: string; // Password
    passwordExpirationDate: string; // Time to change password
    publicName: string; // Name of the user to show and sign messages
    userGroup: string; // Group of the user (3 - Tratador de Mensajes, 4 - Operador, 5 - Administrador de Usuarios, 6 - Administrador de Claves de Autenticación)
    userProfile: string; // Profile of the user, define its permissions (example: 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17) 
    areaId: string; // AreaId of the user (example: 1, 2, 3...)
    location: string; // Location of the user (by default: Santiago)
    region: string; // Region of the user (by default: Metropolitana)
    comunne: string; // Comunne of the user 
    status: string; // Status of the user (A - Active, S - Suspended, D - Deleted)
    email: string; // Email of the user
    institutionId: string; // Financial institutionId of the user

    /* Optional fields, only required for Tratador de Mensajes */
    userMessageLevel?: string; // Level of the user to send messages, if the level is 3, the user will send messages to level 3, 2 and 1 

    /* Optional fields, only required for Tratador de Mensajes & Firma electronica */
    signatureClass?: string; // Class of the signature from A to Z
    signatureLevel?: string; // Level of the signature (1,2,3...)
    passwordElectronicSignature?: string; // Password of the electronic signature (8 characters alphanumeric) required for (FWD, CR, FWD/CR)
    dniElectronicSignature?: string; // RUT without dot and hyphen (example: 12345678K) required for (FWD, CR, FWD/CR)

    constructor() {
        this.id = '';
        this.dni = '';
        this.password = '';
        this.passwordExpirationDate = '';
        this.publicName = '';
        this.userGroup = '';
        this.userProfile = '';
        this.email = '';
        this.areaId = '';
        this.location = '';
        this.region = '';
        this.comunne = '';
        this.institutionId = '';
        this.status = '';
        this.userMessageLevel = '';
        this.signatureClass = '';
        this.signatureLevel = '';
        this.passwordElectronicSignature = '';
        this.dniElectronicSignature = '';
    }
}