
export class User {
    dni: string; // RUT without dot and hyphen (example: 12345678K)
    password: string; // Password
    passwordExpirationDate: string; // Time to change password
    publicName: string; // Name of the user to show and sign messages
    userGroup: string; // Group of the user (3 - Tratador de Mensajes, 4 - Operador, 5 - Administrador de Usuarios, 6 - Administrador de Claves de Autenticación)
    userProfile: string; // Profile of the user, define its permissions (example: 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17) 
    areaCode: string; // AreaId of the user (example: 1, 2, 3...)
    location: string; // Location of the user (by default: Santiago)
    region: string; // Region of the user (by default: Metropolitana)
    comunne: string; // Comunne of the user 
    status: string; // Status of the user (A - Active, S - Suspended, D - Deleted)
    institutionCode: string; // Financial institutionId of the user
    
    /* Optional fields, only required for Tratador de Mensajes */
    userMessageLevel: string | null; // Level of the user to send messages, if the level is 3, the user will send messages to level 3, 2 and 1 
    
    /* Optional fields, only required for Tratador de Mensajes & Firma electronica */
    signatureClass: string | null; // Class of the signature from A to Z
    signatureLevel: string | null; // Level of the signature (1,2,3...)
    passwordElectronicSignature: string | null; // Password of the electronic signature (8 characters alphanumeric) required for (FWD, CR, FWD/CR)
    dniElectronicSignature: string | null; // RUT without dot and hyphen (example: 12345678K) required for (FWD, CR, FWD/CR)
    email: string | null; // Email of the user

    constructor() {
        this.dni = '';
        this.password = '';
        this.passwordExpirationDate = '';
        this.publicName = '';
        this.userGroup = '';
        this.userProfile = '';
        this.email = '';
        this.areaCode = '';
        this.location = '';
        this.region = '';
        this.comunne = '';
        this.institutionCode = '';
        this.status = '';
        this.userMessageLevel = '';
        this.signatureClass = '';
        this.signatureLevel = '';
        this.passwordElectronicSignature = '';
        this.dniElectronicSignature = '';
    }
}

export const validEditableData = [
    "email",
    "passwordExpirationDate",
    "location",
    "region",
    "comunne",
    "institutionCode",
    "areaCode",
    "userMessageLevel",
    "signatureClass",
    "signatureLevel",
    "passwordElectronicSignature",
    "dniElectronicSignature"
  ]