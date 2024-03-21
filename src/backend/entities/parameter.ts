export class Parameters {
    // Propiedades
    private readonly version: string;
    private readonly fieldSeparator?: string;
    private readonly subfieldSeparator?: string;
    private readonly lineSeparator?: string;
    private readonly endMessageSeparator?: string;
    private readonly companyName: string;
    private readonly tidPreparedMessageAbbreviation: string;
    private readonly tidReceivedMessageAbbreviation: string;
    private readonly wsPreparedMessageAbbreviation: string;
    private readonly wsReceivedMessageAbbreviation: string;
    private readonly vceClosingTime: number;
    private readonly sinacdeiTidCode: number;
    private readonly automaticPamsDirectory: string;
    private readonly automaticTamsDirectory: string;
    private readonly automaticFtDirectory: string;
    private readonly manualPamsDirectory: string;
    private readonly manualTamsDirectory: string;
    private readonly coverSheetGenerationDirectory: string;
    private readonly sessionTimeout: number;
    private readonly incomingPlantGenerationDirectory: string;
    private readonly deploymentPlantGenerationDirectory: string;
    private readonly connectivityStatusRefreshInterval: number;
    private readonly encryptionKey?: string;
    private readonly encryptionKeyConfirmation?: string;
  
    // Constructor
    constructor(parameters: {
      version: string;
      fieldSeparator?: string;
      subfieldSeparator?: string;
      lineSeparator?: string;
      endMessageSeparator?: string;
      companyName: string;
      tidPreparedMessageAbbreviation: string;
      tidReceivedMessageAbbreviation: string;
      wsPreparedMessageAbbreviation: string;
      wsReceivedMessageAbbreviation: string;
      vceClosingTime: number;
      sinacdeiTidCode: number;
      automaticPamsDirectory: string;
      automaticTamsDirectory: string;
      automaticFtDirectory: string;
      manualPamsDirectory: string;
      manualTamsDirectory: string;
      coverSheetGenerationDirectory: string;
      sessionTimeout: number;
      incomingPlantGenerationDirectory: string;
      deploymentPlantGenerationDirectory: string;
      connectivityStatusRefreshInterval: number;
      encryptionKey?: string;
      encryptionKeyConfirmation?: string;
    }) {
      this.version = parameters.version;
      this.fieldSeparator = parameters.fieldSeparator;
      this.subfieldSeparator = parameters.subfieldSeparator;
      this.lineSeparator = parameters.lineSeparator;
      this.endMessageSeparator = parameters.endMessageSeparator;
      this.companyName = parameters.companyName;
      this.tidPreparedMessageAbbreviation = parameters.tidPreparedMessageAbbreviation;
      this.tidReceivedMessageAbbreviation = parameters.tidReceivedMessageAbbreviation;
      this.wsPreparedMessageAbbreviation = parameters.wsPreparedMessageAbbreviation;
      this.wsReceivedMessageAbbreviation = parameters.wsReceivedMessageAbbreviation;
      this.vceClosingTime = parameters.vceClosingTime;
      this.sinacdeiTidCode = parameters.sinacdeiTidCode;
      this.automaticPamsDirectory = parameters.automaticPamsDirectory;
      this.automaticTamsDirectory = parameters.automaticTamsDirectory;
      this.automaticFtDirectory = parameters.automaticFtDirectory;
      this.manualPamsDirectory = parameters.manualPamsDirectory;
      this.manualTamsDirectory = parameters.manualTamsDirectory;
      this.coverSheetGenerationDirectory = parameters.coverSheetGenerationDirectory;
      this.sessionTimeout = parameters.sessionTimeout;
      this.incomingPlantGenerationDirectory = parameters.incomingPlantGenerationDirectory;
      this.deploymentPlantGenerationDirectory = parameters.deploymentPlantGenerationDirectory;
      this.connectivityStatusRefreshInterval = parameters.connectivityStatusRefreshInterval;
      this.encryptionKey = parameters.encryptionKey;
      this.encryptionKeyConfirmation = parameters.encryptionKeyConfirmation;
    }
  
    // Métodos de acceso
  
    getVersion(): string {
      return this.version;
    }
  
    getFieldSeparator(): string | undefined {
      return this.fieldSeparator;
    }
  
    getSubfieldSeparator(): string | undefined {
      return this.subfieldSeparator;
    }
  
    getLineSeparator(): string | undefined {
      return this.lineSeparator;
    }
  
    getEndMessageSeparator(): string | undefined {
      return this.endMessageSeparator;
    }
  
    getCompanyName(): string {
      return this.companyName;
    }
  
    getTidPreparedMessageAbbreviation(): string {
      return this.tidPreparedMessageAbbreviation;
    }
  
    getTidReceivedMessageAbbreviation(): string {
      return this.tidReceivedMessageAbbreviation;
    }
  
    getWsPreparedMessageAbbreviation(): string {
      return this.wsPreparedMessageAbbreviation;
    }
}