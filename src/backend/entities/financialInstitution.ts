export class FinanciaInstitution {
    id: string; // Financial institution code id (e.g. 037)
    fullName: string; // Complete name of the financial institution (e.g. Banco Santander)
    rut: string; // RUT of the financial institution (e.g. 97.036.000-K)
    name : string; // Name abbreviation of the financial institution (e.g. Santander)
    areaCode: string; // Area code of the financial institution (e.g. 037)


    /*  
        Comes from TIDWEBContent
    */
    // Código (que lo tenemos)
    // Código Tandem
    // Nombre (que lo tenemos)
    // Mnemomico
    // Sec. Folio ATM
    // Corr. Credito Cap. VI
    // Corr.Credito Cap. XIX
    // Corr. Depósito Cap. XIX
    // Corr. Inversión
    // Estado Conectividad Tandem
    // Sep. Campos Alpha
    // Sep. Líneas Beta
    // Sep. Fin Campo Gamma
    // Cuenta Corr. Bco. Central
    // Cod. Aux. Bco. Central
    // Tid Banco Central
    // Dirección
    // Rut (sin putos) (que lo tenemos)
    // Tid Virtual
    // Indicador de Migración
    // Número de Servicio
    // Max. Cantidad Usuarios
    // Max. Cantidad Area
    // Respaldos, que tiene 3 opciones
    // Ninguno
    // Solo mensajes
    // Solo Archivos
    // Archivos y mensaje

    constructor() {
        this.id = '';
        this.name = '';
        this.fullName = '';
        this.rut = '';
        this.areaCode = '';
    }
}