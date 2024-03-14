
export class User {
    id: string; // User code id
    dni: string; // RUT without dot and hyphen (example: 12345678K)
    password: string; // Password
    password_expiration_date: string; // Time to change password
    public_name: string; // Name of the user to show and sign messages
    user_group: string; // Group of the user (3 - Tratador de Mensajes, 4 - Operador, 5 - Administrador de Usuarios, 6 - Administrador de Claves de Autenticación)
    user_profile: string; // Profile of the user, define its permissions (example: 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17) 
    area: string; // Area of the user (example: 1, 2, 3...)
    location: string; // Location of the user (by default: Santiago)
    region: string; // Region of the user (by default: Metropolitana)
    comunne: string; // Comunne of the user 
    status: string; // Status of the user (A - Active, S - Suspended, D - Deleted)
    email: string; // Email of the user
    institution: string; // Financial institution of the user

    /* Optional fields, only required for Tratador de Mensajes */
    user_message_level?: string; // Level of the user to send messages, if the level is 3, the user will send messages to level 3, 2 and 1 

    /* Optional fields, only required for Tratador de Mensajes & Firma electronica */
    signature_class?: string; // Class of the signature from A to Z
    signature_level?: string; // Level of the signature (1,2,3...)
    password_electronic_signature?: string; // Password of the electronic signature (8 characters alphanumeric) required for (FWD, CR, FWD/CR)
    dni_electronic_signature?: string; // RUT without dot and hyphen (example: 12345678K) required for (FWD, CR, FWD/CR)

    constructor() {
        this.id = '';
        this.dni = '';
        this.password = '';
        this.password_expiration_date = '';
        this.public_name = '';
        this.user_group = '';
        this.user_profile = '';
        this.email = '';
        this.area = '';
        this.location = '';
        this.region = '';
        this.comunne = '';
        this.institution = '';
        this.status = '';
        this.user_message_level = '';
        this.signature_class = '';
        this.signature_level = '';
        this.password_electronic_signature = '';
        this.dni_electronic_signature = '';
    }
}