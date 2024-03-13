export class Area {
    id : string; // Area code id (e.g. 037)
    name : string; // Name of the area (e.g. IT)
    description : string; // Description of the area (e.g. Information Technology)
    distributionPath : string; // Distribution 
    pathPams : string; // Path of the PAMs
    pathSams : string; // Path of the SAMs
    ftiiCode : string; // FTII code
    conectivityType : string; // Conectivity type (TIP_BROW, TIP_FSVR, TIP_FTRA)

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.distributionPath = '';
        this.pathPams = '';
        this.pathSams = '';
        this.ftiiCode = '';
        this.conectivityType = '';
    }
}