export class IpAddress {
    address: string;
    institutionCode: string;
    status: string;

    constructor(address: string) {
        this.address = address;
        this.institutionCode = '';
        this.status = '';
    }
}